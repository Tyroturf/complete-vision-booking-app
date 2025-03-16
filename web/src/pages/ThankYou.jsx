import React from "react";
import { Link } from "react-router-dom";

const ThankYou = ({ paymentReference, email }) => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto mt-20 md:mt-40 text-gray-700">
      <div className="bg-white rounded-lg p-8 w-full max-w-md space-y-6 text-center">
        <h1 className="text-2xl font-extrabold text-brand">Thank You!</h1>
        <p className="text-xs md:text-sm">
          Your booking has been successfully completed.
        </p>
        <p className="text-xs md:text-sm">
          Booking Reference:{" "}
          <span className="font-medium text-brand">{paymentReference}</span>
        </p>
        <p className="text-xs md:text-sm">
          We’ve sent a confirmation email to{" "}
          <span className="font-medium text-brand">{email}</span>.
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Link
            to="/"
            className="text-xs md:text-sm bg-brand text-white font-semibold px-6 py-2 rounded-md shadow-md hover:bg-brand-4xl hover:scale-105 transition transform"
          >
            Go to Homepage
          </Link>
          <Link
            to="/bookings"
            className="text-xs md:text-sm bg-gray-500 text-white font-semibold px-6 py-2 rounded-md shadow-md hover:bg-gray-600 hover:scale-105 transition transform"
          >
            View My Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
