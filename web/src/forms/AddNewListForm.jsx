import React, { useEffect, useState } from "react";
import { Field, ErrorMessage, Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  addNewList,
  addNewTour,
  addNewVehicle,
  fetchListingId,
  updateList,
  updateTour,
  updateVehicle,
} from "../api";
import { getInitialValues } from "../utils/helpers";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import Loader from "../components/Loader";

const AddNewListForm = ({
  mode = "add",
  type = "listing",
  initialValues = {},
  onClose,
  getListings,
}) => {
  const isEditMode = mode === "edit";
  const { host_type: hostType } = JSON.parse(localStorage.getItem("user"));

  const configurations = {
    listing: {
      validationSchema: Yup.object({
        listName: Yup.string().required("List Name is required"),
        location: Yup.string().required("Location is required"),
        guests: Yup.number()
          .required("Number of guests is required")
          .min(1, "At least 1 guest required"),
        price: Yup.number()
          .required("Price is required")
          .min(0, "Price must be a positive number"),
        description: Yup.string().required("Description is required"),
        // features: Yup.string().required("Features are required"),
        images: Yup.array()
          .of(Yup.mixed().required("Image is required"))
          .test(
            "images-required",
            "You must upload at least 5 images",
            (images) => isEditMode || (images && images.length === 5)
          ),
      }),
      api: {
        fetchId: fetchListingId,
        submit: {
          add: addNewList,
          update: updateList,
        },
      },
    },
    vehicle: {
      validationSchema: Yup.object({
        listName: Yup.string().required("Car Name is required"),
        location: Yup.string().required("Location is required"),
        guests: Yup.number()
          .required("Number of guests is required")
          .min(1, "At least 1 guest required"),
        price: Yup.number()
          .required("Price is required")
          .min(0, "Price must be a positive number"),
        carType: Yup.string().required("Car Type is required"),
        chauffeurRate: Yup.number().min(
          0,
          "Chauffeur rate must be a positive number"
        ),
        description: Yup.string().required("Description is required"),
        features: Yup.string().required("Features are required"),
        images: Yup.array()
          .of(Yup.mixed().required("Image is required"))
          .test(
            "images-required",
            "You must upload at least 5 images",
            (images) => isEditMode || (images && images.length === 5)
          ),
      }),
      api: {
        fetchId: fetchListingId,
        submit: {
          add: addNewVehicle,
          update: updateVehicle,
        },
      },
    },
    tour: {
      validationSchema: Yup.object({
        listName: Yup.string().required("Tour Name is required"),
        location: Yup.string().required("Location is required"),
        guests: Yup.number()
          .required("Number of guests is required")
          .min(1, "At least 1 guest required"),
        price: Yup.number()
          .required("Price is required")
          .min(0, "Price must be a positive number"),
        description: Yup.string().required("Description is required"),
        images: Yup.array()
          .of(Yup.mixed().required("Image is required"))
          .test(
            "images-required",
            "You must upload at least 5 images",
            (images) => isEditMode || (images && images.length === 5)
          ),
      }),
      api: {
        fetchId: fetchListingId,
        submit: {
          add: addNewTour,
          update: updateTour,
        },
      },
    },
  };

  const config = configurations[type];
  const [listingId, setListingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (isEditMode) {
      const images = [
        initialValues?.Image1URL,
        initialValues?.Image2URL,
        initialValues?.Image3URL,
        initialValues?.Image4URL,
        initialValues?.Image5URL,
      ].filter(Boolean);

      setImagePreviews(images);
    }
  }, [isEditMode]);

  useEffect(() => {
    const getListingId = async () => {
      try {
        const response = await config.api.fetchId();
        if (response.status === 200 && response.data.listings) {
          console.log("id", response.data);
          setListingId(response.data?.listings);
        } else {
          console.error("Failed to fetch listing ID.");
        }
      } catch (error) {
        console.error("Error fetching listing ID:", error);
      }
    };

    getListingId();
  }, [config.api.fetchId]);

  const handleImageChange = (event, setFieldValue) => {
    const files = Array.from(event.target.files);
    setFieldValue("images", files);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleSubmit = async (values) => {
    const { user_id: hostId } = JSON.parse(localStorage.getItem("user"));
    const bucketUrl =
      "https://objectstorage.af-johannesburg-1.oraclecloud.com/p/suIO1K3vlc1QnyW-2BPxWaaHUDuky1kg0oCvk6N19db2Qd_jUv9nEM7oqCgT1Uv6/n/axw84jvjnipe/b/bucket1/o/";

    const {
      listName,
      location,
      description,
      features,
      guests,
      price,
      images,
      carType,
      chauffeurRate,
    } = values;

    setLoading(true);
    try {
      const uploadPromises = images.map((image, index) => {
        const uploadUrl = `${bucketUrl}${hostId}_${listName}_image_${
          index + 1
        }`;
        return axios.put(uploadUrl, image, {
          headers: {
            "Content-Type": image.type,
          },
        });
      });

      await Promise.all(uploadPromises);

      const imageUrls = images.map((_, index) => {
        return `${bucketUrl}${hostId}_${listName}_image_${index + 1}`;
      });

      const params = {
        hostId,
        listName,
        location,
        description,
        features,
        guests,
        price,
        ...(hostType === "V" && { carType, chauffeurRate }),
        listingId: isEditMode ? initialValues.ID : listingId,
        p_image1_url: imageUrls[0] || initialValues.Image1URL,
        p_image2_url: imageUrls[1] || initialValues.Image2URL,
        p_image3_url: imageUrls[2] || initialValues.Image3URL,
        p_image4_url: imageUrls[3] || initialValues.Image4URL,
        p_image5_url: imageUrls[4] || initialValues.Image5URL,
      };

      let response;
      if (hostType === "V") {
        response = isEditMode
          ? await updateVehicle(params)
          : await addNewVehicle(params);
      } else if (hostType === "T") {
        response = isEditMode
          ? await updateTour(params)
          : await addNewTour(params);
      } else {
        response = isEditMode
          ? await updateList(params)
          : await addNewList(params);
      }

      if (response.status === 200) {
        showSuccessToast(
          `${
            type === "vehicle" ? "Car" : type === "tour" ? "Tour" : "Listing"
          } ${isEditMode ? "updated" : "added"} successfully!`
        );
        getListings();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Formik
      initialValues={getInitialValues(hostType, initialValues, isEditMode)}
      validationSchema={config.validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ setFieldValue, resetForm }) => {
        useEffect(() => {
          if (!isEditMode) {
            resetForm();
            setImagePreviews([]);
          }
        }, [mode, isEditMode, resetForm]);

        return (
          <Form className="grid gap-4 md:grid-cols-2">
            {/* List Name Field */}
            <div className="relative mb-4">
              <Field
                type="text"
                name="listName"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                placeholder=" "
              />
              <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1">
                List Name
              </label>
              <ErrorMessage
                name="listName"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            {/* Location Field */}
            <div className="relative mb-4">
              <Field
                type="text"
                name="location"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                placeholder=" "
              />
              <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1">
                Location
              </label>
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            {/* Guests Field */}
            <div className="relative mb-4">
              <Field
                type="number"
                name="guests"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                placeholder=" "
              />
              <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1">
                Guests
              </label>
              <ErrorMessage
                name="guests"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            {/* Price Field */}
            <div className="relative mb-4">
              <Field
                type="number"
                name="price"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                placeholder=" "
              />
              <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1">
                Price
              </label>
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            {/* Description Field */}
            <div className="relative mb-4 md:col-span-2">
              <Field
                as="textarea"
                name="description"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                placeholder=" "
              />
              <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1">
                Description
              </label>
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            {/* Features Field (for cars) */}
            {hostType === "V" && (
              <div className="relative mb-4 md:col-span-2">
                <Field
                  type="text"
                  name="features"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                  placeholder=" "
                />
                <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1">
                  Features
                </label>
                <ErrorMessage
                  name="features"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            )}
            {/* Car Type (for cars) */}
            {hostType === "V" && (
              <div className="relative mb-4">
                <Field
                  type="text"
                  name="carType"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                  placeholder=" "
                />
                <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1">
                  Car Type
                </label>
                <ErrorMessage
                  name="carType"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            )}
            {/* Chauffeur Rate (for cars) */}
            {hostType === "V" && (
              <div className="relative mb-4">
                <Field
                  type="number"
                  name="chauffeurRate"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                  placeholder=" "
                />
                <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1">
                  Chauffeur Rate
                </label>
                <ErrorMessage
                  name="chauffeurRate"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            )}
            {/* Tour Price (for tours) */}
            {hostType === "T" && (
              <div className="relative mb-4">
                <Field
                  type="number"
                  name="tourPrice"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                  placeholder=" "
                />
                <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1">
                  Tour Price
                </label>
                <ErrorMessage
                  name="tourPrice"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            )}
            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="md:col-span-2">
                <label className="text-gray-600 text-xs mb-1 block">
                  Image Previews
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {imagePreviews.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md border"
                    />
                  ))}
                </div>
              </div>
            )}
            {/* Upload Images Field */}
            <div className="relative mb-4 md:col-span-2 grid grid-cols-1 gap-2">
              <label className="text-gray-600 text-xs mb-1 block">
                Upload Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => handleImageChange(event, setFieldValue)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand text-xs"
              />
              <ErrorMessage
                name="images"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="bg-brand text-white py-2 px-4 rounded-md mt-4 text-xs md:text-sm md:col-span-2"
            >
              {loading ? <Loader /> : "Submit"}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddNewListForm;
