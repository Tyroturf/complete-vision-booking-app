// pages/SearchResults.js
import React from "react";
import SearchResultCard from "../components/SearchResultCard";
import city from "../assets/city.webp";
import scrape from "../assets/scrape.webp";
import hall from "../assets/hall.webp";
import wheel from "../assets/wheel.webp";
import fnj from "../assets/fnj.jpeg";
import tall from "../assets/tall.webp";
import benz from "../assets/benz.avif";
import porshe from "../assets/porshe.avif";
import sport from "../assets/sport.avif";

const SearchResults = ({ searchParams }) => {
  const mockApartments = [
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

  return (
    <div className="container max-w-full p-10">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Search Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockApartments.map((item) => (
          <SearchResultCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
