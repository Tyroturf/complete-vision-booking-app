import React from "react";

const Confirmation = ({ bookingDetails, onSubmit }) => {
  if (!bookingDetails) {
    return <div>Error: No booking details available.</div>;
  }

  return (
    <div className="space-y-4 text-gray-600">
      <h1 className="text-md md:text-lg font-bold mb-4">
        Booking Confirmation
      </h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xs md:text-sm font-bold">Guest Information</h2>
          <p className="text-xs md:text-sm">
            {bookingDetails.firstName} {bookingDetails.lastName}
          </p>
          <p className="text-xs md:text-sm">{bookingDetails.email}</p>
          <p className="text-xs md:text-sm">{bookingDetails.phoneNumber}</p>
        </div>
        <div>
          <h2 className="text-xs md:text-sm font-bold">Booking Details</h2>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Guests: </span>
            {bookingDetails.guests}
          </p>
          <p className="text-xs md:text-sm">
            <span className="font-medium">Dates: </span>
            {bookingDetails.checkIn} - {bookingDetails.checkOut}
          </p>
        </div>
        {bookingDetails.interestedInCar && (
          <div>
            <h2 className="text-xs md:text-sm font-bold">Car Rental Details</h2>
            <p className="text-xs md:text-sm">
              <span className="font-medium">Car Type: </span>
              {bookingDetails.carType}
            </p>
            <p className="text-xs md:text-sm">
              <span className="font-medium">Driving Option: </span>
              {bookingDetails.chauffeur ? "Chauffeur" : "Self-driving"}
            </p>
          </div>
        )}
        {bookingDetails.interestedInTour && (
          <div>
            <h2 className="text-xs md:text-sm font-bold">Tour Details</h2>
            <p className="text-xs md:text-sm">
              <span className="font-medium">Tour Type: </span>
              {bookingDetails.tourType}
            </p>
          </div>
        )}
      </div>
      <button
        onClick={onSubmit}
        className="bg-brand text-xs font-bold text-white px-4 py-2 rounded hover:bg-brand-4xl hover:scale-105 transition"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default Confirmation;
