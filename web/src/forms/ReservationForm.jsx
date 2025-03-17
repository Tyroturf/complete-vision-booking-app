import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import "../customDatePickerWidth.css";
import { fetchBookingCars, fetchTourTypes } from "../api";
import { useReservation } from "../contexts/ReservationContext";
import { formatDate } from "../utils/helpers";
import Modal from "../components/Modal";
import UploadSelfie from "../components/upload/UploadSelfie";
import UploadDL from "../components/upload/UploadDL";

const ReservationForm = ({
  initialValues,
  onSubmit,
  listing,
  user,
  page,
  uploadDL,
  uploadSelfie,
  isUploading,
  showDLUploadModal,
  showSelfieUploadModal,
  setShowDLUploadModal,
  setShowSelfieUploadModal,
}) => {
  const [interestedInCar, setInterestedInCar] = useState(false);
  const [selectedCar, setSelectedCar] = useState("");
  const [carList, setCarList] = useState([]);
  const [chauffeur, setChauffeur] = useState(false);
  const [drivingOption, setDrivingOption] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState(listing?.LIST_NAME);
  const [interestedInTour, setInterestedInTour] = useState(false);
  const [tourTypes, setTourType] = useState("");
  const [selectedTour, setSelectedTour] = useState("");
  const { reservationData, setReservationData } = useReservation();

  const [selfieError, setSelfieError] = useState("");
  const [DLError, setDLError] = useState("");
  const [drivingOptionError, setDrivingOptionError] = useState("");
  let reservationSchema = null;

  const commonFields = {
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    guests: Yup.number()
      .min(1, "At least one guest is required")
      .required("Number of guests is required"),
    phoneNumber: Yup.string()
      .length(10, "Phone number must be exactly 10 digits")
      .matches(/^\d{10}$/, "Phone number is not valid")
      .required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    checkIn: Yup.date().required("Check-in date is required"),
    checkOut: Yup.date()
      .required("Check-out date is required")
      .min(Yup.ref("checkIn"), "Check-out date cannot be before check-in date"),
  };

  const createPlaceSchema = () => {
    return Yup.object().shape({
      ...commonFields,
      selectedCar: Yup.mixed().when("interestedInCar", {
        is: true,
        then: () =>
          Yup.mixed().required(
            "Car selection is required when interested in renting a car"
          ),
        otherwise: () => Yup.mixed().notRequired(),
      }),
      drivingOption: Yup.mixed().when("interestedInCar", {
        is: true,
        then: () => Yup.string().required("Please select a driving option"),
        otherwise: () => Yup.string().notRequired(),
      }),
      pickupLocation: Yup.string().when(["interestedInCar", "drivingOption"], {
        is: (interestedInCar, drivingOption) =>
          interestedInCar && drivingOption === "chauffeur",
        then: () =>
          Yup.string().required(
            "Pick-up location is required when chauffeur is selected"
          ),
        otherwise: () => Yup.string().notRequired(),
      }),
      dropoffLocation: Yup.string().when(["interestedInCar", "drivingOption"], {
        is: (interestedInCar) => interestedInCar,
        then: () =>
          Yup.string().required(
            "Drop-off location is required when renting a car"
          ),
        otherwise: () => Yup.string().notRequired(),
      }),
      driverLicense: Yup.mixed()
        .nullable()
        .when(["interestedInCar", "drivingOption"], {
          is: (interestedInCar, drivingOption) =>
            interestedInCar &&
            drivingOption === "self-driving" &&
            !user.DL_PHOTO_URL,
          then: () =>
            Yup.mixed().required(
              "Driver's license is required for self-driving"
            ),
          otherwise: () => Yup.mixed().notRequired(),
        }),
      selfie: Yup.mixed()
        .nullable()
        .when(["interestedInCar", "drivingOption"], {
          is: (interestedInCar, drivingOption) =>
            interestedInCar &&
            drivingOption === "self-driving" &&
            !user.SELFIE_PHOTO_URL,
          then: () =>
            Yup.mixed().required("Selfie is required for self-driving"),
          otherwise: () => Yup.mixed().notRequired(),
        }),
      selectedTour: Yup.mixed().when("interestedInTour", {
        is: true,
        then: () =>
          Yup.mixed().required(
            "Please select a tour type when interested in tours"
          ),
        otherwise: () => Yup.mixed().notRequired(),
      }),
    });
  };

  const createCarSchema = () => {
    const needsDriverLicense = !user.DL_PHOTO_URL;
    const needsSelfie = !user.SELFIE_PHOTO_URL;

    return Yup.object().shape({
      ...commonFields,
      drivingOption: Yup.string().required("Please select a driving option"),
      pickupLocation: Yup.string().when("drivingOption", {
        is: "chauffeur",
        then: () =>
          Yup.string().required(
            "Pick-up location is required when chauffeur is selected"
          ),
        otherwise: () => Yup.string().notRequired(),
      }),
      dropoffLocation: Yup.string().required("Drop-off location is required"),
      driverLicense: Yup.string().when("drivingOption", {
        is: "self-driving",
        then: () =>
          needsDriverLicense
            ? Yup.string().required("Driver's license is required")
            : Yup.string().notRequired(),
        otherwise: () => Yup.string().notRequired(),
      }),
      selfie: Yup.string().when("drivingOption", {
        is: "self-driving",
        then: () =>
          needsSelfie
            ? Yup.string().required("Selfie is required")
            : Yup.string().notRequired(),
        otherwise: () => Yup.string().notRequired(),
      }),
    });
  };

  if (page === "place") {
    reservationSchema = createPlaceSchema();
  } else if (page === "car") {
    reservationSchema = createCarSchema();
  } else {
    reservationSchema = Yup.object().shape(commonFields);
  }

  useEffect(() => {
    const fetchCars = async () => {
      const params = {
        check_in: reservationData.checkIn,
        check_out: reservationData.checkOut,
        num_guests: reservationData.guests,
      };
      try {
        const response = await fetchBookingCars(params);
        setCarList(response.data.CarRentals);
      } catch (err) {
        console.error("Failed to fetch car data", err);
      }
    };

    if (interestedInCar) {
      fetchCars();
    }
  }, [interestedInCar, reservationData.checkIn, reservationData.checkOut]);

  useEffect(() => {
    const getTourTypes = async () => {
      try {
        const response = await fetchTourTypes();
        setTourType(response.data.TourType);
      } catch (err) {
        console.error("Failed to fetch tour types", err);
      }
    };

    if (interestedInTour) {
      getTourTypes();
    }
  }, [interestedInTour]);

  useEffect(() => {
    if (page === "car") {
      setReservationData({
        ...reservationData,
        dropoffLocation: "",
        selectedCar: {},
      });
    }
  }, [page]);

  const handleSubmit = (values) => {
    console.log("values", values);
    console.log("reserve", reservationData);

    onSubmit();
    const bookingData = {
      ...values,
    };

    // console.log(bookingData);
  };

  console.log(
    reservationSchema.validate(reservationData).catch((err) => {
      console.log("err", err.errors);
    })
  );

  const toggleUploadSelfieModal = () => {
    setShowSelfieUploadModal(!showSelfieUploadModal);
  };

  const toggleUploadDLModal = () => {
    setShowDLUploadModal(!showDLUploadModal);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={reservationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue, errors, touched }) => {
          setSelfieError(errors.selfie || "");
          setDLError(errors.driverLicense || "");
          setDrivingOptionError(errors.drivingOption || "");

          return (
            <Form className="rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="relative">
                <Field
                  type="text"
                  name="firstName"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                  placeholder=" "
                  value={reservationData.firstName}
                  onChange={(e) => {
                    setReservationData({
                      ...reservationData,
                      firstName: e.target.value,
                    });
                    setFieldValue("firstName", e.target.value);
                  }}
                />
                <label
                  htmlFor="firstName"
                  className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1 pointer-events-none text-[16px]"
                >
                  First Name
                </label>
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="relative">
                <Field
                  type="text"
                  name="lastName"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                  placeholder=" "
                  value={reservationData.lastName}
                  onChange={(e) => {
                    setReservationData({
                      ...reservationData,
                      lastName: e.target.value,
                    });
                    setFieldValue("lastName", e.target.value);
                  }}
                />
                <label
                  htmlFor="lastName"
                  className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1 pointer-events-none text-[16px]"
                >
                  Last Name
                </label>
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="relative">
                <Field
                  type="number"
                  name="guests"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                  placeholder=" "
                  min={1}
                  max={6}
                  value={reservationData.guests}
                  onChange={(e) => {
                    setReservationData({
                      ...reservationData,
                      guests: e.target.value,
                    });
                    setFieldValue("guests", e.target.value);
                  }}
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

              <div className="relative">
                <Field
                  type="text"
                  name="phoneNumber"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                  placeholder=" "
                  value={reservationData.phoneNumber}
                  onChange={(e) => {
                    setReservationData({
                      ...reservationData,
                      phoneNumber: e.target.value,
                    });
                    setFieldValue("phoneNumber", e.target.value);
                  }}
                />
                <label
                  htmlFor="phoneNumber"
                  className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1 pointer-events-none text-[16px]"
                >
                  Phone Number
                </label>
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="relative">
                <Field
                  type="email"
                  name="email"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                  placeholder=" "
                  value={reservationData.email}
                  onChange={(e) => {
                    setReservationData({
                      ...reservationData,
                      email: e.target.value,
                    });
                    setFieldValue("email", e.target.value);
                  }}
                />
                <label
                  htmlFor="email"
                  className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1 pointer-events-none text-[16px]"
                >
                  Email
                </label>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Date Picker */}
              <div className="relative col-span-1 md:col-span-2">
                <DatePicker
                  id="reservation-dates"
                  minDate={new Date()}
                  selected={
                    reservationData.checkIn
                      ? new Date(reservationData.checkIn)
                      : null
                  }
                  onChange={(dates) => {
                    const [start, end] = dates;
                    setReservationData({
                      ...reservationData,
                      checkIn: start ? formatDate(start) : null,
                      checkOut: end ? formatDate(end) : null,
                    });
                    setFieldValue("checkIn", start ? formatDate(start) : null);
                    setFieldValue("checkOut", end ? formatDate(end) : null);
                  }}
                  startDate={
                    reservationData.checkIn
                      ? new Date(reservationData.checkIn)
                      : null
                  }
                  endDate={
                    reservationData.checkOut
                      ? new Date(reservationData.checkOut)
                      : null
                  }
                  selectsRange
                  className="w-full border text-gray-600 border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand text-xs text-center sm:text-left"
                  wrapperClassName="customDatePickerWidth"
                />
                <label
                  htmlFor="reservation-dates"
                  className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1 pointer-events-none text-[16px]"
                >
                  Select Dates
                </label>
                <ErrorMessage
                  name="checkIn"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
                <ErrorMessage
                  name="checkOut"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {page === "place" && (
                <>
                  <div className="flex flex-col col-span-1 md:col-span-2">
                    <span className="font-bold text-sm my-5">
                      Add to your stay
                    </span>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="interestedInCar"
                        checked={interestedInCar}
                        onChange={() => {
                          setInterestedInCar(!interestedInCar);
                          setReservationData({
                            ...reservationData,
                            interestedInCar: !interestedInCar,
                          });
                          setFieldValue("interestedInCar", !interestedInCar);
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="interestedInCar" className="text-xs">
                        Interested in renting a car?
                      </label>
                    </div>

                    {interestedInCar && (
                      <>
                        <div className="mt-4">
                          <Field
                            as="select"
                            name="selectedCar"
                            value={selectedCar?.ID || ""}
                            onChange={(e) => {
                              const selectedCarId = Number(e.target.value);
                              const selectedCarObject = carList.find(
                                (car) => car.ID === selectedCarId
                              );

                              if (selectedCarObject) {
                                setFieldValue(
                                  "selectedCar",
                                  selectedCarObject.ID
                                );
                                setSelectedCar(selectedCarObject);
                                setReservationData((prevData) => ({
                                  ...prevData,
                                  selectedCar: selectedCarObject,
                                }));
                              } else {
                                console.error("Selected car not found");
                              }
                            }}
                            className="w-full border bg-white border-gray-300 text-gray-600 px-3 py-2 rounded-md text-xs"
                          >
                            <option value="" disabled>
                              Select Car
                            </option>
                            {carList?.length > 0 ? (
                              carList.map((car) => (
                                <option key={car.ID} value={car.ID}>
                                  {car.ListName}
                                </option>
                              ))
                            ) : (
                              <option value="" disabled>
                                No cars available
                              </option>
                            )}
                          </Field>
                          <ErrorMessage
                            name="selectedCar"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>

                        <div className="flex flex-col mt-4">
                          <span className="font-bold text-sm my-5">
                            Driving Option
                          </span>
                          <ErrorMessage
                            name="drivingOption"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="chauffeur"
                              name="drivingOption"
                              value="chauffeur"
                              checked={chauffeur}
                              onChange={() => {
                                setFieldValue("drivingOption", "chauffeur");
                                setDrivingOption("chauffeur");
                                setChauffeur(true);
                                setReservationData((prevData) => ({
                                  ...prevData,
                                  chauffeur: true,
                                  drivingOption: "chauffeur",
                                }));
                              }}
                              className="mr-2"
                            />
                            <label htmlFor="chauffeur" className="text-xs">
                              Chauffeur
                            </label>
                          </div>

                          {drivingOption === "chauffeur" && (
                            <>
                              <div className="relative my-4">
                                <Field
                                  type="text"
                                  name="pickupLocation"
                                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                                  placeholder="Ex: Home Address"
                                  value={reservationData.pickupLocation}
                                  onChange={(e) => {
                                    setReservationData({
                                      ...reservationData,
                                      pickupLocation: e.target.value,
                                    });
                                    setFieldValue(
                                      "pickupLocation",
                                      e.target.value
                                    );
                                  }}
                                />
                                <label
                                  htmlFor="pickupLocation"
                                  className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1 pointer-events-none text-[16px]"
                                >
                                  Pick-up Location
                                </label>
                                <ErrorMessage
                                  name="pickupLocation"
                                  component="div"
                                  className="text-red-500 text-xs mt-1"
                                />
                              </div>
                              <div className="relative my-4">
                                <Field
                                  type="text"
                                  name="dropoffLocation"
                                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                                  placeholder=" "
                                  value={reservationData.dropoffLocation}
                                  onChange={(e) => {
                                    setReservationData({
                                      ...reservationData,
                                      dropoffLocation: e.target.value,
                                    });
                                    setFieldValue(
                                      "dropoffLocation",
                                      e.target.value
                                    );
                                  }}
                                />
                                <label
                                  htmlFor="dropoffLocation"
                                  className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1 pointer-events-none text-[16px]"
                                >
                                  Drop-off Location
                                </label>
                                <ErrorMessage
                                  name="dropoffLocation"
                                  component="div"
                                  className="text-red-500 text-xs mt-1"
                                />
                              </div>
                            </>
                          )}

                          <div className="flex items-center mt-4">
                            <input
                              type="radio"
                              id="self-driving"
                              name="self-driving"
                              value="self-driving"
                              checked={drivingOption === "self-driving"}
                              onChange={(e) => {
                                setChauffeur(false);
                                setDrivingOption("self-driving");
                                setReservationData((prevData) => ({
                                  ...prevData,
                                  chauffeur: false,
                                  drivingOption: "self-driving",
                                }));
                                setFieldValue("drivingOption", "self-driving");
                              }}
                              className="mr-2"
                            />
                            <label htmlFor="self-driving" className="text-xs">
                              Self-driving
                            </label>
                            <ErrorMessage
                              name="self-driving"
                              component="div"
                              className="text-red-500 text-xs mt-1"
                            />
                          </div>

                          {drivingOption === "self-driving" && (
                            <>
                              <div className="relative mt-8">
                                <Field
                                  type="text"
                                  name="dropoffLocation"
                                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                                  placeholder="Ex: Home Address"
                                  value={reservationData.dropoffLocation}
                                  onChange={(e) => {
                                    setDropoffLocation(e.target.value);
                                    setReservationData((prevData) => ({
                                      ...prevData,
                                      dropoffLocation: e.target.value,
                                    }));
                                    setFieldValue(
                                      "dropoffLocation",
                                      e.target.value
                                    );
                                  }}
                                />
                                <label
                                  htmlFor="dropoffLocation"
                                  className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1 pointer-events-none text-[16px]"
                                >
                                  Drop-off Location
                                </label>
                                <ErrorMessage
                                  name="dropoffLocation"
                                  component="div"
                                  className="text-red-500 text-xs mt-1"
                                />
                              </div>
                              {!user.DL_PHOTO_URL && (
                                <button
                                  type="button"
                                  onClick={() => setShowDLUploadModal(true)}
                                  className="border text-brand px-4 py-2 rounded-md my-5 text-xs hover:scale-105 transition"
                                >
                                  Upload Driver Licence
                                </button>
                              )}
                              {!user.SELFIE_PHOTO_URL && (
                                <button
                                  type="button"
                                  onClick={() => setShowSelfieUploadModal(true)}
                                  className="border text-brand px-4 py-2 rounded-md text-xs hover:scale-105 transition mt-4"
                                >
                                  Upload Selfie
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col gap-4">
                    {page === "place" && selfieError && touched.selfie && (
                      <div className="text-red-500 text-xs">{selfieError}</div>
                    )}
                    {page === "place" && DLError && touched.driverLicense && (
                      <div className="text-red-500 text-xs mt-1">{DLError}</div>
                    )}
                    {page === "place" && drivingOptionError && (
                      <div className="text-red-500 text-xs mt-1">
                        {drivingOptionError}
                      </div>
                    )}
                  </div>
                  <br />
                  {page === "place" &&
                    user.DL_PHOTO_URL &&
                    drivingOption === "self-driving" && (
                      <a
                        href={user.DL_PHOTO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 text-xs mt-1 underline cursor-pointer block"
                      >
                        Driver's Licence already uploaded.
                      </a>
                    )}
                  <br />
                  {page === "place" &&
                    user.SELFIE_PHOTO_URL &&
                    drivingOption === "self-driving" && (
                      <a
                        href={user.SELFIE_PHOTO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 text-xs mt-1 underline cursor-pointer block"
                      >
                        Selfie already uploaded.
                      </a>
                    )}
                  {/* Interested in Tour Section */}
                  <div className="flex flex-col col-span-1 md:col-span-2">
                    <span className="font-bold text-sm my-5">Private tour</span>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="interestedInTour"
                        checked={interestedInTour}
                        onChange={() => {
                          setInterestedInTour(!interestedInTour);
                          setReservationData((prevData) => ({
                            ...prevData,
                            interestedInTour: !interestedInTour,
                          }));
                          setFieldValue("interestedInTour", !interestedInTour);
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="interestedInTour" className="text-xs">
                        Interested in a private tour?
                      </label>
                      <ErrorMessage
                        name="interestedInTour"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    {/* Tour Type Selection */}
                    {interestedInTour && (
                      <div className="mt-4">
                        <Field
                          as="select"
                          name="selectedTour"
                          value={selectedTour?.ID || ""}
                          placeholder="Select Tour"
                          onChange={(e) => {
                            const selectedTourId = Number(e.target.value);

                            const selectedTourObject = tourTypes.find(
                              (tour) => {
                                return tour.ID === selectedTourId;
                              }
                            );

                            if (selectedTourObject) {
                              setFieldValue("selectedTour", selectedTourObject);
                              setSelectedTour(selectedTourObject);
                              setReservationData((prevData) => ({
                                ...prevData,
                                selectedTour: selectedTourObject,
                              }));
                            } else {
                              console.error("Selected tour not found");
                            }
                          }}
                          className="w-full border bg-white border-gray-300 text-gray-600 px-3 py-2 rounded-md text-xs"
                        >
                          <option value="" disabled>
                            Select Tour Type
                          </option>
                          {tourTypes.length > 0 ? (
                            tourTypes.map((tour) => (
                              <option key={tour.ID} value={tour.ID}>
                                {tour.LIST_NAME}
                              </option>
                            ))
                          ) : (
                            <option value="" disabled>
                              No tour types available
                            </option>
                          )}
                        </Field>
                        <ErrorMessage
                          name="selectedTour"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                    )}
                  </div>
                </>
              )}

              {page === "car" && (
                <div className="flex flex-col mt-4 md:col-span-2">
                  <span className="font-bold text-sm my-5">Driving Option</span>
                  <ErrorMessage
                    name="drivingOption"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="chauffeur"
                      name="drivingOption"
                      value="chauffeur"
                      checked={drivingOption === "chauffeur"}
                      onChange={() => {
                        setFieldValue("drivingOption", "chauffeur");
                        setDrivingOption("chauffeur");
                        setChauffeur(true);
                        setReservationData((prevData) => ({
                          ...prevData,
                          chauffeur: true,
                          drivingOption: "chauffeur",
                        }));
                      }}
                      className="mr-2"
                    />
                    <label htmlFor="chauffeur" className="text-xs">
                      Chauffeur
                    </label>
                  </div>

                  {drivingOption === "chauffeur" && (
                    <>
                      <div className="relative my-4">
                        <Field
                          type="text"
                          name="pickupLocation"
                          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                          placeholder="Ex: Home Address"
                          value={reservationData.pickupLocation}
                          onChange={(e) => {
                            setReservationData({
                              ...reservationData,
                              pickupLocation: e.target.value,
                            });
                            setFieldValue("pickupLocation", e.target.value);
                          }}
                        />
                        <label className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1 pointer-events-none text-[16px]">
                          Pick-up Location
                        </label>
                        <ErrorMessage
                          name="pickupLocation"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                      <div className="relative my-4">
                        <Field
                          type="text"
                          name="dropoffLocation"
                          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                          placeholder=" "
                          value={reservationData.dropoffLocation}
                          onChange={(e) => {
                            setReservationData({
                              ...reservationData,
                              dropoffLocation: e.target.value,
                            });
                            setFieldValue("dropoffLocation", e.target.value);
                          }}
                        />
                        <label
                          htmlFor="dropoffLocation"
                          className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1 pointer-events-none text-[16px]"
                        >
                          Drop-off Location
                        </label>
                        <ErrorMessage
                          name="dropoffLocation"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex items-center mt-4">
                    <input
                      type="radio"
                      id="self-driving"
                      name="drivingOption"
                      value="self-driving"
                      checked={drivingOption === "self-driving"}
                      onChange={() => {
                        setChauffeur(false);
                        setDrivingOption("self-driving");
                        setReservationData((prevData) => ({
                          ...prevData,
                          chauffeur: false,
                          drivingOption: "self-driving",
                        }));
                        setFieldValue("drivingOption", "self-driving");
                      }}
                      className="mr-2"
                    />
                    <label htmlFor="self-driving" className="text-xs">
                      Self-driving
                    </label>
                    <ErrorMessage
                      name="drivingOption"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  {drivingOption === "self-driving" && (
                    <>
                      <div className="relative mt-8">
                        <Field
                          type="text"
                          name="dropoffLocation"
                          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                          placeholder="Ex: Home Address"
                          value={reservationData.dropoffLocation}
                          onChange={(e) => {
                            setDropoffLocation(e.target.value);
                            setReservationData((prevData) => ({
                              ...prevData,
                              dropoffLocation: e.target.value,
                            }));
                            setFieldValue("dropoffLocation", e.target.value);
                          }}
                        />
                        <label
                          htmlFor="dropoffLocation"
                          className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1 pointer-events-none text-[16px]"
                        >
                          Drop-off Location
                        </label>
                        <ErrorMessage
                          name="dropoffLocation"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                      {!user.DL_PHOTO_URL && (
                        <button
                          type="button"
                          onClick={() => setShowDLUploadModal(true)}
                          className="border text-brand px-4 py-2 rounded-md my-2 text-xs hover:scale-105 transition"
                        >
                          Upload Driver's License
                        </button>
                      )}

                      {!user.SELFIE_PHOTO_URL && (
                        <button
                          type="button"
                          onClick={() => setShowSelfieUploadModal(true)}
                          className="border text-brand px-4 py-2 rounded-md my-2 text-xs hover:scale-105 transition"
                        >
                          Upload Selfie
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
              <div className="flex flex-col gap-4">
                {page === "car" && selfieError && touched.selfie && (
                  <div className="text-red-500 text-xs">{selfieError}</div>
                )}
                {page === "car" && DLError && touched.driverLicense && (
                  <div className="text-red-500 text-xs mt-1">{DLError}</div>
                )}
                {page === "car" && drivingOptionError && (
                  <div className="text-red-500 text-xs mt-1">
                    {drivingOptionError}
                  </div>
                )}
              </div>
              <br />
              <div className="flex flex-col gap-4">
                {page === "car" &&
                  user.DL_PHOTO_URL &&
                  drivingOption === "self-driving" && (
                    <a
                      href={user.DL_PHOTO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 text-xs mt-1 underline cursor-pointer"
                    >
                      Driver's Licence already uploaded.
                    </a>
                  )}

                {page === "car" &&
                  user.SELFIE_PHOTO_URL &&
                  drivingOption === "self-driving" && (
                    <a
                      href={user.SELFIE_PHOTO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 text-xs mt-1 underline cursor-pointer"
                    >
                      Selfie already uploaded.
                    </a>
                  )}
              </div>

              <div className="col-span-1 md:col-span-2 w-full flex justify-center">
                <button
                  type="submit"
                  className="bg-brand-5xl w-full text-white text-xs font-bold p-4 rounded mt-4 hover:scale-105 transition"
                  disabled={isSubmitting}
                >
                  Submit Reservation
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <Modal isOpen={showDLUploadModal} onClose={toggleUploadDLModal}>
        <UploadDL handleSubmit={uploadDL} isUploading={isUploading} />
      </Modal>
      <Modal isOpen={showSelfieUploadModal} onClose={toggleUploadSelfieModal}>
        <UploadSelfie handleSubmit={uploadSelfie} isUploading={isUploading} />
      </Modal>
    </>
  );
};

export default ReservationForm;
