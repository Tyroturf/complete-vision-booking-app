import React from "react";
import { Link, useLocation } from "react-router-dom";

const ThankYou = () => {
  const location = useLocation();
  const { paymentReference, booking, page } = location.state || {};

  const getBookingDetailsLink = () => {
    let type = "";
    if (page === "place") type = "past stays";
    else if (page === "car") type = "rentals";
    else if (page === "tour") type = "tours";

    return `/booking-details/${booking}?type=${encodeURIComponent(type)}`;
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto mt-20 md:mt-40 text-gray-700">
      <div className="bg-white rounded-lg p-8 w-full max-w-md space-y-6 text-center">
        <h1 className="text-2xl font-extrabold text-brand">Thank You!</h1>
        <p className="text-xs md:text-sm">
          Your booking has been successfully completed.
        </p>
        {paymentReference && (
          <p className="text-xs md:text-sm">
            Booking Reference:{" "}
            <span className="font-medium text-brand">{paymentReference}</span>
          </p>
        )}
        {booking && page && (
          <div className="mt-10">
            <Link
              to={getBookingDetailsLink()}
              className="text-xs md:text-sm bg-brand text-white font-semibold px-6 py-2 rounded-md shadow-md hover:bg-brand-4xl hover:scale-105 transition transform"
            >
              View Booking Details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThankYou;
