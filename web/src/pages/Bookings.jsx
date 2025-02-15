import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import {
  fetchPastStaysBookings,
  fetchPastCarBookings,
  fetchPastTourBookings,
} from "../api";
import { useNavigate } from "react-router-dom";
import { formatWithCommas } from "../utils/helpers";
import { Nav } from "./Dashboard";

const Bookings = () => {
  const { user_id } = JSON.parse(localStorage.getItem("user"));
  const [activeTab, setActiveTab] = useState("Past Stays");
  const [bookingsData, setBookingsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
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
      console.log(response.data);
      if (response?.status === 200) {
        setBookingsData(
          response.data.Bookings ||
            response.data.CarBookings ||
            response.data.TourBookings
        );
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
        {!loading && !error && bookingsData.length === 0 && (
          <p>No bookings found for {activeTab}.</p>
        )}
        {!loading &&
          !error &&
          bookingsData.map((booking, index) => (
            <BookingCard key={index} booking={booking} activeTab={activeTab} />
          ))}
      </div>
    </div>
  );
};

export default Bookings;

const BookingCard = ({ booking, activeTab }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg mb-7 cursor-pointer hover:shadow-lg transition-shadow">
      <img
        src={
          booking["List Image"] ||
          booking["Image1URL"] ||
          "https://via.placeholder.com/150"
        }
        alt={`${booking.FirstName}'s Booking`}
        className="w-full h-52 md:w-72 md:h-72 object-cover rounded-t-lg md:rounded-l-lg"
      />

      <div className="flex flex-col md:m-5 mt-5 p-4 w-full">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg cursor-pointer">
              {`${
                booking["List Name"] ||
                booking["ListName"] ||
                booking["List Image 1"]
              }`}
            </h3>
            <p className="text-sm text-gray-500">
              Booking Date:{" "}
              <span className="font-medium">{booking.BookingDate}</span>
            </p>
            <p className="text-sm text-gray-500">
              Check-in: <span className="font-medium">{booking.Checkin}</span>
            </p>
            <p className="text-sm text-gray-500">
              Check-out: <span className="font-medium">{booking.Checkout}</span>
            </p>
            <p className="text-sm text-gray-500">
              Total Guests:{" "}
              <span className="font-medium">{booking.NumGuests}</span>
            </p>
          </div>

          {/* Booking Amount */}
          <div className="text-right">
            <p className="text-brand font-bold text-lg">
              GHS {formatWithCommas(booking.Total)}
            </p>
            <p className="text-xs text-gray-500">Total Amount</p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-5">
          <span
            className={`text-sm font-medium px-3 py-1 rounded-lg ${
              booking.Status === "success"
                ? "bg-green-100 text-green-600"
                : booking.Status === "pending"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {booking.Status}
          </span>
          <button
            className="bg-brand text-white px-6 py-2 text-sm font-medium rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              navigate(
                `/booking-details/${booking.ID}?type=${activeTab.toLowerCase()}`
              );
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
