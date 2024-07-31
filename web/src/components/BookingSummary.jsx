import React, { useState } from "react";

const BookingSummary = ({ showFullPolicy, togglePolicy }) => {
  const [specialRequests, setSpecialRequests] = useState("");

  return (
    <div className="flex flex-col">
      <div className="md:border border-brand rounded-lg flex flex-col h-56 md:h-72">
        <div className="space-y-5 md:p-6 flex-grow">
          <span className="font-bold text-sm">Your Price Summary</span>
          <div className="flex justify-between">
            <span className="text-xs">Original Price</span>
            <span className="text-xs font-medium">$ 40</span>
          </div>

          <div className="flex justify-between">
            <span className="text-xs">Early Booker Deal</span>
            <span className="text-xs font-medium">$ 40</span>
          </div>

          <div className="flex justify-between">
            <span className="text-xs">Service fee</span>
            <span className="text-xs font-medium">$ 40</span>
          </div>
        </div>

        <div className="bg-brand-sm rounded-b-lg w-full mt-auto">
          <div className="flex justify-between items-center p-6 text-gray-700">
            <span className="font-medium text-sm">Total</span>
            <span className="text-xl font-bold">$ 403</span>
          </div>
        </div>
      </div>

      {/* New Cancellation Policy Section */}
      <div className="mt-8 md:p-6 md:border border-brand rounded-lg space-y-5">
        <span className="font-bold text-sm">Cancellation Policy</span>
        <p className="text-xs">
          {showFullPolicy
            ? "We understand that plans can change. If you need to cancel your reservation, please let us know at least 24 hours in advance for a full refund. Cancellations made within 24 hours of the check-in date will incur a one-night charge. No-shows will be charged the full amount of the reservation."
            : "We understand that plans can change. If you need to cancel your reservation, please let us know at least 24 hours in advance for a full refund. Cancellations made within 24 hours of the check-in date will incur a one-night charge. No-shows will be charged the full amount of the reservation.".slice(
                0,
                100
              ) + "..."}
          <button
            onClick={togglePolicy}
            className="text-gray-500 hover:underline text-xs underline underline-offset-4 md:ml-2"
          >
            {showFullPolicy ? "Show Less" : "Learn More"}
          </button>
        </p>
      </div>

      {/* Special Requests Section */}
      <div className="mt-8 md:p-6 md:border border-brand rounded-lg space-y-5">
        <span className="font-bold text-sm">Special Requests</span>
        <p className="text-xs">
          Special requests can't be guaranteed, but the property will do its
          best to meet your needs. You can always make a special request after
          your booking is complete.
        </p>
        <textarea
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          placeholder="Add any special requests or requirements here"
          className="w-full border border-gray-300 px-3 py-2 rounded-md text-xs"
          rows="4"
        />
      </div>
    </div>
  );
};

export default BookingSummary;
