import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ initialValues, onSubmit }) => {
  const navigate = useNavigate();

  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    navigate("/search");
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values }) => (
        <Form className="mt-2 p-3 rounded-xl border border-brand shadow-md grid grid-cols-2 md:grid-cols-5 items-center gap-4 mx-10 align-middle">
          {/* Destination Input */}
          <div className="relative">
            <Field
              type="text"
              name="destination"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
              placeholder=" "
            />
            <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1">
              Location
            </label>
          </div>

          {/* Guests Input */}
          <div className="relative">
            <Field
              type="number"
              name="guests"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
              placeholder=" "
              min={1}
              max={6}
            />
            <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1">
              Guests
            </label>
          </div>

          {/* Check-in Date Input */}
          <div className="relative">
            <Field
              type="date"
              name="checkIn"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
              placeholder=" "
            />
            <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1">
              Check-in Date
            </label>
          </div>

          {/* Check-out Date Input */}
          <div className="relative">
            <Field
              type="date"
              name="checkOut"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
              placeholder=" "
            />
            <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1">
              Check-out Date
            </label>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="bg-brand text-white p-1 col-span-2 md:col-span-1 text-sm hover:bg-[#f2b23d] rounded-lg font-bold transition hover:scale-105"
          >
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SearchBar;
