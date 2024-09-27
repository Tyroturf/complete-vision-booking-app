import PaystackPop from "@paystack/inline-js";

const Confirmation = ({ bookingDetails, onSubmit }) => {
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
  } = bookingDetails;

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
            {checkIn} - {checkOut} ({nights} nights)
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
            <span className="font-medium">Amenities: </span>
            {listing?.AMENITIES}
          </p>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Price: </span>${listingPrice}
          </p>
        </div>

        {/* Car Rental Details */}
        {interestedInCar && selectedCar && (
          <div>
            <h2 className="text-xs md:text-sm font-bold">Car Rental Details</h2>
            {/* <p className="text-xs md:text-sm">
              <span className="font-medium">Car Type: </span>
              {selectedCar?.CAR_TYPE || "N/A"}
            </p> */}
            <p className="text-xs md:text-sm">
              <span className="font-medium">Driving Option: </span>
              {chauffeur ? "Chauffeur" : "Self-driving"}
            </p>
            <p className="text-xs md:text-sm">
              <span className="font-medium">Pickup Location: </span>
              {pickupLocation || "N/A"}
            </p>
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

      <button
        onClick={() => console.log("pay")}
        className="bg-brand text-xs font-bold text-white px-4 py-2 rounded hover:bg-brand-4xl hover:scale-105 transition"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default Confirmation;
