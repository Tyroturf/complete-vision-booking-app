import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  fetchBooking,
  verifyPayment,
  fetchTourBooking,
  fetchCarBooking,
  cancelPlaceBooking,
  cancelCarBooking,
  cancelTourBooking,
} from "../api";
import Loader from "../components/Loader";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { PaystackButton } from "react-paystack";
import Back from "../components/Back";

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

      let response;
      if (type === "past stays") {
        response = await cancelPlaceBooking(params);
      } else if (type === "rentals") {
        response = await cancelCarBooking(params);
      } else if (type === "tours") {
        response = await cancelTourBooking(params);
      }
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
      const params = {
        booking_id: booking,
        reference_id: response.reference,
      };

      const res = await verifyPayment(params);
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
    reference: booking?.ReferenceID.toString(),
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
    <div className="mt-20 max-w-4xl mx-auto">
      <Back path={`/bookings?type=${type}`} page={"Bookings"} />
      <div className="p-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-lg rounded-lg space-y-6 mt-5">
        <h1 className="text-lg md:text-2xl font-bold text-brand border-b-2 border-blue-200 pb-2 text-center">
          Booking Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {booking.FirstName && booking.LastName && (
            <DetailItem
              label="Guest Name"
              value={`${booking.FirstName} ${booking.LastName}`}
            />
          )}
          {booking["List Name"] && (
            <DetailItem label="List Name" value={booking["List Name"]} />
          )}
          {booking.Contact && (
            <DetailItem label="Contact" value={booking.Contact} />
          )}
          {booking.Email && <DetailItem label="Email" value={booking.Email} />}
          {booking.Checkin && (
            <DetailItem label="Check-in" value={booking.Checkin} />
          )}
          {booking.Checkout && (
            <DetailItem label="Check-out" value={booking.Checkout} />
          )}
          {booking.NumGuests && (
            <DetailItem label="Guests" value={booking.NumGuests} />
          )}
          {booking.ListingPrice && (
            <DetailItem label="Price" value={`$${booking.ListingPrice}`} />
          )}
        </div>

        {/* Additional Pricing Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {booking.RidePrice && (
            <DetailItem label="Ride Price" value={`$${booking.RidePrice}`} />
          )}
          {booking.CarID && (
            <DetailItem label="Car Type" value={booking.CarID} />
          )}
          {booking.TourType && (
            <DetailItem label="Tour Type" value={booking.TourType} />
          )}
          {booking.TourPrice && (
            <DetailItem label="Tour Price" value={`$${booking.TourPrice}`} />
          )}
          {booking.ChauffuerRate && (
            <DetailItem
              label="Chauffeur Rate"
              value={`$${booking.ChauffuerRate}`}
            />
          )}
          {booking.Fee && (
            <DetailItem label="Service Fee" value={`$${booking.Fee}`} />
          )}
          {booking.SubTotal && (
            <DetailItem label="Sub Total" value={`$${booking.SubTotal}`} />
          )}
          {booking.Total && (
            <DetailItem label="Total" value={`GHS ${booking.Total}`} />
          )}
        </div>

        {booking.Status && (
          <div className="flex justify-center">
            <span
              className={`px-4 py-2 text-md md:text-lg font-semibold rounded-lg ${
                booking.Status === "success"
                  ? "bg-green-100 text-green-600"
                  : booking.Status === "pending"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {booking.Status}
            </span>
          </div>
        )}

        {booking.SpecialNote && (
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <strong className="text-brand">Special Note:</strong>{" "}
            {booking.SpecialNote}
          </div>
        )}

        {booking.Status === "pending" && (
          <div className="flex flex-col space-y-4">
            <PaystackButton {...paystackProps} />
            <button
              onClick={handleCancelBooking}
              className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition duration-300"
              disabled={isCancelling}
            >
              <span className="text-xs py-2">
                {isCancelling ? "Cancelling..." : "Cancel Booking"}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  function DetailItem({ label, value }) {
    return (
      <p className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <strong className="text-brand text-sm md:text-base">{label}:</strong>{" "}
        <span className="text-xs md:text-sm">{value}</span>
      </p>
    );
  }
};

export default BookingDetails;
