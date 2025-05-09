import React, { useState, useEffect, useRef } from "react";
import hero from "../assets/g.jpg";
import "../styles.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import "../customDatePickerWidth.css";
import {
  formatDate,
  getColor,
  getHeadingText,
  getInitials,
} from "../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  fetchCarHostBookingCount,
  fetchCarHostBookingList,
  fetchCarHostBookingSum,
  fetchGuestCarBookingCount,
  fetchGuestPlaceBookingCount,
  fetchGuestTourBookingCount,
  fetchHostBookingCount,
  fetchHostBookingList,
  fetchHostBookingSum,
  fetchTourHostBookingCount,
  fetchTourHostBookingList,
  fetchTourHostBookingSum,
  fetchUser,
  updatePassword,
  updateUserDetails,
} from "../api";
import EditableProfileForm from "../forms/EditableProfileForm";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import Loader from "../components/Loader";
import Payment from "../components/Payment";
import DatePicker from "react-datepicker";
import { BookingCard } from "./Bookings";
import { updateAccountValidationSchema } from "../utils/schemas";

const Home = ({ user_id, host_type }) => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalBookingSum, setTotalBookingSum] = useState(0);
  const [guestPlaceBookings, setGuestPlaceBookings] = useState(0);
  const [guestCarBookings, setGuestCarBookings] = useState(0);
  const [guestTourBookings, setGuestTourBookings] = useState(0);
  const [bookingList, setBookingList] = useState([]);
  const [selectedPreset, setSelectedPreset] = useState("today");
  const datePickerRef = useRef(null);

  const presets = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "This Week", value: "thisWeek" },
    { label: "Last Week", value: "lastWeek" },
    { label: "Last 7 Days", value: "last7Days" },
    { label: "Last 14 Days", value: "last14Days" },
    { label: "This Month", value: "thisMonth" },
    { label: "Last Month", value: "lastMonth" },
    { label: "Last 30 Days", value: "last30Days" },
    { label: "Last Year", value: "lastYear" },
    { label: "Custom", value: "custom" },
  ];

  const handlePresetChange = (preset) => {
    setSelectedPreset(preset);

    const today = new Date();
    let newStartDate, newEndDate;

    switch (preset) {
      case "today":
        newStartDate = new Date(today);
        newEndDate = new Date(today);
        break;

      case "yesterday":
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - 1);
        newEndDate = new Date(newStartDate);
        break;

      case "thisWeek":
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)
        newEndDate = new Date(today);
        break;

      case "lastWeek":
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - today.getDay() - 7); // Start of last week
        newEndDate = new Date(newStartDate);
        newEndDate.setDate(newStartDate.getDate() + 6); // End of last week
        break;

      case "last7Days":
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - 7);
        newEndDate = new Date(today);
        break;

      case "last14Days":
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - 14);
        newEndDate = new Date(today);
        break;

      case "thisMonth":
        newStartDate = new Date(today.getFullYear(), today.getMonth(), 1); // First day of this month
        newEndDate = new Date(today);
        break;

      case "lastMonth":
        newStartDate = new Date(today.getFullYear(), today.getMonth() - 1, 1); // First day of last month
        newEndDate = new Date(today.getFullYear(), today.getMonth(), 0); // Last day of last month
        break;

      case "last30Days":
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - 30);
        newEndDate = new Date(today);
        break;

      case "lastYear":
        newStartDate = new Date(today.getFullYear() - 1, 0, 1); // Jan 1st of last year
        newEndDate = new Date(today.getFullYear() - 1, 11, 31); // Dec 31st of last year
        break;

      case "custom":
        setTimeout(() => {
          if (datePickerRef.current) {
            datePickerRef.current.setFocus(); // Open the date picker automatically
          }
        }, 100);
        return;

      default:
        return;
    }

    setDateRange([newStartDate, newEndDate]);
  };

  useEffect(() => {
    if (!user_id) return;

    const API_MAP = {
      L: {
        count: fetchHostBookingCount,
        sum: fetchHostBookingSum,
        list: fetchHostBookingList,
      },
      V: {
        count: fetchCarHostBookingCount,
        sum: fetchCarHostBookingSum,
        list: fetchCarHostBookingList,
      },
      T: {
        count: fetchTourHostBookingCount,
        sum: fetchTourHostBookingSum,
        list: fetchTourHostBookingList,
      },
      G: {
        count: async (queryString) => {
          const [placeRes, carRes, tourRes] = await Promise.all([
            fetchGuestPlaceBookingCount(queryString),
            fetchGuestCarBookingCount(queryString),
            fetchGuestTourBookingCount(queryString),
          ]);

          return {
            data: {
              placeCount: placeRes.data["Booking Count"] || 0,
              carCount: carRes.data["Booking Count"] || 0,
              tourCount: tourRes.data["Booking Count"] || 0,
              totalCount:
                (placeRes.data["Booking Count"] || 0) +
                (carRes.data["Booking Count"] || 0) +
                (tourRes.data["Booking Count"] || 0),
            },
          };
        },
      },
    };

    const fetchData = async () => {
      try {
        const typeKey = host_type || "G";
        const { count, sum, list } = API_MAP[typeKey] || {};

        if (!count) {
          console.error("Invalid host_type:", host_type);
          return;
        }

        const queryString = `p_user_id=${user_id}&p_date_start=${formatDate(
          startDate
        )}&p_date_end=${formatDate(endDate)}`;

        const guestCountRes = await API_MAP["G"].count(queryString);

        setGuestPlaceBookings(guestCountRes.data.placeCount);
        setGuestCarBookings(guestCountRes.data.carCount);
        setGuestTourBookings(guestCountRes.data.tourCount);

        if (host_type) {
          const [countRes, sumRes, listRes] = await Promise.all([
            count(queryString),
            sum(queryString),
            list(queryString),
          ]);

          setTotalBookings(countRes.data["Booking Count"]);
          setTotalBookingSum(sumRes.data.total_income);
          setBookingList(
            listRes.data.Bookings ||
              listRes.data.CarBookings ||
              listRes.data.TourBookings
          );
        }
      } catch (err) {
        console.error("Failed to fetch booking data:", err);
      }
    };

    fetchData();
  }, [startDate, endDate, host_type]);

  return (
    <div className="p-4 md:p-6 text-gray-700">
      <h2 className="text-xl md:text-3xl font-bold mb-6">Dashboard</h2>

      <div className="flex flex-col bg-white p-4 rounded-lg shadow mb-8">
        <label className="text-xs font-bold">Select Date Range:</label>
        <select
          value={selectedPreset}
          onChange={(e) => handlePresetChange(e.target.value)}
          className="border mt-2 bg-white p-2 rounded-md w-full text-sm"
        >
          {presets.map((preset) => (
            <option key={preset.value} value={preset.value}>
              {preset.label}
            </option>
          ))}
        </select>

        {selectedPreset === "custom" && (
          <div className="mt-4">
            <DatePicker
              selectsRange
              ref={datePickerRef}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              maxDate={new Date()}
              className="w-full border px-3 py-2 rounded-md text-center sm:text-left text-[16px] lg:text-xs"
              wrapperClassName="customDatePickerWidth"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {host_type && (
          <>
            <div className="col-span-2">
              <h3 className="text-lg font-semibold text-gray-800">
                Host Stats
              </h3>
              <hr className="my-2" />
            </div>

            <motion.div className="bg-white p-4 rounded-lg shadow">
              <h4 className="text-sm md:text-base font-semibold mb-1">
                Total Bookings
              </h4>
              <p className="text-3xl font-bold">
                <CountUp start={1} end={totalBookings} duration={3} />
              </p>
            </motion.div>

            <motion.div className="bg-white p-4 rounded-lg shadow">
              <h4 className="text-sm md:text-base font-semibold mb-1">
                Booking Sum
              </h4>
              <p className="text-3xl font-bold">${totalBookingSum}</p>
            </motion.div>
          </>
        )}

        <div className="col-span-2 mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Your Stats</h3>
          <hr className="my-2" />
        </div>

        <motion.div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-sm md:text-base font-semibold mb-1">
            Place Bookings
          </h4>
          <p className="text-3xl font-bold">{guestPlaceBookings}</p>
        </motion.div>

        <motion.div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-sm md:text-base font-semibold mb-1">
            Car Bookings
          </h4>
          <p className="text-3xl font-bold">{guestCarBookings}</p>
        </motion.div>

        <motion.div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-sm md:text-base font-semibold mb-1">
            Tour Bookings
          </h4>
          <p className="text-3xl font-bold">{guestTourBookings}</p>
        </motion.div>
      </div>

      {host_type && bookingList?.length > 0 && (
        <div className="bg-white p-4 mt-8 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Host Booking List
          </h3>
          <div className="space-y-4">
            {bookingList.map((listing, index) => (
              <BookingCard key={index} booking={listing} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Account = ({ user, fetchUserDetails, id }) => {
  const {
    first_name,
    last_name,
    contact,
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
  };

  const handlePasswordUpdate = async (values) => {
    try {
      const payload = {
        p_user_id: id,
        p_current_password: values.currentPassword,
        p_new_password: values.newPassword,
      };
      setIsLoading(true);

      const res = await updatePassword(payload);

      if (res.data?.message === "Password updated successfully.") {
        showSuccessToast("Password updated successfully");
        setIsEditing(false);
      } else {
        showErrorToast("Failed to update password");
      }
    } catch (err) {
      console.error("Password update error", err);
      showErrorToast("An error occurred while updating password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const { firstName, lastName, contact, email } = values;
      setIsLoading(true);
      const res = await updateUserDetails({
        firstName,
        lastName,
        contact,
        email,
        id,
      });

      if (
        res.data.status === "success" ||
        res.data.success === "User registered successfully."
      ) {
        showSuccessToast("Account updated successfully");
        fetchUserDetails();
        setIsEditing(false);
      } else {
        showErrorToast("Account update failed.");
      }
    } catch (error) {
      showErrorToast(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isEditing) fetchUserDetails();
  }, [isEditing]);

  return (
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center mx-auto border rounded-lg shadow-lg bg-white mt-10">
      <div className="relative mb-10">
        <button
          onClick={toggleEdit}
          className="absolute top-0 right-0 text-brand hover:text-brand-dark transition"
        >
          <FontAwesomeIcon icon={isEditing ? faTimes : faEdit} size="lg" />
        </button>
      </div>

      {isEditing ? (
        <EditableProfileForm
          initialValues={initialValues}
          validationSchema={updateAccountValidationSchema}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
          isLoading={isLoading}
          setIsEditing={setIsEditing}
          handlePasswordUpdate={handlePasswordUpdate}
        />
      ) : (
        <div className="space-y-8 text-xs md:text-sm text-slate-700">
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

export const Nav = ({ setActiveSection, activeSection, sections }) => {
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

  const { user_id, host_type } = JSON.parse(localStorage.getItem("user"));

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
          bank_name: userDetails.BANK_NAME,
          bank_type: userDetails.BANK_TYPE,
          bank_account_number: userDetails.BANK_ACCOUNT_NUM,
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
  const sections = host_type
    ? ["home", "account", "payment"]
    : ["home", "account"];

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <Home user_id={user_id} host_type={host_type} />;
      case "account":
        return (
          <Account
            user={user}
            id={user_id}
            fetchUserDetails={fetchUserDetails}
          />
        );
      case "payment":
        return (
          <Payment
            p_user_id={user_id}
            fetchUserDetails={fetchUserDetails}
            user={user}
          />
        );
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
      <Nav
        setActiveSection={setActiveSection}
        activeSection={activeSection}
        sections={sections}
      />
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
          {host_type ? getHeadingText(host_type) : ""} {role}
        </span>
      </div>
    </>
  );
};
