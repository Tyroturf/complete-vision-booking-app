import { PaystackButton } from "react-paystack";
import {
  saveBooking,
  saveCarBooking,
  saveTourBooking,
  verifyPayment,
} from "../api";
import { useState } from "react";
import { formatDate } from "../utils/helpers";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { useNavigate } from "react-router-dom";

const Confirmation = ({ bookingDetails, page }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState(null);
  const [paymentReference, setPaymentReference] = useState(null);
  const paystackPublicKey =
    import.meta.env.NODE_ENV === "production"
      ? import.meta.env.VITE_PAYSTACK_LIVE_KEY
      : import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const { user_id } = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  if (!bookingDetails) {
    return <div>Error: No booking details available.</div>;
  }

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    guests,
    checkIn,
    checkOut,
    interestedInCar,
    selectedCar,
    chauffeurRate,
    interestedInTour,
    selectedTour,
    listing,
    pickupLocation,
    dropoffLocation,
    listingPrice,
    carPrice,
    tourPrice,
    subTotal,
    grandTotalUSD,
    nights,
    drivingOption,
    duration,
    serviceFee,
    totalPriceGHS,
    specialNote,
    status,
    specialRequests,
  } = bookingDetails;

  const fullName = `${firstName} ${lastName}`;
  const bookingDate = new Date();
  const updatedBookingDetails = {
    ...bookingDetails,
    bookingDate: formatDate(bookingDate),
    user_id,
  };

  const initializePayment = async () => {
    setIsLoading(true);
    try {
      let response;

      if (page === "place") {
        response = await saveBooking(updatedBookingDetails);
      } else if (page === "car") {
        response = await saveCarBooking(updatedBookingDetails);
      } else if (page === "tour") {
        response = await saveTourBooking(updatedBookingDetails);
      } else {
        showErrorToast("Invalid booking type");
        return;
      }

      if (response.data.status === "Booking Confirmed") {
        const { reference_id, booking_id } = response.data;
        setPaymentReference(reference_id.toString());
        setBooking(booking_id.toString());
      } else {
        showErrorToast("Error confirming booking");
      }
    } catch (error) {
      showErrorToast("Error confirming booking");
      console.error("Error initializing payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSuccess = async (response) => {
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  const onClose = () => {
    showErrorToast("Payment process was canceled.");
  };

  const paystackProps = {
    email,
    amount: totalPriceGHS * 100,
    currency: "GHS",
    publicKey: paystackPublicKey,
    text: isLoading ? "Paying" : "Pay Now",
    onSuccess,
    onClose,
    reference: paymentReference,
    className:
      "bg-green-500 text-xs font-bold text-white px-4 py-2 rounded hover:bg-green-600 hover:scale-105 transition",
  };

  return (
    <div className="space-y-4 text-gray-600">
      <h1 className="text-md md:text-lg font-bold mb-4">
        Booking Confirmation
      </h1>
      <div className="space-y-6">
        {/* Guest Information */}
        <div>
          <h2 className="text-xs md:text-sm font-bold">Guest Information</h2>
          <p className="text-xs md:text-sm">{fullName}</p>
          <p className="text-xs md:text-sm">{email}</p>
          <p className="text-xs md:text-sm">{phoneNumber}</p>
        </div>

        {/* Booking Details */}
        <div>
          <h2 className="text-xs md:text-sm font-bold">Booking Details</h2>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Guests: </span>
            {guests}
          </p>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Dates: </span>
            {checkIn} - {checkOut}
          </p>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Listing: </span>
            {listing?.LIST_NAME || "N/A"}
          </p>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Nights: </span>
            {duration}
          </p>
        </div>

        {/* Accommodation */}
        <div>
          <h2 className="text-xs md:text-sm font-bold">Property</h2>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Listing: </span>
            {listing?.LIST_NAME}
          </p>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Location: </span>
            {listing?.LOCATION}
          </p>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Price per Night: </span>$
            {listingPrice}
          </p>
        </div>

        {/* Car Rental Details */}
        {page === "place" && interestedInCar && selectedCar && (
          <div>
            <h2 className="text-xs md:text-sm font-bold">Car Rental Details</h2>
            <p className="text-xs md:text-sm">
              <span className="font-medium">Car: </span>
              {selectedCar?.ListName || "N/A"}
            </p>
            <p className="text-xs md:text-sm">
              <span className="font-medium">Driving Option: </span>
              {drivingOption === "chauffeur" ? "Chauffeur" : "Self-driving"}
            </p>
            {drivingOption === "chauffeur" && (
              <>
                <p className="text-xs md:text-sm">
                  <span className="font-medium">Chauffeur Rate: </span>$
                  {chauffeurRate}
                </p>
                <p className="text-xs md:text-sm">
                  <span className="font-medium">Pickup Location: </span>
                  {pickupLocation || "N/A"}
                </p>
              </>
            )}
            <p className="text-xs md:text-sm">
              <span className="font-medium">Dropoff Location: </span>
              {dropoffLocation || "N/A"}
            </p>
            <p className="text-xs md:text-sm">
              <span className="font-medium">Car Price: </span>${carPrice}
            </p>
          </div>
        )}

        {/* Tour Details */}
        {interestedInTour && selectedTour && (
          <div>
            <h2 className="text-xs md:text-sm font-bold">Tour Details</h2>
            <p className="text-xs md:text-sm">
              <span className="font-medium">Tour: </span>
              {selectedTour?.LIST_NAME || "N/A"}
            </p>
            <p className="text-xs md:text-sm">
              <span className="font-medium">Duration: </span>
              {duration} hours
            </p>
            <p className="text-xs md:text-sm">
              <span className="font-medium">Tour Price: </span>${tourPrice}
            </p>
          </div>
        )}

        {/* Price Breakdown */}
        <div>
          <h2 className="text-xs md:text-sm font-bold">Price Breakdown</h2>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Subtotal: </span>${subTotal}
          </p>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Service Fee: </span>${serviceFee}
          </p>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Total Price (USD): </span>$
            {grandTotalUSD}
          </p>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Total Price (GHS): </span>₵
            {totalPriceGHS}
          </p>
        </div>
      </div>

      {!paymentReference ? (
        <button
          onClick={initializePayment}
          disabled={isLoading}
          className={`bg-brand text-xs font-bold text-white px-4 py-2 rounded hover:bg-brand-4xl hover:scale-105 transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Processing..." : "Confirm Booking"}
        </button>
      ) : (
        <PaystackButton {...paystackProps} />
      )}
    </div>
  );
};

export default Confirmation;
