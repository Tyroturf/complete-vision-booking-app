import React, { useEffect, useState } from "react";
import { Field, ErrorMessage, Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { addNewList, fetchListingId, updateList } from "../api";

const AddNewListForm = ({ mode = "add", initialValues = {}, onClose }) => {
  const validationSchema = Yup.object({
    listName: Yup.string().required("List Name is required"),
    location: Yup.string().required("Location is required"),
    guests: Yup.number()
      .required("Number of guests is required")
      .min(1, "At least 1 guest required"),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price must be a positive number"),
    description: Yup.string().required("Description is required"),
    features: Yup.string().required("Features are required"),
    images: Yup.array()
      .of(Yup.mixed().required("Image is required"))
      .test(
        "images-required",
        "You must upload at least 5 images",
        (images) => isEditMode || (images && images.length === 5)
      ),
  });

  const [listingId, setListingId] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const isEditMode = mode === "edit";

  useEffect(() => {
    if (isEditMode) {
      const images = [
        initialValues.image1_url,
        initialValues.image2_url,
        initialValues.image3_url,
        initialValues.image4_url,
        initialValues.image5_url,
      ].filter(Boolean);

      setImagePreviews(images);
    }
  }, [isEditMode]);

  useEffect(() => {
    console.log("get listing");
    const getListingId = async () => {
      try {
        const response = await fetchListingId();
        if (response.status === 200 && response.data) {
          setListingId(response.data.listings);
        } else {
          console.error("Failed to fetch listing ID.");
        }
      } catch (error) {
        console.error("Error fetching listing ID:", error);
      }
    };

    getListingId();
  }, []);

  const handleImageChange = (event, setFieldValue) => {
    const files = Array.from(event.target.files);
    setFieldValue("images", (prev) => [...prev, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleSubmit = async (values) => {
    const { user_id: hostId } = JSON.parse(localStorage.getItem("user"));
    const bucketUrl =
      "https://objectstorage.af-johannesburg-1.oraclecloud.com/p/suIO1K3vlc1QnyW-2BPxWaaHUDuky1kg0oCvk6N19db2Qd_jUv9nEM7oqCgT1Uv6/n/axw84jvjnipe/b/bucket1/o/";

    const { listName, location, description, features, guests, price, images } =
      values;

    console.log("values", values);
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
        listingId,
        p_image1_url: imageUrls[0] || initialValues.image1_url,
        p_image2_url: imageUrls[1] || initialValues.image2_url,
        p_image3_url: imageUrls[2] || initialValues.image3_url,
        p_image4_url: imageUrls[3] || initialValues.image4_url,
        p_image5_url: imageUrls[4] || initialValues.image5_url,
      };

      if (isEditMode) {
        params.p_listing_id = initialValues.id;
        const response = await updateList(params);
        if (response.status === 200) alert("Listing updated successfully!");
      } else {
        const response = await addNewList(params);
        if (response.status === 200) alert("Listing added successfully!");
      }

      onClose();
    } catch (error) {
      console.error("Error submitting the listing:", error);
      alert("Failed to submit the listing. Please try again.");
    }
  };

  return (
    <Formik
      initialValues={{
        listName: initialValues?.list_name || "",
        location: initialValues?.location || "",
        guests: initialValues?.max_guests || "",
        price: initialValues?.price || "",
        description: initialValues?.description || "",
        features: initialValues?.amenities || "",
        images: isEditMode
          ? [
              initialValues?.p_image1_url,
              initialValues?.p_image2_url,
              initialValues?.p_image3_url,
              initialValues?.p_image4_url,
              initialValues?.p_image5_url,
            ].filter(Boolean)
          : [],
      }}
      validationSchema={validationSchema}
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

            {/* Features Field */}
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
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddNewListForm;
