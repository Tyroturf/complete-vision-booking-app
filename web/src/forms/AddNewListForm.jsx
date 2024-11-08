import React from "react";
import { Field, ErrorMessage, Formik, Form } from "formik";
import * as Yup from "yup";

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
  carType: Yup.string().required("Car type is required"),
  images: Yup.array()
    .of(Yup.mixed().required("Image is required"))
    .min(5, "Please upload 5 images"),
});

const AddNewListForm = () => {
  return (
    <>
      <h3 className="text-base md:text-lg font-semibold mb-4 text-slate-500">
        Add new list
      </h3>
      <Formik
        initialValues={{
          listName: "",
          location: "",
          guests: "",
          price: "",
          description: "",
          features: "",
          carType: "",
          images: ["", "", "", "", ""],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form submitted:", values);
          // Handle form submission
        }}
      >
        {({ setFieldValue }) => (
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

            {/* Car Type Field (Select Dropdown) */}
            <div className="relative mb-4 md:col-span-2">
              <Field
                as="select"
                name="carType"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
              >
                <option value="">Select Car Type</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Coupe">Coupe</option>
                <option value="Bus">Bus</option>
                {/* Add more car types as needed */}
              </Field>
              <ErrorMessage
                name="carType"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Image Upload Fields */}
            <div className="relative mb-4 md:col-span-2 grid grid-cols-1  gap-2">
              <label className="text-gray-600 text-xs mb-1 block col-span-full">
                Images
              </label>
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="file"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      if (file) setFieldValue(`images[${index}]`, file);
                    }}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand text-xs"
                  />
                  <ErrorMessage
                    name={`images[${index}]`}
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-brand text-white py-2 px-4 rounded-md mt-4 text-xs md:text-sm md:col-span-2"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddNewListForm;
