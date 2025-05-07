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
  refundBooking,
  verifyRefundStatus,
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
  const [refundAmount, setRefundAmount] = useState(0);
  const [refundStatus, setRefundStatus] = useState(null);

  const { search } = useLocation();
  const { host_type } = JSON.parse(localStorage.getItem("user"));
  const queryParams = new URLSearchParams(search);
  const type = queryParams.get("type");
  const paystackPublicKey =
    import.meta.env.NODE_ENV === "production"
      ? import.meta.env.VITE_PAYSTACK_LIVE_KEY
      : import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const backPath = type ? `/bookings?type=${type}` : `/listing-bookings`;
  console.log("Paystack Public Key:", paystackPublicKey);

  const fetchBookingDetails = async () => {
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
        const bookingData =
          response.data.Bookings?.[0] ||
          response.data.CarBookings?.[0] ||
          response.data.TourBookings?.[0];

        setBooking(bookingData);

        if (bookingData?.Status === "reversed") {
          const refundStatusRes = await verifyRefundStatus(
            bookingData.ReferenceID
          );
          const amount = refundStatusRes?.data?.amount;
          if (amount) {
            setRefundAmount(amount);
          }
        }
      } else {
        throw new Error("Failed to fetch booking details");
      }
    } catch (err) {
      setError(err.message || "Failed to load booking details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBookingDetails();
    }
  }, [id, type]);

  useEffect(() => {
    const checkRefund = async () => {
      if (booking?.ReferenceID && booking?.Status === "reversed") {
        const res = await verifyRefundStatus(booking.ReferenceID);
        const amount = res?.data?.amount;
        const status = res?.data?.status;
        if (amount) {
          setRefundAmount(amount);
        }
        if (status) {
          setRefundStatus(status);
        }
      }
    };
    checkRefund();
  }, [booking]);

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

  const handleRefundBooking = async () => {
    if (!booking || booking.Status !== "success") return;
    const { ReferenceID } = booking;

    setIsCancelling(true);
    try {
      const response = await refundBooking(ReferenceID);
      const status = response?.data;

      if (status !== "processed: ") {
        showErrorToast("Failed to initiate refund.");
        setIsCancelling(false);
        return;
      }

      showSuccessToast("Refund initiated. Tracking refund...");

      let retryCount = 0;
      const maxRetries = 10;

      const trackInterval = setInterval(async () => {
        try {
          const trackRes = await verifyRefundStatus(ReferenceID);
          const refundStatus = trackRes?.data?.status;
          const amount = trackRes?.data?.amount;

          if (amount) {
            setRefundAmount(amount);
          }

          if (refundStatus === "reversed") {
            clearInterval(trackInterval);
            showSuccessToast("Refund completed successfully!");
            await fetchBookingDetails();
          } else if (refundStatus === "failed") {
            clearInterval(trackInterval);
            showErrorToast("Refund failed. Please contact support.");
          } else {
            console.log("Tracking refund... status:", refundStatus);
            setRefundStatus(refundStatus);
            retryCount++;
            if (retryCount >= maxRetries) {
              clearInterval(trackInterval);
              showErrorToast(
                "Refund is taking longer than expected. Please check again later."
              );
            }
          }
        } catch (err) {
          clearInterval(trackInterval);
          showErrorToast("Error tracking refund. Please try again.");
        } finally {
          setIsCancelling(false);
        }
      }, 3000);
    } catch (err) {
      console.error("Refund Error:", err);
      showErrorToast(
        err?.response?.data?.message || "Error processing refund."
      );
      setIsCancelling(false);
    }
  };

  const onSuccess = async (response) => {
    try {
      const params = {
        booking_id: booking.ID,
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
          {booking.ChauffuerRate && (
            <DetailItem
              label="Chauffeur Rate"
              value={`USD ${booking.ChauffuerRate}`}
            />
          )}
          {booking.PickupLocation && (
            <DetailItem
              label="Pickup Location"
              value={booking.PickupLocation}
            />
          )}
          {booking.DropoffLocation && (
            <DetailItem
              label="Dropoff Location"
              value={booking.DropoffLocation}
            />
          )}
          {booking["Car Number"] && (
            <DetailItem label="Car Number" value={booking["Car Number"]} />
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
                : booking.Status === "cancelled"
                ? "bg-red-100 text-red-600"
                : booking.Status === "reversed"
                ? "bg-purple-100 text-purple-600"
                : booking.Status === "blocked"
                ? "bg-gray-200 text-gray-700"
                : ""
            }`}
          >
            {booking.Status}
          </span>
        </div>

        {booking.Status === "reversed" && (
          <div className="text-xs text-center mt-4 p-3 bg-green-100 text-green-800 rounded-lg">
            Your refund of {refundAmount} has been successfully reversed. It
            should reflect in your account shortly.
          </div>
        )}

        {refundStatus && refundStatus !== "reversed" && (
          <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
            Your refund is currently <strong>{refundStatus}</strong>. Please
            check back shortly.
          </div>
        )}

        {isToday(booking.BookingDate) &&
          booking.Total &&
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

        {isToday(booking.BookingDate) &&
          booking.Total &&
          type &&
          booking.Status === "success" &&
          refundStatus !== "reversed" && (
            <button
              onClick={handleRefundBooking}
              className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 hover:scale-105 transition duration-300"
              disabled={isCancelling || refundStatus === "processing"}
            >
              <span className="text-xs py-2 font-bold">
                {isCancelling ? "Cancelling..." : "Cancel & Refund"}
              </span>
            </button>
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
