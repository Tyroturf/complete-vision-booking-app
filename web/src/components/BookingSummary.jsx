import React, { useState, useEffect } from "react";
import { useReservation } from "../contexts/ReservationContext";
import { fetchExchangeRate } from "../api";
import {
  calculateNights,
  calculateDays,
  formatWithCommas,
} from "../utils/helpers";

const BookingSummary = ({ showFullPolicy, togglePolicy, page }) => {
  const { reservationData, setReservationData } = useReservation();
  const [specialRequests, setSpecialRequests] = useState("");
  const [totalPriceUSD, setTotalPriceUSD] = useState(0);
  const [totalPriceGHS, setTotalPriceGHS] = useState(0);
  const [chauffeurRate, setChauffeurRate] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [selectedTourPrice, setSelectedTourPrice] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);

  useEffect(() => {
    const getExchangeRate = async () => {
      const response = await fetchExchangeRate();
      setExchangeRate(response?.data?.ExchangeRate[0]?.EXCHANGE_RATE || 0);
    };
    getExchangeRate();
  }, []);

  useEffect(() => {
    if (!reservationData) return;

    const {
      checkIn,
      checkOut,
      listing,
      chauffeur,
      selectedCar,
      interestedInCar,
      interestedInTour,
      selectedTour,
      guests,
    } = reservationData;

    const duration =
      page === "place"
        ? calculateNights(checkIn, checkOut)
        : calculateDays(checkIn, checkOut);

    const listingPrice = parseFloat(listing?.PRICE) || 0;
    let chauffeurRate;

    if (chauffeur) {
      if (page === "place") {
        chauffeurRate =
          typeof selectedCar?.ChauffeurRate === "string"
            ? parseFloat(selectedCar.ChauffeurRate) || 0
            : selectedCar?.ChauffeurRate || 0;
      } else {
        chauffeurRate =
          typeof listing?.CHAUFFEUR_RATE === "string"
            ? parseFloat(listing.CHAUFFEUR_RATE) || 0
            : listing?.CHAUFFEUR_RATE || 0;
      }
    }

    const carPrice = interestedInCar ? parseFloat(selectedCar?.Price) || 0 : 0;
    const tourPrice = interestedInTour
      ? parseFloat(selectedTour?.TOUR_PRICE) || 0
      : 0;

    const totalListingPrice = (listingPrice + chauffeurRate) * duration;
    const totalTourPrice = tourPrice * (guests || 1);
    const totalVehiclePrice = carPrice * duration;
    const subTotal = totalListingPrice + totalTourPrice + totalVehiclePrice;
    const serviceFee = subTotal * 0.05;
    const grandTotalUSD = subTotal + serviceFee;
    const totalPriceGHS = grandTotalUSD * parseFloat(exchangeRate);

    setTotalPriceGHS(totalPriceGHS);
    setTotalPriceUSD(grandTotalUSD);
    setServiceFee(serviceFee);
    setChauffeurRate(chauffeurRate);
    setSelectedTourPrice(tourPrice);

    setReservationData((prev) => ({
      ...prev,
      listingPrice,
      carPrice,
      tourPrice,
      subTotal,
      grandTotalUSD,
      duration,
      serviceFee,
      totalPriceGHS,
      chauffeurRate,
    }));
  }, [
    reservationData?.checkIn,
    reservationData?.checkOut,
    reservationData?.listing,
    reservationData?.selectedCar,
    reservationData?.interestedInCar,
    reservationData?.chauffeur,
    reservationData?.selectedTour,
    reservationData?.interestedInTour,
    reservationData?.guests,
    exchangeRate,
    page,
    setReservationData,
  ]);

  const policy = `We understand that plans can change. If you need to cancel your reservation, please let us know at least 24 hours in advance for a full refund. 
    Cancellations made within 24 hours of the check-in date will incur a one-night charge. No-shows will be charged the full amount of the reservation.`;

  return (
    <div className="flex flex-col">
      <div className="md:border border-brand rounded-lg flex flex-col h-full">
        <div className="space-y-5 md:p-6 flex-grow">
          <span className="font-bold text-sm">Your Price Summary</span>

          <div className="flex justify-between">
            <span className="text-xs">
              {page === "tour"
                ? "Tour Price"
                : page === "car"
                ? "Car Price"
                : "Listing Price"}
            </span>
            <span className="text-xs font-medium">
              ${reservationData?.listing?.PRICE} /{" "}
              {page === "place" ? "night" : "day"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-xs">
              {page === "place" ? "No. of Nights" : "No. of Days"}
            </span>
            <span className="text-xs font-medium">
              {page === "place"
                ? calculateNights(
                    reservationData?.checkIn,
                    reservationData?.checkOut
                  )
                : calculateDays(
                    reservationData?.checkIn,
                    reservationData?.checkOut
                  )}
            </span>
          </div>

          {reservationData?.interestedInCar &&
            reservationData.selectedCar &&
            reservationData.selectedCar?.Price && (
              <div className="flex justify-between">
                <span className="text-xs">Car Rental Price $</span>
                <span className="text-xs font-medium">
                  $ {reservationData?.selectedCar?.Price} / day
                </span>
              </div>
            )}

          {reservationData?.chauffeur &&
            reservationData.interestedInCar &&
            page !== "tour" && (
              <div className="flex justify-between">
                <span className="text-xs">Chauffeur Price </span>
                <span className="text-xs font-medium">$ {chauffeurRate}</span>
              </div>
            )}

          {reservationData?.interestedInTour &&
            reservationData.selectedTour && (
              <div className="flex justify-between">
                <span className="text-xs">Tour Price </span>
                <span className="text-xs font-medium">
                  $ {selectedTourPrice || "0"} / day
                </span>
              </div>
            )}

          {serviceFee && (
            <div className="flex justify-between">
              <span className="text-xs">Service Fee</span>
              <span className="text-xs font-medium">$ {serviceFee}</span>
            </div>
          )}

          {totalPriceUSD && (
            <div className="flex justify-between">
              <span className="text-xs">Total $</span>
              <span className="text-xs font-medium">
                $ {formatWithCommas(totalPriceUSD)}
              </span>
            </div>
          )}
        </div>

        <div className="bg-brand-sm rounded-b-lg w-full mt-10">
          <div className="flex justify-between items-center p-6 text-gray-700">
            <span className="font-medium text-sm">Total (GHS)</span>
            <span className="text-lg md:text-xl font-bold">
              {formatWithCommas(totalPriceGHS)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 p-3 py-6 md:p-6 rounded-lg space-y-2 bg-brand-4xl text-white">
        <span className="font-bold text-sm">Cancellation Policy</span>
        <p className="text-xs font-medium">
          {showFullPolicy ? policy : policy.slice(0, 100) + "..."}
          <button
            onClick={togglePolicy}
            className="hover:underline text-xs underline underline-offset-4 md:ml-2"
          >
            {showFullPolicy ? "Show Less" : "Learn More"}
          </button>
        </p>
      </div>

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
