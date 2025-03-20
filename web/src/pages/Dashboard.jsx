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
import * as Yup from "yup";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { getColor, getHeadingText, getInitials } from "../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { fetchUser, updateUserDetails } from "../api";
import EditableProfileForm from "../forms/EditableProfileForm";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import Loader from "../components/Loader";

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

const Account = ({ user, fetchUserDetails, id }) => {
  const {
    first_name,
    last_name,
    contact,
    role,
    username,
    host_type,
    driver_license,
    selfie,
  } = user;
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing(!isEditing);

  const initialValues = {
    firstName: first_name,
    lastName: last_name,
    contact: contact,
    email: username,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string(),
    lastName: Yup.string(),
    contact: Yup.string()
      .length(10, "Contact must be exactly 10 digits")
      .matches(/^\d{10}$/, "Phone number is not valid"),
    email: Yup.string().email("Invalid email address"),

    currentPassword: Yup.string(),

    newPassword: Yup.string()
      .min(6, "Password should be at least 6 characters")
      .when("currentPassword", {
        is: (val) => Boolean(val),
        then: (schema) => schema.required("New password is required"),
        otherwise: (schema) => schema.notRequired(),
      }),

    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .when(
        ["currentPassword", "newPassword"],
        ([currentPassword, newPassword], schema) => {
          return currentPassword && newPassword
            ? schema.required("Please confirm your new password")
            : schema.notRequired();
        }
      ),
  });

  const handleSubmit = async (values) => {
    try {
      const {
        firstName,
        lastName,
        contact,
        email,
        currentPassword,
        confirmNewPassword,
        newPassword,
      } = values;
      setIsLoading(true);
      const res = await updateUserDetails({
        firstName,
        lastName,
        contact,
        email,
        currentPassword,
        id,
      });

      if (
        res.data.status === "success" ||
        res.data.success === "User registered successfully."
      ) {
        showSuccessToast("Account updated succcessfully");
        fetchUserDetails();
        setIsEditing(false);
      } else {
        showErrorToast("Account update failed.");
      }
    } catch (error) {
      showErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isEditing) fetchUserDetails();
  }, [isEditing]);

  return (
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center mx-auto border rounded-lg shadow-lg bg-white mt-10">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-lg font-semibold text-slate-600">
          Account Information
        </h3>
        <button
          onClick={toggleEdit}
          className="text-brand hover:text-brand-dark transition"
        >
          <FontAwesomeIcon icon={isEditing ? faTimes : faEdit} size="lg" />
        </button>
      </div>
      {isEditing ? (
        <EditableProfileForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
          isLoading={isLoading}
          setIsEditing={setIsEditing}
        />
      ) : (
        <div className="space-y-8 text-sm text-slate-700">
          <p>
            <strong>First Name:</strong> {first_name}
          </p>
          <p>
            <strong>Last Name:</strong> {last_name}
          </p>
          <p>
            <strong>Contact:</strong> {contact}
          </p>
          <p>
            <strong>Email:</strong> {username}
          </p>
          {host_type && (
            <p>
              <strong>Host Type:</strong> {getHeadingText(host_type)}
            </p>
          )}
          {selfie && (
            <p>
              <span className="font-semibold">Selfie:</span>{" "}
              <a
                href={selfie}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand"
              >
                Click here to view
              </a>
            </p>
          )}
          {driver_license && (
            <p>
              <span className="font-semibold">Driver’s License:</span>{" "}
              <a
                href={driver_license}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand"
              >
                Click here to view
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const Payment = () => <div>Manage payment information...</div>;

export const Nav = ({
  setActiveSection,
  activeSection,
  sections = ["home", "account", "payment"],
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
  const [user, setUser] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user_id = storedUser?.user_id;

  const fetchUserDetails = async () => {
    if (!user_id) return;

    try {
      const response = await fetchUser(`p_user_id=${user_id}`);
      const userDetails = response.data["User Details"]?.[0];

      if (userDetails) {
        setUser({
          first_name: userDetails.FIRST_NAME,
          last_name: userDetails.LAST_NAME,
          contact: userDetails.CONTACT,
          username: userDetails.USERNAME,
          role: userDetails.ROLE,
          balance: userDetails.BALANCE,
          host_type: userDetails.HOST_TYPE,
          driver_license: userDetails.DL_PHOTO_URL,
          selfie: userDetails.SELFIE_PHOTO_URL,
        });
      }
    } catch (err) {
      console.error("Failed to fetch user details:", err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [user_id]);

  if (!user) {
    return <Loader />;
  }

  const roleFull = user.role === "G" ? "Guest" : "Host";

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <Home />;
      case "account":
        return (
          <Account
            user={user}
            id={user_id}
            fetchUserDetails={fetchUserDetails}
          />
        );
      case "payment":
        return <Payment />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col">
      <ProfileHero
        imageUrl={hero}
        role={roleFull}
        first_name={user.first_name}
        last_name={user.last_name}
        host_type={user.host_type}
      />
      <Nav setActiveSection={setActiveSection} activeSection={activeSection} />
      <div className="relative overflow-hidden">{renderSection()}</div>
    </div>
  );
};

export const ProfileHero = ({
  imageUrl,
  first_name,
  last_name,
  role,
  host_type,
}) => {
  const username = first_name + " " + last_name;

  return (
    <>
      <img
        src={imageUrl}
        alt="profileHero"
        className="relative bg-cover bg-bottom lg:h-80 md:h-64 h-48 mt-8 md:mt-12 rounded-sm object-cover"
      />
      <div className="text-center -mt-12 z-0">
        <div
          className={`w-20 h-20 md:w-28 md:h-28 m-auto rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl border-4 border-gray-300 hover:scale-110 transition ${getColor(
            first_name
          )}`}
        >
          {getInitials(first_name, last_name)}
        </div>
        <h5 className="mt-4 md:text-xl text-xs font-semibold text-gray-600">
          {username}
        </h5>
        <span className="text-xs text-gray-400 lg:block">
          {getHeadingText(host_type)} {role}
        </span>
      </div>
    </>
  );
};
