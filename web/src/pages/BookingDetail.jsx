import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  fetchBooking,
  cancelBooking,
  verifyPayment,
  fetchTourBooking,
  fetchCarBooking,
} from "../api";
import Loader from "../components/Loader";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { PaystackButton } from "react-paystack";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const type = queryParams.get("type");
  const paystackPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        let response;
        if (type === "past stays") {
          response = await fetchBooking(id);
        } else if (type === "rentals") {
          response = await fetchCarBooking(id);
        } else if (type === "tours") {
          response = await fetchTourBooking(id);
        }

        if (response?.status === 200) {
          setBooking(
            response.data.Bookings?.[0] ||
              response.data.CarBookings?.[0] ||
              response.data.TourBookings?.[0]
          );
        } else {
          throw new Error("Failed to fetch booking details");
        }
      } catch (err) {
        setError(err.message || "Failed to load booking details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id, type]);

  const handleCancelBooking = async () => {
    if (!booking || booking.Status !== "pending") return;

    setIsCancelling(true);
    try {
      const params = {
        booking_id: booking.ID,
        status: "cancelled",
      };
      const response = await cancelBooking(params);
      if (response?.data?.message === "Booking successfully updated.") {
        setBooking((prev) => ({ ...prev, Status: "cancelled" }));
        showSuccessToast("Booking successfully updated");
      } else {
        showErrorToast("Failed to cancel booking");
        throw new Error("Failed to cancel booking");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsCancelling(false);
    }
  };

  const onSuccess = async (response) => {
    try {
      const res = await verifyPayment(response.reference);
      if (res.data.status === "success") {
        showSuccessToast("Payment verified successfully!");
        navigate("/thank-you");
      } else {
        showErrorToast("Payment verification failed.");
      }
    } catch (error) {
      showErrorToast("Error verifying payment.");
      console.error("Error verifying payment:", error);
    }
  };

  const onClose = () => {
    showErrorToast("Payment process was canceled.");
  };

  const paystackProps = {
    email: booking?.Email,
    amount: booking?.Total * 100,
    currency: "GHS",
    publicKey: paystackPublicKey,
    text: "Pay Now",
    onSuccess,
    onClose,
    reference: booking?.ReferenceID,
    className:
      "bg-brand text-xs font-bold text-white w-full px-4 py-2 rounded hover:bg-brand-4xl hover:scale-105 transition",
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="text-center mt-20 text-red-500 font-medium">
        Error: {error}
      </div>
    );
  if (!booking) {
    return (
      <div className="text-center mt-20 text-gray-500 font-medium">
        Booking not found.
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-lg rounded-lg space-y-6 mt-20 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-brand border-b-2 border-blue-200 pb-2">
        Booking Details
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {booking.FirstName && booking.LastName && (
          <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <strong className="text-brand">Guest Name:</strong>{" "}
            {`${booking.FirstName} ${booking.LastName}`}
          </p>
        )}
        {booking["List Name"] && (
          <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <strong className="text-brand">List Name:</strong>{" "}
            {`${booking["List Name"]}`}
          </p>
        )}
        {booking.Contact && (
          <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <strong className="text-brand">Contact:</strong> {booking.Contact}
          </p>
        )}
        {booking.Email && (
          <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <strong className="text-brand">Email:</strong> {booking.Email}
          </p>
        )}
        {booking.Checkin && (
          <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <strong className="text-brand">Check-in:</strong> {booking.Checkin}
          </p>
        )}
        {booking.Checkout && (
          <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <strong className="text-brand">Check-out:</strong>{" "}
            {booking.Checkout}
          </p>
        )}
        {booking.NumGuests && (
          <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <strong className="text-brand">Guests:</strong> {booking.NumGuests}
          </p>
        )}
        {booking.ListingPrice && (
          <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <strong className="text-brand">Price:</strong> ${" "}
            {booking.ListingPrice}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {booking.RidePrice && (
          <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <strong className="text-brand">Ride Price:</strong> ${" "}
            {booking.RidePrice}
          </p>
        )}
        {booking["List Name"] && (
          <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <strong className="text-brand">Car Type:</strong> {booking.CarID}
          </p>
        )}
        {booking.TourPrice && (
          <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <strong className="text-brand">Tour Type:</strong>
            {booking.TourType}
          </p>
        )}
        {booking.TourPrice && (
          <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <strong className="text-brand">Tour Price:</strong> ${" "}
            {booking.TourPrice}
          </p>
        )}
        {booking.ChauffuerRate && (
          <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <strong className="text-brand">Chauffeur Rate:</strong> ${" "}
            {booking.ChauffuerRate}
          </p>
        )}
        {booking.Fee && (
          <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <strong className="text-brand">Service Fee:</strong> $ {booking.Fee}
          </p>
        )}
        {booking.SubTotal && (
          <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <strong className="text-brand">Sub Total:</strong> ${" "}
            {booking.SubTotal}
          </p>
        )}
        {booking.Total && (
          <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <strong className="text-brand">Total:</strong> GHS {booking.Total}
          </p>
        )}
        {booking.Status && (
          <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <strong className="text-brand">Status:</strong>{" "}
            <span
              className={`font-medium px-3 py-1 rounded-lg ${
                booking.Status === "success"
                  ? "bg-green-100 text-green-600"
                  : booking.Status === "pending"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {booking.Status}
            </span>
          </p>
        )}
        {booking.SpecialNote && (
          <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 col-span-full">
            <strong className="text-brand">Special Note:</strong>{" "}
            {booking.SpecialNote}
          </p>
        )}
      </div>

      {booking.Status === "pending" && (
        <>
          <PaystackButton {...paystackProps} />
          <button
            onClick={handleCancelBooking}
            className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition"
            disabled={isCancelling}
          >
            {isCancelling ? "Cancelling..." : "Cancel Booking"}
          </button>
        </>
      )}
    </div>
  );
};

export default BookingDetails;
