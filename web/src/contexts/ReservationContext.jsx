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
    selectedTour: {},
    listingPrice: 0,
    carPrice: 0,
    tourPrice: 0,
    subTotal: 0,
    grandTotalUSD: 0,
    nights: 0,
    selfie: null,
    driverLicense: null,
    drivingOption: "",
  });

  return (
    <ReservationContext.Provider
      value={{ reservationData, setReservationData }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
