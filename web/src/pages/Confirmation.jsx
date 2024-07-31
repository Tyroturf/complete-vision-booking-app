import React from "react";
import { useLocation } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation();
  const { bookingDetails } = location.state;

  if (!location.state || !location.state.bookingDetails) {
    return <div>Error: No booking details available.</div>;
  }

  return (
    <div className="container mx-auto mt-20 p-4">
      <h1 className="text-2xl font-bold mb-5">Booking Confirmation</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-medium">Guest Information</h2>
          <p>
            {bookingDetails.firstName} {bookingDetails.lastName}
          </p>
          <p>{bookingDetails.email}</p>
          <p>{bookingDetails.phoneNumber}</p>
        </div>
        <div>
          <h2 className="text-xl font-medium">Booking Details</h2>
          <p>Guests: {bookingDetails.guests}</p>
          <p>
            Dates: {bookingDetails.startDate} - {bookingDetails.endDate}
          </p>
        </div>
        {bookingDetails.interestedInCar && (
          <div>
            <h2 className="text-xl font-medium">Car Rental Details</h2>
            <p>Car Type: {bookingDetails.carType}</p>
            <p>
              Driving Option:{" "}
              {bookingDetails.chauffeur ? "Chauffeur" : "Self-driving"}
            </p>
          </div>
        )}
        {bookingDetails.interestedInTour && (
          <div>
            <h2 className="text-xl font-medium">Tour Details</h2>
            <p>Tour Type: {bookingDetails.tourType}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Confirmation;
