// pages/CarRentals.js
import React from "react";
import carImage from "../assets/benz.avif";
import { RatingSummary } from "../components/Review";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CarRentalCard = ({ car }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-sm mb-7">
      <img
        src={carImage}
        alt={car.name}
        className="w-full h-52 md:w-48 md:h-72 lg:w-52 lg:h-72 object-cover rounded-t-lg md:rounded-t-none md:rounded-l-lg"
      />
      <div className="flex flex-col m-5 justify-center w-auto md:w-full">
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-3">
            <span className="font-bold">{car.name}</span>
            <span className="font-thin text-xs">{car.location}</span>
            <div className="flex gap-2 bg-white rounded-lg pr-4">
              <FontAwesomeIcon icon={faCar} />
              <p className="text-xs font-medium">{car.features}</p>
            </div>
            <RatingSummary rating={car.rating} />
          </div>
          <div className="flex">
            <span className="text-brand font-bold text-base">
              ${car.price} <span className="font-thin text-xs">/ day</span>
            </span>
          </div>
        </div>
        <div className="flex my-5">
          <button className="bg-brand p-3 px-6 text-white font-medium rounded-sm text-xs w-full">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

const mockCars = [
  {
    id: 1,
    name: "Tesla Model S",
    location: "San Francisco",
    features: "Electric, 4 seats",
    rating: 4.5,
    price: 100,
  },
  {
    id: 2,
    name: "BMW 3 Series",
    location: "Los Angeles",
    features: "Petrol, 5 seats",
    rating: 4.0,
    price: 80,
  },
  {
    id: 3,
    name: "Audi A4",
    location: "New York",
    features: "Diesel, 5 seats",
    rating: 4.2,
    price: 90,
  },
  {
    id: 4,
    name: "Mercedes C-Class",
    location: "Miami",
    features: "Petrol, 4 seats",
    rating: 4.3,
    price: 110,
  },
  {
    id: 5,
    name: "Honda Accord",
    location: "Chicago",
    features: "Hybrid, 5 seats",
    rating: 4.1,
    price: 70,
  },
  {
    id: 6,
    name: "Ford Mustang",
    location: "Las Vegas",
    features: "Petrol, 4 seats",
    rating: 4.4,
    price: 120,
  },
];

const CarRentals = () => {
  return (
    <div className="flex flex-col m-20 mx-auto w-4/5">
      {mockCars.map((car) => (
        <CarRentalCard key={car.id} car={car} />
      ))}
      <button className="bg-brand p-3 text-white font-bold rounded-md md:text-sm text-xs">
        Show more results
      </button>
    </div>
  );
};

export default CarRentals;
