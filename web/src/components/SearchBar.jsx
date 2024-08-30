import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useSearch } from "../contexts/SearchContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../customDatePickerWidth.css";
import { formatDate } from "../utils/helpers";

const SearchBar = ({ initialValues }) => {
  const { updateSearchParams, setCurrentPage, searchPlaces } = useSearch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleSubmit = async (values) => {
    const searchParams = {
      p_check_in: formatDate(startDate),
      p_check_out: formatDate(endDate),
      p_num_guests: values.guests,
      p_search: values.destination,
    };

    updateSearchParams(searchParams);
    setCurrentPage("places");
    await searchPlaces(searchParams);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form className="p-3 rounded-xl border border-brand shadow-md grid grid-cols-2 md:grid-cols-4 items-center gap-4 mx-10 xl:mx-52 align-middle">
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

          {/* Number of Guests Input */}
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

          {/* Date Range Picker */}
          <div className="relative col-span-2 md:col-span-1">
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand text-xs text-center sm:text-left"
              wrapperClassName="customDatePickerWidth"
            />
            <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1">
              Select Date
            </label>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="bg-brand text-white p-1 col-span-2 md:col-span-1 text-sm hover:bg-brand-3xl rounded-lg font-bold transition hover:scale-105"
          >
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SearchBar;
