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
import { isToday } from "../utils/helpers";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const { search } = useLocation();
  const { host_type } = JSON.parse(localStorage.getItem("user"));
  const queryParams = new URLSearchParams(search);
  const type = queryParams.get("type");
  const paystackPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const backPath = type ? `/bookings?type=${type}` : `/listing-bookings`;

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        let response;
        if (type) {
          if (type === "past stays") {
            response = await fetchBooking(id);
          } else if (type === "rentals") {
            response = await fetchCarBooking(id);
          } else if (type === "tours") {
            response = await fetchTourBooking(id);
          }
        } else {
          if (host_type === "L") {
            response = await fetchBooking(id);
          } else if (host_type === "V") {
            response = await fetchCarBooking(id);
          } else if (host_type === "T") {
            response = await fetchTourBooking(id);
          }
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
    reference: booking?.ReferenceID?.toString(),
    className:
      "bg-brand text-xs font-bold text-white w-full px-4 py-2 rounded-lg hover:bg-brand-4xl hover:scale-105 transition",
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
    <div className="mt-20 mx-auto">
      <Back path={backPath} page={"Bookings"} />
      <div className="p-6 shadow-lg rounded-lg space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
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
          {booking.BookingDate && (
            <DetailItem label="Booking Date" value={booking.BookingDate} />
          )}
          {booking.ReferenceID && (
            <DetailItem label="Reference ID" value={booking.ReferenceID} />
          )}
          {booking.HostFirstName && booking.HostLastName && (
            <DetailItem
              label="Host Name"
              value={`${booking.HostFirstName} ${booking.HostLastName}`}
            />
          )}
          {booking.HostContact && (
            <DetailItem label="Host Contact" value={booking.HostContact} />
          )}
          {booking.Fee && (
            <DetailItem label="Service Fee" value={`USD ${booking.Fee}`} />
          )}
          {booking.SubTotal && (
            <DetailItem label="Sub Total" value={`USD ${booking.SubTotal}`} />
          )}
          {booking.Total && (
            <DetailItem label="Total" value={`GHS ${booking.Total}`} />
          )}
        </div>

        <div className="flex justify-center">
          <span
            className={`px-4 py-2 text-sm md:text-md font-semibold rounded-lg ${
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

        {isToday(booking.BookingDate) &&
          type &&
          booking.Status === "pending" && (
            <div className="flex flex-col md:flex-row gap-4">
              <PaystackButton {...paystackProps} />
              <button
                onClick={handleCancelBooking}
                className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 hover:scale-105 transition duration-300"
                disabled={isCancelling}
              >
                <span className="text-xs py-2 font-bold">
                  {isCancelling ? "Cancelling..." : "Cancel Booking"}
                </span>
              </button>
            </div>
          )}
      </div>
    </div>
  );

  function DetailItem({ label, value }) {
    if (!value) return null;
    return (
      <p className="p-2 rounded-lg shadow-sm border border-gray-200">
        <strong className="text-brand text-xs md:text-sm font-bold">
          {label}:
        </strong>{" "}
        <span className="text-xs md:text-sm">{value}</span>
      </p>
    );
  }
};

export default BookingDetails;
