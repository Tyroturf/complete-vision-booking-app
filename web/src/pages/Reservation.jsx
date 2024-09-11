import React, { useEffect, useState } from "react";
import ReservationForm from "../forms/ReservationForm";
import { RatingSummary } from "../components/Review";
import BookingSummary from "../components/BookingSummary";
import Modal from "../components/Modal";
import Confirmation from "../pages/Confirmation";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { fetchPlace, fetchCar, fetchTour } from "../api";

const Reservation = ({ type }) => {
  const [showFullPolicy, setShowFullPolicy] = useState(false);
  const [data, setData] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (type === "listings") {
          response = await fetchPlace(id);
          setData(response.data.listings[0]);
        } else if (type === "car_rentals") {
          response = await fetchCar(id);
          setData(response.data.car_rentals[0]);
        } else if (type === "tours") {
          response = await fetchTour(id);
          setData(response.data.tours[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, type]);

  const initialValues = {
    firstName: user.first_name,
    lastName: user.last_name,
    guests: 1,
    phoneNumber: user.contact,
    email: user.email,
  };

  const handleSubmit = async (values) => {
    try {
      console.log("Reservation details:", values);
      setBookingDetails(values);
      setShowConfirmation(true);
    } catch (error) {
      console.error("Failed to reserve", error);
    }
  };

  const togglePolicy = () => {
    setShowFullPolicy(!showFullPolicy);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    setBookingDetails(null);
  };

  return (
    <div className="container mx-auto mt-20 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5 md:border border-brand md:p-6 rounded-lg">
          <div className="flex justify-between gap-x-3">
            <img
              src={data.IMAGE_URL}
              className="w-1/2 h-28 lg:h-56 object-cover rounded-lg"
              alt={data.LIST_NAME || "icon"}
            />
            <div className="flex flex-col justify-center gap-y-1">
              <span className="font-medium text-sm">{data.LIST_NAME}</span>
              <RatingSummary />
              <span className="font-thin text-xs">{data.LOCATION}</span>
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

        <div className="flex items-center">
          <BookingSummary
            showFullPolicy={showFullPolicy}
            togglePolicy={togglePolicy}
          />
        </div>
      </div>

      <Modal isOpen={showConfirmation} onClose={closeConfirmation}>
        <Confirmation bookingDetails={bookingDetails} />
      </Modal>
    </div>
  );
};

export default Reservation;
