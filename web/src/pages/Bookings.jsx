import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import {
  fetchPastStaysBookings,
  fetchPastCarBookings,
  fetchPastTourBookings,
} from "../api";
import { useNavigate, useLocation } from "react-router-dom";
import { formatWithCommas } from "../utils/helpers";
import { Nav } from "./Dashboard";

const Bookings = ({ page }) => {
  const { user_id } = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const typeParam = queryParams.get("type");

  const typeToTabMap = page
    ? {
        place: "Past Stays",
        car: "Rentals",
        tour: "Tours",
      }
    : {
        "past stays": "Past Stays",
        rentals: "Rentals",
        tours: "Tours",
      };

  const [activeTab, setActiveTab] = useState(
    typeToTabMap[typeParam] || "Past Stays"
  );

  // Cache booking data for each tab
  const [bookingsCache, setBookingsCache] = useState({
    "Past Stays": null,
    Rentals: null,
    Tours: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bookingsCache[activeTab]) {
      fetchBookings();
    }
  }, [activeTab]);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (activeTab === "Past Stays") {
        response = await fetchPastStaysBookings(user_id);
      } else if (activeTab === "Rentals") {
        response = await fetchPastCarBookings(user_id);
      } else if (activeTab === "Tours") {
        response = await fetchPastTourBookings(user_id);
      }
      if (response?.status === 200) {
        setBookingsCache((prev) => ({
          ...prev,
          [activeTab]:
            response.data.Bookings ||
            response.data.CarBookings ||
            response.data.TourBookings,
        }));
      } else {
        setError("Failed to load bookings. Please try again.");
      }
    } catch (err) {
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20">
      <Nav
        setActiveSection={setActiveTab}
        activeSection={activeTab}
        sections={["Past Stays", "Rentals", "Tours"]}
      />
      <div className="p-4">
        {loading && <Loader />}
        {error && <p className="text-red-500">{error}</p>}
        {!loading &&
          !error &&
          (!bookingsCache[activeTab] ||
            bookingsCache[activeTab].length === 0) && (
            <p className="text-gray-800 text-xs md:text-sm p-5">
              No past bookings
            </p>
          )}
        {!loading &&
          !error &&
          bookingsCache[activeTab] &&
          bookingsCache[activeTab].map((booking, index) => (
            <BookingCard key={index} booking={booking} activeTab={activeTab} />
          ))}
      </div>
    </div>
  );
};

export default Bookings;

export const BookingCard = ({ booking, activeTab }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg mb-7 cursor-pointer hover:shadow-lg transition-shadow">
      <img
        src={
          booking["List Image"] ||
          booking["ListImage"] ||
          booking["Image1URL"] ||
          booking["List Image 1"] ||
          "https://via.placeholder.com/150"
        }
        alt={`${booking.FirstName}'s Booking`}
        className="w-full h-52 md:w-72 md:h-72 object-cover rounded-t-lg md:rounded-l-lg"
      />

      <div className="flex flex-col md:m-5 mt-5 p-4 w-full">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg cursor-pointer">
              {`${
                booking["List Name"] ||
                booking["ListName"] ||
                booking["List Image 1"]
              }`}
            </h3>
            {booking.FirstName && (
              <p className="text-xs md:text-sm text-gray-500">
                User:{" "}
                <span className="font-medium">
                  {booking.FirstName} {booking.LastName}
                </span>
              </p>
            )}
            <p className="text-xs md:text-sm text-gray-500">
              Booking Date:{" "}
              <span className="font-medium">{booking.BookingDate}</span>
            </p>
            <p className="text-xs md:text-sm text-gray-500">
              Check-in: <span className="font-medium">{booking.Checkin}</span>
            </p>
            <p className="text-xs md:text-sm text-gray-500">
              Check-out: <span className="font-medium">{booking.Checkout}</span>
            </p>
            <p className="text-xs md:text-sm text-gray-500">
              Total Guests:{" "}
              <span className="font-medium">{booking.NumGuests}</span>
            </p>
          </div>

          {/* Booking Amount */}
          {booking.Total && (
            <div className="text-right">
              <p className="text-brand font-bold text-lg">
                GHS {formatWithCommas(booking.Total)}
              </p>
              <p className="text-xs text-gray-500">Total Amount</p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-5">
          <span
            className={`text-sm font-medium px-3 py-1 rounded-lg ${
              booking.Status === "success"
                ? "bg-green-100 text-green-600"
                : booking.Status === "pending"
                ? "bg-yellow-100 text-yellow-600"
                : booking.Status === "cancelled"
                ? "bg-red-100 text-red-600"
                : booking.Status === "reversed"
                ? "bg-purple-100 text-purple-600"
                : ""
            }`}
          >
            {booking.Status}
          </span>
          <button
            className="bg-brand text-white px-6 py-2 text-xs font-medium rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              const path = activeTab
                ? `/booking-details/${
                    booking.ID
                  }?type=${activeTab.toLowerCase()}`
                : `/booking-details/${booking.ID}`;
              navigate(path);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
