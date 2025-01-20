import { PaystackButton } from "react-paystack";
import { saveBooking, verifyPayment } from "../api";
import { useState } from "react";
import { formatDate } from "../utils/helpers";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { useNavigate } from "react-router-dom";

const Confirmation = ({ bookingDetails, onSubmit, page }) => {
  const [paymentReference, setPaymentReference] = useState(null);
  const paystackPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
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
    chauffeur,
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
  } = bookingDetails;

  const fullName = `${firstName + " " + lastName}`;
  const bookingDate = new Date();
  const updatedBookingDetails = {
    ...bookingDetails,
    bookingDate: formatDate(bookingDate),
    user_id,
  };

  const initializePayment = async () => {
    try {
      const response = await saveBooking(updatedBookingDetails);
      console.log("save", response);
      if (response.data.status === "Booking Confirmed") {
        const { reference_id } = response.data;
        setPaymentReference(reference_id.toString());
      } else {
        showErrorToast("Error confirming booking");
      }
    } catch (error) {
      showErrorToast("Error confirming booking");
      console.error("Error initializing payment:", error);
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
  const onClose = async (response) => {
    console.log("Don't go");
  };

  const paystackProps = {
    email,
    amount: grandTotalUSD * 100,
    currency: "GHS",
    publicKey: paystackPublicKey,
    text: "Pay Now",
    onSuccess,
    onClose,
    // reference: paymentReference,
    className:
      "bg-brand text-xs font-bold text-white px-4 py-2 rounded hover:bg-brand-4xl hover:scale-105 transition",
  };

  console.log("paystack", paystackProps);
  return (
    <div className="space-y-4 text-gray-600">
      <h1 className="text-md md:text-lg font-bold mb-4">
        Booking Confirmation
      </h1>
      <div className="space-y-6">
        {/* Guest Information */}
        <div>
          <h2 className="text-xs md:text-sm font-bold">Guest Information</h2>
          <p className="text-xs md:text-sm">
            {firstName} {lastName}
          </p>
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
            {checkIn} - {checkOut} ({duration} nights)
          </p>
        </div>

        {/* Listing Details */}
        <div>
          <h2 className="text-xs md:text-sm font-bold">Accommodation</h2>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Listing: </span>
            {listing?.LIST_NAME}
          </p>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Location: </span>
            {listing?.LOCATION}
          </p>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Price: </span>${listingPrice}
          </p>
        </div>

        {/* Car Rental Details */}
        {page === "place" && interestedInCar && selectedCar && (
          <div>
            <h2 className="text-xs md:text-sm font-bold">Car Rental Details</h2>
            {/* <p className="text-xs md:text-sm">
              <span className="font-medium">Car Type: </span>
              {selectedCar?.CAR_TYPE || "N/A"}
            </p> */}
            <p className="text-xs md:text-sm">
              <span className="font-medium">Driving Option: </span>
              {drivingOption === "chauffeur" ? "Chauffeur" : "Self-driving"}
            </p>
            {drivingOption === "chauffeur" && (
              <p className="text-xs md:text-sm">
                <span className="font-medium">Pickup Location: </span>
                {pickupLocation || "N/A"}
              </p>
            )}
            <p className="text-xs md:text-sm">
              <span className="font-medium">Dropoff Location: </span>
              {dropoffLocation || "N/A"}
            </p>
          </div>
        )}

        {page === "car" && (
          <div>
            <h2 className="text-xs md:text-sm font-bold">Car Rental Details</h2>
            {/* <p className="text-xs md:text-sm">
              <span className="font-medium">Car Type: </span>
              {selectedCar?.CAR_TYPE || "N/A"}
            </p> */}
            <p className="text-xs md:text-sm">
              <span className="font-medium">Driving Option: </span>
              {drivingOption === "chauffeur" ? "Chauffeur" : "Self-driving"}
            </p>
            {drivingOption === "chauffeur" && (
              <p className="text-xs md:text-sm">
                <span className="font-medium">Pickup Location: </span>
                {pickupLocation || "N/A"}
              </p>
            )}
            <p className="text-xs md:text-sm">
              <span className="font-medium">Dropoff Location: </span>
              {dropoffLocation || "N/A"}
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
              <span className="font-medium">Tour Price: </span>${tourPrice}
            </p>
          </div>
        )}

        {/* Pricing Breakdown */}
        {/* <div>
          <h2 className="text-xs md:text-sm font-bold">Pricing Breakdown</h2>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Subtotal: </span>
            {subTotal} GHS
          </p>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Grand Total (USD): </span>
            {grandTotalUSD} USD
          </p>
        </div> */}
      </div>

      {!paymentReference ? (
        <button
          onClick={initializePayment}
          className="bg-brand text-xs font-bold text-white px-4 py-2 rounded hover:bg-brand-4xl hover:scale-105 transition"
        >
          Confirm
        </button>
      ) : (
        <PaystackButton {...paystackProps} />
      )}
    </div>
  );
};

export default Confirmation;
