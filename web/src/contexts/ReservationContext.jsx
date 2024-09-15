import React, { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

export const useReservation = () => useContext(ReservationContext);

export const ReservationProvider = ({ children }) => {
  const [reservationData, setReservationData] = useState({
    firstName: "",
    lastName: "",
    guests: 1,
    phoneNumber: "",
    email: "",
    checkIn: null,
    checkOut: null,
    interestedInCar: false,
    selectedCar: {},
    listing: {},
    chauffeur: false,
    pickupLocation: "",
    dropoffLocation: "",
    interestedInTour: false,
    selectedTour: "",
  });

  console.log(reservationData);

  return (
    <ReservationContext.Provider
      value={{ reservationData, setReservationData }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
