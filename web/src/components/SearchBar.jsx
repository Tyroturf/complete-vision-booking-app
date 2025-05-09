import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useSearch } from "../contexts/SearchContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../customDatePickerWidth.css";
import { formatDate, getQueryParams } from "../utils/helpers";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = ({ initialValues }) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const {
    updateSearchParams,
    searchPlaces,
    setFindPlacesParams,
    searchCars,
    searchTours,
  } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = getQueryParams(location.search);
  const initialCity = queryParams.p_city || initialValues.city;
  const initialSearch = queryParams.p_search || initialValues.search;
  const initialCarType = queryParams.p_car_type || initialValues.carType;
  const initialTourType = queryParams.p_tour_type || initialValues.tourType;
  const initialGuests = queryParams.p_num_guests || initialValues.guests;
  const initialStartDate = queryParams.p_check_in
    ? new Date(queryParams.p_check_in)
    : new Date();
  const initialEndDate = queryParams.p_check_out
    ? new Date(queryParams.p_check_out)
    : null;

  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  useEffect(() => {
    if (!queryParams.p_check_in && !queryParams.p_check_out) {
      setStartDate(today);
      setEndDate(tomorrow);
    } else {
      setStartDate(queryParams.p_check_in);
      setEndDate(queryParams.p_check_out);
    }
  }, [location.search, queryParams.p_check_in, queryParams.p_check_out]);

  const onChange = (dates) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
  };

  const handleSubmit = async (values) => {
    const searchParams = {
      p_check_in: formatDate(values.startDate),
      p_check_out: formatDate(values.endDate),
      p_num_guests: values.guests,
      p_city: values.city,
      p_search: values.search,
      p_car_type: values.carType,
      p_tour_type: values.tourType,
    };

    updateSearchParams(searchParams);

    let queryString = new URLSearchParams(searchParams).toString();
    queryString = queryString.replace(/\+/g, "%20");

    if (location.pathname === "/") {
      setFindPlacesParams(searchParams);
      navigate(`/places?${queryString}`, { replace: true });
    } else {
      if (location.pathname === "/places") {
        await searchPlaces(searchParams);
      } else if (location.pathname === "/cars") {
        await searchCars(searchParams);
      } else if (location.pathname === "/tours") {
        await searchTours(searchParams);
      }
      navigate(`?${queryString}`, { replace: true });
    }
  };

  return (
    <Formik
      initialValues={{
        city: initialCity || "",
        search: initialSearch || "",
        carType: initialCarType || "",
        tourType: initialTourType || "",
        guests: initialGuests,
        startDate: initialStartDate,
        endDate: initialEndDate,
      }}
      enableReinitialize={true}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, resetForm }) => {
        useEffect(() => {
          resetForm();
          setStartDate(today);
          setEndDate(tomorrow);
        }, [location.pathname]);
        return (
          <Form
            className={`p-3 rounded-xl border border-brand shadow-md grid grid-cols-2 ${
              location.pathname === "/places" || location.pathname === "/"
                ? "lg:grid-cols-5"
                : "lg:grid-cols-6"
            } items-center gap-4 mx-10 xl:mx-52 align-middle`}
          >
            {" "}
            <div className="relative">
              <Field
                type="text"
                name="search"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-[16px] lg:text-xs"
                placeholder=" "
              />
              <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1 pointer-events-none">
                Name
              </label>
            </div>
            <div className="relative">
              <Field
                type="text"
                name="city"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-[16px] lg:text-xs"
                placeholder=" "
              />
              <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1 pointer-events-none">
                Location
              </label>
            </div>
            {location.pathname === "/cars" && (
              <div className="relative">
                <Field
                  as="select"
                  id="carType"
                  name="carType"
                  value={values.carType}
                  onChange={(e) => setFieldValue("carType", e.target.value)}
                  className="w-full border bg-white border-gray-300 text-gray-600 px-3 py-2 rounded-md text-[16px] lg:text-xs"
                >
                  <option value="" disabled className="text-xs">
                    Car Type
                  </option>
                  <option value="SUV" className="text-sm">
                    SUV
                  </option>
                  <option value="Sedan" className="text-sm">
                    Sedan
                  </option>
                  <option value="Bus" className="text-sm">
                    Bus
                  </option>
                  <option value="Coupe" className="text-sm">
                    Coupe
                  </option>
                </Field>
              </div>
            )}
            {location.pathname === "/tours" && (
              <div className="relative">
                <Field
                  as="select"
                  id="tourType"
                  name="tourType"
                  value={values.tourType}
                  onChange={(e) => setFieldValue("tourType", e.target.value)}
                  className="w-full border bg-white border-gray-300 text-gray-600 px-3 py-2 rounded-md text-[16px] lg:text-xs"
                >
                  <option value="" disabled className="text-xs">
                    Tour Type
                  </option>
                  <option value="Galleria Tour" className="text-sm">
                    Galleria Tour
                  </option>
                  <option value="Historical Tour" className="text-sm">
                    Historical Tour
                  </option>
                  <option value="Fun Experiences" className="text-sm">
                    Fun Experiences
                  </option>
                </Field>
              </div>
            )}
            <div
              className={`relative ${
                location.pathname === "/" && "col-span-2 md:col-span-1"
              }`}
            >
              <Field
                type="number"
                name="guests"
                className="w-full border border-gray-300 px-3 py-2  rounded-md focus:outline-none focus:border-brand peer text-[16px] lg:text-xs"
                placeholder=" "
                min={1}
                max={6}
              />
              <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1 pointer-events-none">
                Guests
              </label>
            </div>
            <div className="relative col-span-2 md:col-span-1">
              <DatePicker
                selected={values.startDate}
                onChange={(dates) => {
                  const [start, end] = dates;
                  setFieldValue("startDate", start);
                  setFieldValue("endDate", end);
                }}
                startDate={values.startDate}
                endDate={values.endDate}
                selectsRange
                minDate={new Date()}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand text-[16px] lg:text-xs text-center sm:text-left"
                wrapperClassName="customDatePickerWidth"
              />
              <label className="text-xs absolute left-3 top-2 text-gray-600 bg-white px-1 transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1 pointer-events-none">
                Select Date
              </label>
            </div>
            <button
              type="submit"
              className="bg-brand text-white p-1 col-span-2 md:col-span-1 text-sm hover:bg-brand-3xl rounded-lg font-bold transition hover:scale-105"
            >
              Search
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SearchBar;
