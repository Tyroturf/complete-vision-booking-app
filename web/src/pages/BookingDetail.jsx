import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBooking } from "../api";
import Loader from "../components/Loader";

const BookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBookingDetails = async () => {
      setLoading(true);
      try {
        const response = await fetchBooking(id);
        if (response.status === 200) {
          setBooking(response.data.Bookings[0]);
        } else {
          throw new Error("Failed to fetch booking details");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getBookingDetails();
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500 font-medium">
        Error: {error}
      </div>
    );
  }

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
        <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <strong className="text-brand">List Name:</strong>{" "}
          {`${booking["List Name"]}`}
        </p>
        <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <strong className="text-brand">Contact:</strong> {booking.Contact}
        </p>
        <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <strong className="text-brand">Email:</strong> {booking.Email}
        </p>
        <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <strong className="text-brand">Check-in:</strong> {booking.Checkin}
        </p>
        <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <strong className="text-brand">Check-out:</strong> {booking.Checkout}
        </p>
        <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <strong className="text-brand">Guests:</strong> {booking.NumGuests}
        </p>
        <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <strong className="text-brand">Listing:</strong>{" "}
          {booking["List Name"]}
        </p>
        <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <strong className="text-brand">Price:</strong> GHS{" "}
          {booking.ListingPrice}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <strong className="text-brand">Ride Price:</strong> GHS{" "}
          {booking.RidePrice}
        </p>
        <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <strong className="text-brand">Tour Price:</strong> GHS{" "}
          {booking.TourPrice}
        </p>
        <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <strong className="text-brand">Chauffeur Rate:</strong> GHS{" "}
          {booking.ChauffuerRate}
        </p>
        <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <strong className="text-brand">Service Fee:</strong> GHS {booking.Fee}
        </p>
        <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <strong className="text-brand">Total:</strong> GHS {booking.Total}
        </p>
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
        <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 col-span-full">
          <strong className="text-brand">Special Note:</strong>{" "}
          {booking.SpecialNote}
        </p>
      </div>
    </div>
  );
};

export default BookingDetails;
