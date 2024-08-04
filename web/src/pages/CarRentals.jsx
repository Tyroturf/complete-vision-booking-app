import React, { useEffect } from "react";
import carImage from "../assets/benz.avif";
import { RatingSummary } from "../components/Review";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../components/Card";
import city from "../assets/city.webp";
import scrape from "../assets/scrape.webp";
import hall from "../assets/hall.webp";
import fnj from "../assets/fnj.jpeg";
import tall from "../assets/tall.webp";
import wheel from "../assets/wheel.webp";
import ItemList from "../components/ItemsList";
import { useSearch } from "../contexts/SearchContext";

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

const mockPlaces = [
  {
    id: 1,
    name: "Skyline Apartments",
    location: "East Legon",
    image: wheel,
    price: 1500,
    bedrooms: 2,
    amenities: ["Pool", "Gym", "WiFi"],
    checkIn: "2024-08-01",
    checkOut: "2024-08-15",
    guests: 2,
  },
  {
    id: 2,
    name: "Lakeside Residency",
    location: "Tema",
    image: hall,
    price: 1800,
    bedrooms: 3,
    amenities: ["Parking", "WiFi", "Air Conditioning"],
    checkIn: "2024-08-01",
    checkOut: "2024-08-15",
    guests: 4,
  },
  {
    id: 3,
    name: "Green View Apartments",
    location: "East Legon",
    image: tall,
    price: 1200,
    bedrooms: 1,
    amenities: ["WiFi", "Gym"],
    checkIn: "2024-08-01",
    checkOut: "2024-08-15",
    guests: 1,
  },
  {
    id: 4,
    name: "City Lights Apartments",
    location: "Tema",
    image: scrape,
    price: 1700,
    bedrooms: 2,
    amenities: ["Pool", "WiFi", "Air Conditioning"],
    checkIn: "2024-08-01",
    checkOut: "2024-08-15",
    guests: 3,
  },
  {
    id: 5,
    name: "Urban Oasis",
    location: "East Legon",
    image: city,
    price: 1600,
    bedrooms: 2,
    amenities: ["Gym", "WiFi", "Parking"],
    checkIn: "2024-08-01",
    checkOut: "2024-08-15",
    guests: 2,
  },
  {
    id: 6,
    name: "Harbor View Apartments",
    location: "Tema",
    image: fnj,
    price: 2000,
    bedrooms: 3,
    amenities: ["Pool", "Gym", "WiFi", "Parking"],
    checkIn: "2024-08-01",
    checkOut: "2024-08-15",
    guests: 4,
  },
];

const CarRentals = () => {
  //   const { setCurrentPage, cars } = useSearch();

  //   useEffect(() => {
  //     setCurrentPage("cars");
  //   }, [setCurrentPage]);

  return (
    <ItemList
      items={mockPlaces}
      renderItem={(car) => <Card key={car.id} item={car} />}
      itemsPerPage={3}
    />
  );
};

export default CarRentals;
