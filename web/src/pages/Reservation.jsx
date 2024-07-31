import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReservationForm from "../forms/ReservationForm";
import { RatingSummary } from "../components/Review";
import wheel from "../assets/wheel.webp";
import Divider from "../components/Divider";
import BookingSummary from "../components/BookingSummary";

const initialValues = {
  firstName: "",
  lastName: "",
  guests: 1,
  phoneNumber: "",
  email: "",
};

const Reservation = () => {
  const navigate = useNavigate();
  const [showFullPolicy, setShowFullPolicy] = useState(false);

  const handleSubmit = async (values) => {
    try {
      console.log("Reservation details:", values);
      navigate("/confirmation", { state: { bookingDetails: values } });
    } catch (error) {
      console.error("Failed to reserve room", error);
    } finally {
      //   setSubmitting(false);
    }
  };

  const togglePolicy = () => {
    setShowFullPolicy(!showFullPolicy);
  };

  return (
    <div className="container mx-auto mt-20 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5 md:border border-brand md:p-6 rounded-lg">
          <div className="flex justify-between gap-x-3">
            <img
              src={wheel}
              className="w-1/2 h-28 lg:h-56 object-cover rounded-lg"
              alt="icon"
            />
            <div className="flex flex-col justify-center gap-y-1">
              <span className="font-medium text-xs">Hotel Name</span>
              <RatingSummary />
              <span className="font-thin text-xs">Location</span>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="text-sm font-bold">Your Trip</span>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-xs font-medium">Dates</span>
                <span className="text-xs">30 Oct - 4 Nov</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-xs font-medium">Guests</span>
                <span className="text-xs">3 Guests</span>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <span className="font-bold text-sm">Enter your details</span>
            <ReservationForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
            />
          </div>
        </div>

        {/* Use the BookingSummary component */}
        <div className="flex items-center">
          <BookingSummary
            showFullPolicy={showFullPolicy}
            togglePolicy={togglePolicy}
          />
        </div>
      </div>
    </div>
  );
};

export default Reservation;
