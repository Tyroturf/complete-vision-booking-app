import React from "react";

const ThankYou = ({ paymentReference, email }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-700">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-6 text-center">
        <h1 className="text-2xl font-extrabold text-brand">Thank You!</h1>
        <p className="text-sm md:text-base">
          Your booking has been successfully completed.
        </p>
        <p className="text-sm md:text-base">
          Booking Reference:{" "}
          <span className="font-medium text-brand">{paymentReference}</span>
        </p>
        <p className="text-sm md:text-base">
          We’ve sent a confirmation email to{" "}
          <span className="font-medium text-brand">{email}</span>.
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-brand text-white font-semibold px-6 py-2 rounded-md shadow-md hover:bg-brand-4xl hover:scale-105 transition transform"
          >
            Go to Homepage
          </button>
          <button
            onClick={() => (window.location.href = "/bookings")}
            className="bg-gray-500 text-white font-semibold px-6 py-2 rounded-md shadow-md hover:bg-gray-600 hover:scale-105 transition transform"
          >
            View My Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
