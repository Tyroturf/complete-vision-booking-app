import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import hero from "../assets/g.jpg";
import "../styles.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RatingSummary } from "../components/Review";
import wheel from "../assets/wheel.webp";
import city from "../assets/city.webp";
import scrape from "../assets/scrape.webp";
import hall from "../assets/hall.webp";
import tall from "../assets/tall.webp";

const TotalBookings = ({ totalBookings }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      className="bg-white p-4 rounded-lg shadow-md"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text:sm md:text-lg font-semibold my-2">Total Bookings</h3>
      <div className="md:mt-24">
        <p className="text-3xl font-bold">
          {inView && <CountUp start={1} end={totalBookings} duration={3} />} +
        </p>
        <p className="text-sm text-gray-600">
          As of {new Date().toDateString()}
        </p>
      </div>
    </motion.div>
  );
};

const Home = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [monthlyBookings, setMonthlyBookings] = useState([]);
  const [bookingSources, setBookingSources] = useState([]);

  useEffect(() => {
    setTotalBookings(1200);
    setMonthlyBookings([
      { month: "Jan", bookings: 100 },
      { month: "Feb", bookings: 150 },
      { month: "Mar", bookings: 200 },
    ]);
    setBookingSources([
      { name: "Direct", value: 400 },
      { name: "Referral", value: 300 },
      { name: "Social Media", value: 500 },
    ]);
  }, []);

  return (
    <div className="p-4 text-gray-600">
      <h2 className="text:lg md:text-2xl font-bold mb-4">Dashboard</h2>

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <TotalBookings totalBookings={100} />

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text:sm md:text-lg font-semibold my-2">
            Monthly Bookings
          </h3>
          <ResponsiveContainer width="80%" height={200}>
            <LineChart data={monthlyBookings}>
              <Line type="monotone" dataKey="bookings" stroke="#8884d8" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text:sm md:text-lg font-semibold my-2">
            Booking Sources
          </h3>
          <ResponsiveContainer width="80%" height={200}>
            <PieChart>
              <Pie
                data={bookingSources}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
              >
                {bookingSources.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#8884d8", "#82ca9d", "#ffc658"][index]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col md:flex-row bg-white shadow-sm mb-7"
      onClick={() => navigate("/booking-details")}
    >
      <img
        src={booking.image}
        alt={booking.title}
        className="w-full h-52 md:w-96 md:h-72 lg:h-72 object-cover rounded-t-lg md:rounded-r-none md:rounded-l-lg"
      />
      <div className="flex flex-col md:m-5 mt-5 justify-center w-auto md:w-full">
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-3">
            <span className="font-bold">{booking.title}</span>
            <span className="font-thin text-xs">Date: {booking.date}</span>
            <span className="font-thin text-xs">
              Location: {booking.location}
            </span>
            <div className="flex gap-2 bg-white rounded-lg pr-4">
              <ul className="flex gap-x-2">
                {booking.amenities?.map((am, index) => (
                  <li key={index} className="text-xs font-medium">
                    {am}
                  </li>
                ))}
              </ul>
            </div>
            <RatingSummary rating={booking.rating} />
          </div>
          <div className="flex">
            <span className="text-brand font-bold text-base">
              ${booking.amount}{" "}
              <span className="font-thin text-xs">/ booking</span>
            </span>
          </div>
        </div>
        <div className="flex my-5">
          <button
            className="bg-brand p-3 px-6 text-white font-medium rounded-sm text-xs w-full"
            onClick={() => navigate("/booking-details")} // Adjust the path as needed
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("Past Stays");

  const bookingsData = {
    "Past Stays": [
      {
        title: "Stay in New York",
        date: "2024-01-10",
        location: "New York, NY",
        amount: 200,
        image: wheel,
        status: "Completed",
      },
      {
        title: "Stay in Paris",
        date: "2024-02-15",
        location: "Paris, France",
        image: hall,
        amount: 300,
        status: "Cancelled",
      },
    ],
    Rentals: [
      {
        title: "Car Rental in LA",
        date: "2024-03-12",
        location: "Los Angeles, CA",
        image: tall,
        amount: 150,
        status: "Completed",
      },
      {
        title: "Car Rental in Tokyo",
        date: "2024-04-18",
        location: "Tokyo, Japan",
        image: scrape,
        amount: 250,
        status: "Cancelled",
      },
    ],
    Tours: [
      {
        title: "Tour of Rome",
        date: "2024-05-10",
        location: "Rome, Italy",
        amount: 100,
        image: city,
        status: "Completed",
      },
      {
        title: "Tour of London",
        date: "2024-06-22",
        location: "London, UK",
        image: tall,
        amount: 120,
        status: "Cancelled",
      },
    ],
  };

  const bookings = bookingsData[activeTab];

  return (
    <div>
      <Navbar
        setActiveSection={setActiveTab}
        activeSection={activeTab}
        sections={["Past Stays", "Rentals", "Tours"]}
      />
      <div className="p-4">
        {bookings.map((booking, index) => (
          <BookingCard key={index} booking={booking} />
        ))}
      </div>
    </div>
  );
};

const Account = () => {
  const initialValues = {
    username: "currentUsername",
    email: "currentEmail@example.com",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string().min(
      6,
      "Password should be at least 6 characters"
    ),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .when("newPassword", {
        is: (val) => val && val.length > 0,
        then: Yup.string().required("Please confirm your new password"),
      }),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Account details updated", values);
    setSubmitting(false);
  };

  return (
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center mx-auto">
      <h3 className="text-base md:text-lg font-semibold mb-4 text-slate-500">
        Edit Account Information
      </h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div className="relative">
              <Field
                type="text"
                name="username"
                id="username"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                placeholder=" "
              />
              <label
                htmlFor="username"
                className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1"
              >
                Username
              </label>
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="relative">
              <Field
                type="email"
                name="email"
                id="email"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1"
              >
                Email
              </label>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="relative">
              <Field
                type="password"
                name="currentPassword"
                id="currentPassword"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                placeholder=" "
              />
              <label
                htmlFor="currentPassword"
                className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1"
              >
                Current Password
              </label>
              <ErrorMessage
                name="currentPassword"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="relative">
              <Field
                type="password"
                name="newPassword"
                id="newPassword"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                placeholder=" "
              />
              <label
                htmlFor="newPassword"
                className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1"
              >
                New Password
              </label>
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="relative">
              <Field
                type="password"
                name="confirmNewPassword"
                id="confirmNewPassword"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-brand peer text-xs"
                placeholder=" "
              />
              <label
                htmlFor="confirmNewPassword"
                className="absolute left-3 top-2 text-gray-600 bg-white px-1 text-xs transition-all duration-200 transform origin-top-left -translate-y-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1"
              >
                Confirm New Password
              </label>
              <ErrorMessage
                name="confirmNewPassword"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand text-white py-2 rounded-md font-bold hover:scale-105 transition-transform duration-200 text-xs"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Account"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const Payment = () => <div>Manage payment information...</div>;

const Navbar = ({
  setActiveSection,
  activeSection,
  sections = ["home", "bookings", "account", "payment"],
}) => {
  return (
    <div className="flex justify-around items-center p-4 mt-4 relative shadow-sm">
      {sections.map((section, index) => (
        <React.Fragment key={section}>
          <button
            onClick={() => setActiveSection(section)}
            className={`text-xs md:text-sm nav-button text-gray-600 ${
              activeSection === section ? "nav-button-active" : ""
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
          {index < sections.length - 1 && (
            <span className="h-2 md:h-5 border-l border-gray-300"></span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("home");

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <Home />;
      case "bookings":
        return <Bookings />;
      case "account":
        return <Account />;
      case "payment":
        return <Payment />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col">
      <ProfileHero imageUrl={hero} />
      <Navbar
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />
      <div className="relative overflow-hidden">{renderSection()}</div>
    </div>
  );
};

export const ProfileHero = ({ imageUrl }) => (
  <>
    <img
      src={imageUrl}
      alt="profileHero"
      className="relative bg-cover bg-bottom lg:h-80 md:h-64 h-48 mt-8 md:mt-12 rounded-sm object-cover"
    />
    <div className="text-center -mt-12 z-0">
      <img
        src="https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
        alt=""
        className="w-20 h-20 m-auto rounded-full object-cover md:w-28 md:h-28 border-4 border-brand hover:scale-110 transition"
      />
      <h5 className="mt-4 md:text-xl text-xs font-semibold text-gray-600">
        Cynthia J. Watts
      </h5>
      <span className="text-xs text-gray-400 lg:block">Admin</span>
    </div>
  </>
);
