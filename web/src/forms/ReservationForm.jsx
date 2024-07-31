import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import "../customDatePickerWidth.css";

const reservationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  guests: Yup.number()
    .min(1, "At least one guest is required")
    .required("Number of guests is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number is not valid")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ReservationForm = ({ initialValues, onSubmit }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [interestedInCar, setInterestedInCar] = useState(false);
  const [carType, setCarType] = useState("");
  const [chauffeur, setChauffeur] = useState(false);
  const [pickupDropoff, setPickupDropoff] = useState(false);
  const [interestedInTour, setInterestedInTour] = useState(false);
  const [tourType, setTourType] = useState("");

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={reservationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit({
          ...values,
          startDate: startDate ? startDate.toISOString().split("T")[0] : null,
          endDate: endDate ? endDate.toISOString().split("T")[0] : null,
          interestedInCar,
          carType,
          chauffeur,
          pickupDropoff,
          interestedInTour,
          tourType,
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name Input */}
          <div className="relative">
            <Field
              type="text"
              name="firstName"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
              placeholder=" "
            />
            <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1">
              First Name
            </label>
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Last Name Input */}
          <div className="relative">
            <Field
              type="text"
              name="lastName"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
              placeholder=" "
            />
            <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1">
              Last Name
            </label>
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
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
            <ErrorMessage
              name="guests"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Phone Number Input */}
          <div className="relative">
            <Field
              type="text"
              name="phoneNumber"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
              placeholder=" "
            />
            <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1">
              Phone Number
            </label>
            <ErrorMessage
              name="phoneNumber"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <Field
              type="email"
              name="email"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
              placeholder=" "
            />
            <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1">
              Email
            </label>
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Check-in and Check-out Dates */}
          <div className="relative col-span-1 md:col-span-2">
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              className="w-full border text-gray-600 border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand text-xs text-center sm:text-left"
              wrapperClassName="customDatePickerWidth"
            />
            <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1">
              Select Dates
            </label>
          </div>

          {/* Interested in Car Section */}
          <div className="flex flex-col col-span-1 md:col-span-2">
            <span className="font-bold text-sm my-5">Add to your stay</span>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="interestedInCar"
                checked={interestedInCar}
                onChange={() => setInterestedInCar(!interestedInCar)}
                className="mr-2"
              />
              <label htmlFor="interestedInCar" className="text-xs">
                Interested in renting a car?
              </label>
            </div>

            {/* Car Type Selection */}
            {interestedInCar && (
              <>
                <div className="mt-4">
                  <span className="text-gray-600 text-xs mb-2 block">
                    Select Car Type
                  </span>
                  <Field
                    as="select"
                    name="carType"
                    value={carType}
                    onChange={(e) => setCarType(e.target.value)}
                    className="w-full border bg-white border-gray-300 text-gray-600 px-3 py-2 rounded-md text-xs"
                  >
                    <option value="suv">SUV</option>
                    <option value="sedan">Sedan</option>
                  </Field>
                </div>

                <div className="relative mt-4">
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

                {/* Chauffeur or Self-driving Selection */}
                <div className="flex flex-col mt-4">
                  <span className="font-bold text-sm my-5">Driving Option</span>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="chauffeur"
                      name="drivingOption"
                      value="chauffeur"
                      checked={chauffeur}
                      onChange={() => {
                        setChauffeur(true);
                        setPickupDropoff(false);
                      }}
                      className="mr-2"
                    />
                    <label htmlFor="chauffeur" className="text-xs">
                      Chauffeur
                    </label>
                  </div>
                  <div className="flex items-center mt-2">
                    <input
                      type="radio"
                      id="pickupDropoff"
                      name="drivingOption"
                      value="pickupDropoff"
                      checked={pickupDropoff}
                      onChange={() => {
                        setChauffeur(false);
                        setPickupDropoff(true);
                      }}
                      className="mr-2"
                    />
                    <label htmlFor="pickupDropoff" className="text-xs">
                      Self-driving (Pickup & Dropoff)
                    </label>
                  </div>

                  {!chauffeur && (
                    <div className="mt-4">
                      <div className="flex flex-col">
                        <label
                          htmlFor="idUpload"
                          className="text-gray-600 text-xs mb-2"
                        >
                          Upload ID
                        </label>
                        <input
                          type="file"
                          id="idUpload"
                          name="idUpload"
                          className="w-full border bg-white border-gray-300 text-gray-600 px-3 py-2 rounded-md text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Interested in Tour Section */}
          <div className="flex flex-col col-span-1 md:col-span-2">
            <span className="font-bold text-sm my-5">Private tour</span>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="interestedInTour"
                checked={interestedInTour}
                onChange={() => setInterestedInTour(!interestedInTour)}
                className="mr-2"
              />
              <label htmlFor="interestedInTour" className="text-xs">
                Interested in a private tour?
              </label>
            </div>

            {/* Tour Type Selection */}
            {interestedInTour && (
              <div className="mt-4">
                <span className="text-gray-600 text-xs mb-2 block">
                  Select Tour Type
                </span>
                <Field
                  as="select"
                  name="tourType"
                  value={tourType}
                  onChange={(e) => setTourType(e.target.value)}
                  className="w-full border bg-white border-gray-300 text-gray-600 px-3 py-2 rounded-md text-xs"
                >
                  <option value="historical">Historical Tour</option>
                  <option value="cultural">Cultural Tour</option>
                  <option value="adventure">Adventure Tour</option>
                </Field>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 w-full flex justify-center">
            <button
              type="submit"
              className="bg-brand w-full text-white text-xs font-bold p-4 rounded mt-4 hover:scale-105 transition"
              disabled={isSubmitting}
            >
              Submit Reservation
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ReservationForm;
