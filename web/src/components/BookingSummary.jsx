import React, { useState, useEffect } from "react";
import { useReservation } from "../contexts/ReservationContext";
import { fetchExchangeRate } from "../api";
import { calculateNights, formatWithCommas } from "../utils/helpers";

const BookingSummary = ({ showFullPolicy, togglePolicy }) => {
  const { reservationData, setReservationData } = useReservation();
  const [specialRequests, setSpecialRequests] = useState("");
  const [totalPriceUSD, setTotalPriceUSD] = useState(0);
  const [totalPriceGHS, setTotalPriceGHS] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [chauffeurRate, setChauffeurRate] = useState(0);
  const [selectedTourPrice, setSelectedTourPrice] = useState(0);
  console.log("reservationData", reservationData);

  useEffect(() => {
    const getExchangeRate = async () => {
      const response = await fetchExchangeRate();
      setExchangeRate(response?.data?.ExchangeRate[0].EXCHANGE_RATE || 0);
    };
    getExchangeRate();
  }, []);

  useEffect(() => {
    if (!reservationData) return;

    const nights = calculateNights(
      reservationData?.checkIn,
      reservationData?.checkOut
    );
    const guests = reservationData?.guests || 1;

    const listingPrice = reservationData?.listing?.PRICE
      ? parseFloat(reservationData.listing.PRICE) || 0
      : 0;

    const carPrice =
      reservationData?.selectedCar && reservationData.interestedInCar
        ? reservationData?.selectedCar?.PRICE || 0
        : 0;

    const chauffeurRate = reservationData?.chauffeur
      ? reservationData?.selectedCar?.CHAUFFEUR_RATE || 0
      : 0;
    setChauffeurRate(chauffeurRate);

    const tourPrice =
      reservationData?.selectedTour && reservationData.interestedInTour
        ? reservationData?.selectedTour?.TOUR_PRICE
        : 0;
    setSelectedTourPrice(tourPrice);

    const totalListingPrice = listingPrice * nights;
    const totalTourPrice = tourPrice * guests;
    const totalVehiclePrice = carPrice * nights + chauffeurRate * nights;

    const subTotal = totalListingPrice + totalTourPrice + totalVehiclePrice;
    const serviceFee = subTotal * 0.01;
    const grandTotalUSD = subTotal + serviceFee;

    if (
      reservationData.subTotal !== subTotal ||
      reservationData.grandTotalUSD !== grandTotalUSD
    ) {
      setReservationData({
        ...reservationData,
        listingPrice: listingPrice,
        carPrice: carPrice,
        tourPrice: tourPrice,
        subTotal: subTotal,
        grandTotalUSD: grandTotalUSD,
        nights: nights,
      });
    }

    if (!isNaN(grandTotalUSD) && !isNaN(exchangeRate)) {
      const grandTotalGHS = grandTotalUSD * exchangeRate;
      setTotalPriceUSD(grandTotalUSD);
      setTotalPriceGHS(grandTotalGHS);
    }
  }, [reservationData, exchangeRate, setReservationData]);

  const policy = `We understand that plans can change. If you need to cancel your reservation, please let us know at least 24 hours in advance for a full refund. 
    Cancellations made within 24 hours of the check-in date will incur a one-night charge. No-shows will be charged the full amount of the reservation.`;

  return (
    <div className="flex flex-col">
      <div className="md:border border-brand rounded-lg flex flex-col h-full">
        <div className="space-y-5 md:p-6 flex-grow">
          <span className="font-bold text-sm">Your Price Summary</span>

          <div className="flex justify-between">
            <span className="text-xs">Listing Price</span>
            <span className="text-xs font-medium">
              ${reservationData?.listing?.PRICE || "0"} / night
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-xs">Nights</span>
            <span className="text-xs font-medium">
              {calculateNights(
                reservationData?.checkIn,
                reservationData?.checkOut
              )}
            </span>
          </div>

          {reservationData?.interestedInCar &&
            reservationData.selectedCar &&
            reservationData.selectedCar?.PRICE && (
              <div className="flex justify-between">
                <span className="text-xs">Vehicle Price (GHS)</span>
                <span className="text-xs font-medium">
                  $ {reservationData?.selectedCar?.PRICE || "0"} / night
                </span>
              </div>
            )}

          {reservationData?.chauffeur && reservationData.interestedInCar && (
            <div className="flex justify-between">
              <span className="text-xs">Chauffeur Price (GHS)</span>
              <span className="text-xs font-medium">
                $ {chauffeurRate || "0"}
              </span>
            </div>
          )}

          {reservationData?.interestedInTour &&
            reservationData.selectedTour && (
              <div className="flex justify-between">
                <span className="text-xs">Tour Price (GHS)</span>
                <span className="text-xs font-medium">
                  $ {selectedTourPrice}
                </span>
              </div>
            )}
        </div>

        <div className="bg-brand-sm rounded-b-lg w-full mt-auto">
          <div className="flex justify-between items-center p-6 text-gray-700">
            <span className="font-medium text-sm">Grand Total (GHS)</span>
            <span className="text-xl font-bold">
              GHS {formatWithCommas(totalPriceGHS)}
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
