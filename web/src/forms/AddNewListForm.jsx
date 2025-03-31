import React, { useEffect, useState } from "react";
import { Field, ErrorMessage, Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  addNewList,
  addNewTour,
  addNewVehicle,
  fetchAmenities,
  fetchListingId,
  updateList,
  updateTour,
  updateVehicle,
} from "../api";
import { formatDate, getInitialValues } from "../utils/helpers";
import { showSuccessToast } from "../utils/toast";
import Loader from "../components/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../customDatePickerWidth.css";
import CustomSelect from "../components/CustomSelect";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MAX_IMAGES = 5;

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
        city: Yup.string().required("City is required"),
        guests: Yup.number()
          .required("Number of guests is required")
          .min(1, "At least 1 guest required"),
        price: Yup.number()
          .required("Price is required")
          .min(0, "Price must be a positive number"),
        description: Yup.string().required("Description is required"),
        amenities: Yup.string()
          .min(1, "Please select at least one amenity")
          .required("Amenities are required"),
        p_special_date_from: Yup.date()
          .nullable()
          .when("showSpecialFields", {
            is: true,
            then: Yup.date().required("Start date is required"),
          }),
        p_special_date_to: Yup.date()
          .nullable()
          .when("showSpecialFields", {
            is: true,
            then: Yup.date()
              .required("End date is required")
              .min(
                Yup.ref("p_special_date_from"),
                "End date must be after start date"
              ),
          }),
        p_special_price: Yup.number()
          .nullable()
          .when("showSpecialFields", {
            is: true,
            then: Yup.number()
              .required("Special price is required")
              .positive("Special price must be a positive number"),
          }),
        images: Yup.array()
          .of(Yup.mixed().required("Image is required"))
          .test(
            "images-required",
            `You must upload at least ${MAX_IMAGES} images`,
            (images) => isEditMode || (images && images.length === MAX_IMAGES)
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
            `You must upload at least ${MAX_IMAGES} images`,
            (images) => isEditMode || (images && images.length === MAX_IMAGES)
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
        carType: Yup.string().required("Car Type is required"),
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
            `You must upload at least ${MAX_IMAGES} images`,
            (images) => isEditMode || (images && images.length === MAX_IMAGES)
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
  const [amenities, setAmenities] = useState([]);
  const [showSpecialFields, setShowSpecialFields] = useState(false);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

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
    const getAmenities = async () => {
      try {
        const response = await fetchAmenities();
        setAmenities(
          response.data.Amenities.map((amenity) => ({
            label: amenity.NAME,
            value: amenity.NAME,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch amenities:", error);
      }
    };

    getAmenities();
  }, []);

  useEffect(() => {
    const getListingId = async () => {
      try {
        const response = await config.api.fetchId();
        if (response.status === 200 && response.data.listings) {
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

  const handleImageChange = (event, values, setFieldValue) => {
    const files = Array.from(event.target.files);

    const currentImages = values.images || [];
    const newImages = currentImages.concat(files).slice(0, MAX_IMAGES);

    setFieldValue("images", newImages);

    const newPreviews = newImages.map((file) => URL.createObjectURL(file));
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (values) => {
    const { user_id: hostId } = JSON.parse(localStorage.getItem("user"));
    const bucketUrl =
      "https://objectstorage.af-johannesburg-1.oraclecloud.com/p/suIO1K3vlc1QnyW-2BPxWaaHUDuky1kg0oCvk6N19db2Qd_jUv9nEM7oqCgT1Uv6/n/axw84jvjnipe/b/bucket1/o/";

    const {
      listName,
      location,
      city,
      description,
      features,
      guests,
      price,
      images,
      carType,
      amenities,
      chauffeurRate,
      p_special_date_from,
      p_special_date_to,
      p_special_price,
    } = values;

    setLoading(true);
    try {
      const uploadPromises = images.map((image, index) => {
        const uploadUrl = `${bucketUrl}${listingId}H${hostId}_${listName}_image_${
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
        return `${bucketUrl}${listingId}H${hostId}_${listName}_image_${
          index + 1
        }`;
      });

      const params = {
        hostId,
        listName,
        location,
        city,
        description,
        features,
        guests,
        price,
        ...(hostType === "L" && {
          p_special_date_from,
          p_special_date_to,
          p_special_price,
          amenities,
        }),
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

  const handleDeleteImage = async (imageUrl, index, values, setFieldValue) => {
    if (isEditMode) {
      const bucketUrl =
        "https://objectstorage.af-johannesburg-1.oraclecloud.com/p/suIO1K3vlc1QnyW-2BPxWaaHUDuky1kg0oCvk6N19db2Qd_jUv9nEM7oqCgT1Uv6/n/axw84jvjnipe/b/bucket1/o/";

      try {
        const imageName = imageUrl.split("/").pop();
        await axios.delete(`${bucketUrl}${imageName}`);
      } catch (error) {
        console.error("Failed to delete image:", error);
        return;
      }
    }

    const updatedImages = values.images.filter((_, i) => i !== index);
    setFieldValue("images", updatedImages);
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Formik
      initialValues={getInitialValues(hostType, initialValues, isEditMode)}
      validationSchema={config.validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ setFieldValue, resetForm, values }) => {
        useEffect(() => {
          if (!isEditMode) {
            resetForm();
            setImagePreviews([]);
          }
        }, [mode, isEditMode, resetForm]);

        return (
          <Form className="grid gap-4 md:grid-cols-2">
            <div className="relative mb-4">
              <Field
                type="text"
                name="listName"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-sm md:text-xs"
                placeholder=" "
              />
              <label
                htmlFor="listName"
                className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1 pointer-events-none text-[16px]"
              >
                List Name
              </label>
              <ErrorMessage
                name="listName"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="relative mb-4">
              <Field
                as="select"
                name="city"
                value={values.city || ""}
                onChange={(e) => {
                  const selectedCity = e.target.value;
                  setFieldValue("city", selectedCity);
                }}
                className="w-full border bg-white border-gray-300 text-gray-600 px-3 py-2 rounded-md text-xs"
              >
                <option value="" disabled>
                  Select City
                </option>
                <option value="Accra">Accra</option>
                <option value="Aburi">Aburi</option>
                <option value="Kumasi">Kumasi</option>
                <option value="Tema">Tema</option>
                <option value="Cape Coast">Cape Coast</option>
              </Field>
              <ErrorMessage
                name="city"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="relative mb-4 md:col-span-2">
              <Field
                type="text"
                name="location"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-sm md:text-xs"
                placeholder=" "
              />
              <label
                htmlFor="location"
                className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1 pointer-events-none text-[16px]"
              >
                Location
              </label>
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {hostType === "T" && (
              <div className="relative mb-4">
                <Field
                  as="select"
                  name="tourType"
                  value={values.tourType || ""}
                  onChange={(e) => {
                    const selectedTourType = e.target.value;
                    setFieldValue("tourType", selectedTourType);
                  }}
                  className="w-full border bg-white border-gray-300 text-gray-600 px-3 py-2 rounded-md text-xs"
                >
                  <option value="" disabled>
                    Select Tour Type
                  </option>
                  <option value="Galleria Tour">Galleria Tour</option>
                  <option value="Historical Tour">Historical Tour</option>
                  <option value="Fun Experience">Fun Experience</option>
                </Field>
                <ErrorMessage
                  name="tourType"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            )}

            <div className="relative mb-4">
              <Field
                type="number"
                name="guests"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-sm md:text-xs"
                placeholder=" "
              />
              <label
                htmlFor="guests"
                className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1 pointer-events-none text-[16px]"
              >
                Guests
              </label>
              <ErrorMessage
                name="guests"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="relative mb-4">
              <Field
                type="number"
                name="price"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-sm md:text-xs"
                placeholder=" "
              />
              <label
                htmlFor="price"
                className="pointer-events-none absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1"
              >
                Price $
              </label>
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="relative mb-4 md:col-span-2">
              <Field
                as="textarea"
                name="description"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-sm md:text-xs"
                placeholder=" "
              />
              <label
                htmlFor="price"
                className="pointer-events-none absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1"
              >
                Description
              </label>
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {hostType === "V" && (
              <div className="relative mb-4 md:col-span-2">
                <Field
                  type="text"
                  name="features"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-sm md:text-xs"
                  placeholder=" "
                />
                <label
                  htmlFor="features"
                  className="pointer-events-none absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1"
                >
                  Features
                </label>
                <ErrorMessage
                  name="features"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            )}

            {hostType === "L" && (
              <div className="relative mb-4 md:col-span-2">
                <Field
                  name="amenities"
                  component={({ field, form }) => (
                    <CustomSelect
                      field={field}
                      form={form}
                      options={amenities}
                      isMulti
                      className="w-full text-xs"
                      placeholder="Select Amenities"
                      onChange={(selectedOptions) => {
                        const selectedValues = selectedOptions.map(
                          (option) => option.value
                        );
                        form.setFieldValue(
                          field.name,
                          selectedValues.join(", ")
                        );
                      }}
                    />
                  )}
                />
                <label
                  htmlFor="amenities"
                  className="pointer-events-none absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1"
                >
                  Amenities
                </label>
                <ErrorMessage
                  name="amenities"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            )}

            {hostType === "L" && (
              <div className="relative mb-4 md:col-span-2">
                <label className="inline-flex items-center text-xs text-gray-700">
                  <input
                    type="checkbox"
                    className="mr-2 rounded border-gray-300 focus:ring-brand"
                    onChange={(e) => {
                      setShowSpecialFields(e.target.checked);
                    }}
                  />
                  Enable Special Dates and Price
                </label>
              </div>
            )}

            {showSpecialFields && (
              <>
                <div className="relative col-span-1 md:col-span-2">
                  <DatePicker
                    id="listing-special-dates"
                    selected={
                      values.p_special_date_from
                        ? new Date(values.p_special_date_from)
                        : null
                    }
                    onChange={(dates) => {
                      const [start, end] = dates;
                      setFieldValue(
                        "p_special_date_from",
                        start ? formatDate(start) : null
                      );
                      setFieldValue(
                        "p_special_date_to",
                        end ? formatDate(end) : null
                      );
                    }}
                    startDate={
                      values.p_special_date_from
                        ? new Date(values.p_special_date_from)
                        : null
                    }
                    endDate={
                      values.p_special_date_to
                        ? new Date(values.p_special_date_to)
                        : null
                    }
                    selectsRange
                    minDate={new Date()}
                    placeholderText="Select a date range"
                    className="w-full border text-gray-600 border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand text-xs text-center sm:text-left"
                    wrapperClassName="customDatePickerWidth"
                  />
                  <label
                    htmlFor="listing-special-dates"
                    className="pointer-events-none absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1"
                  >
                    Select Special Dates
                  </label>
                  <ErrorMessage
                    name="p_special_date_from"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                  <ErrorMessage
                    name="p_special_date_to"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="relative mb-4 md:col-span-2">
                  <Field
                    type="number"
                    name="p_special_price"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-sm md:text-xs"
                    placeholder=" "
                  />
                  <label
                    htmlFor="p_special_price"
                    className="pointer-events-none absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1"
                  >
                    Special Price $
                  </label>
                  <ErrorMessage
                    name="p_special_price"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </>
            )}

            {hostType === "V" && (
              <div className="relative mb-4">
                <Field
                  as="select"
                  name="carType"
                  value={values.carType || ""}
                  onChange={(e) => {
                    const selectedCarType = e.target.value;
                    setFieldValue("carType", selectedCarType);
                  }}
                  className="w-full border bg-white border-gray-300 text-gray-600 px-3 py-2 rounded-md text-xs"
                >
                  <option value="" disabled>
                    Select Car Type
                  </option>
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Bus">Bus</option>
                </Field>
                <ErrorMessage
                  name="carType"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            )}

            {hostType === "V" && (
              <div className="relative mb-4">
                <Field
                  type="number"
                  name="chauffeurRate"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-sm md:text-xs"
                  placeholder=" "
                />
                <label
                  htmlFor="chauffeurRate"
                  className="pointer-events-none absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1"
                >
                  Chauffeur Rate
                </label>
                <ErrorMessage
                  name="chauffeurRate"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            )}

            {imagePreviews.length > 0 && (
              <div className="md:col-span-2">
                <label className="text-gray-600 text-xs mb-1 block">
                  Image Previews
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {imagePreviews.map((src, index) => (
                    <div key={index} className="relative">
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteImage(src, index, values, setFieldValue);
                        }}
                        className="absolute bottom-1 right-1 text-white text-sm p-2 hover:scale-105"
                        title="Delete Image"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="relative mb-4 md:col-span-2 grid grid-cols-1 gap-2">
              <label className="text-gray-600 text-xs mb-1 block">
                Upload Up to {MAX_IMAGES} Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(event) =>
                  handleImageChange(event, values, setFieldValue)
                }
                disabled={imagePreviews.length >= MAX_IMAGES}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand text-xs"
              />
              <small className="text-gray-500 text-xs">
                {`${imagePreviews.length}/${MAX_IMAGES} images selected`}
              </small>
              <ErrorMessage
                name="images"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <button
              type="submit"
              className="bg-brand text-white py-2 px-4 rounded-md mt-4 text-xs font-bold md:col-span-2"
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
