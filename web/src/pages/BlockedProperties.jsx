import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import {
  deleteBlockedBooking,
  fetchBlockedBookings,
  updateBlockDates,
} from "../api";
import { formatDate, formatWithCommas } from "../utils/helpers";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import BlockedDatesModal from "../components/BlockDatesModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import Back from "../components/Back";

const BlockedProperties = () => {
  const { user_id } = JSON.parse(localStorage.getItem("user"));
  const [bookingsData, setBookingsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      response = await fetchBlockedBookings(user_id);

      if (response?.status === 200) {
        setBookingsData(response.data.Bookings);
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
    <div className="mt-10 md:mt-20">
      <Back path={"/manage"} page={"Manage Listings"} />
      <div className="p-4">
        {loading && <Loader />}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && bookingsData.length === 0 && (
          <p className="text-xs">No blocked properties</p>
        )}
        {!loading &&
          !error &&
          bookingsData.map((booking, index) => (
            <BookingCard
              key={index}
              booking={booking}
              fetchBookings={fetchBookings}
              user_id={user_id}
            />
          ))}
      </div>
    </div>
  );
};

export default BlockedProperties;

const BookingCard = ({ booking, fetchBookings, user_id }) => {
  const [isUnblocking, setIsUnblocking] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState([null, null]);
  const [loading, setLoading] = useState(false);

  const handleBlock = async () => {
    if (!booking || booking.Status !== "blocked") return;
    setIsUnblocking(true);
    try {
      const response = await deleteBlockedBooking(booking.ID);
      fetchBookings();
      if (response?.data?.message === "Booking successfully deleted.") {
        showSuccessToast("Property successfully unblocked");
      } else {
        showErrorToast("Failed to unblock property");
        throw new Error("Failed to unblock property");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUnblocking(false);
    }
  };

  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
  };

  const handleBlockDates = async () => {
    const [checkin, checkout] = selectedDates;
    if (!checkin || !checkout)
      return alert("Please select a valid date range.");
    setLoading(true);
    try {
      const params = {
        booking_id: booking.ID,
        checkin: formatDate(checkin),
        checkout: formatDate(checkout),
      };
      const response = await updateBlockDates(params);

      if (response.status === 200) {
        showSuccessToast("Dates blocked successfully!");
        fetchBookings();
      } else {
        showErrorToast("Failed to block dates.");
      }
    } catch (error) {
      console.error("Error blocking dates:", error);
      showErrorToast("Failed to block dates.");
    } finally {
      setLoading(false);
      setIsDatePickerOpen(false);
    }
  };
  return (
    <div className="mt-10 md:mt-20 p-4">
      <Back path={"/manage"} page={"Manage Listings"} />
      <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg mb-7 cursor-pointer hover:shadow-lg transition-shadow">
        <img
          src={
            booking["List Image"] ||
            booking["Image1URL"] ||
            booking["List Image 1"] ||
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
                Blocked Date:{" "}
                <span className="font-medium">{booking.BookingDate}</span>
              </p>
              <p className="text-sm text-gray-500">
                Check-in: <span className="font-medium">{booking.Checkin}</span>
              </p>
              <p className="text-sm text-gray-500">
                Check-out:{" "}
                <span className="font-medium">{booking.Checkout}</span>
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
                  : "bg-red-100 text-red-600"
              }`}
            >
              {booking.Status}
            </span>
            <div className="flex gap-4">
              <button
                className="bg-brand text-white px-6 py-2 text-sm font-medium rounded-lg"
                onClick={handleBlock}
              >
                {isUnblocking ? "Unblocking..." : "Unblock Property"}
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2"
                onClick={() => setIsDatePickerOpen(true)}
              >
                <FontAwesomeIcon icon={faEdit} /> Edit
              </button>
            </div>
          </div>
        </div>
        {isDatePickerOpen && (
          <BlockedDatesModal
            isOpen={isDatePickerOpen}
            onClose={toggleDatePicker}
            selectedDates={selectedDates}
            handleDateChange={handleDateChange}
            handleBlockDates={handleBlockDates}
            loading={loading}
            listing={booking}
          />
        )}
      </div>
    </div>
  );
};
