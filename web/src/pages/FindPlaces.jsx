import React from "react";
import porshe from "../assets/porshe.avif";
import { RatingSummary } from "../components/Review";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const PlaceCard = ({ place }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-sm mb-7">
      <img
        src={porshe}
        alt={place.name}
        className="w-full h-52 md:w-48 md:h-72 lg:w-52 lg:h-72 object-cover rounded-t-lg md:rounded-t-none md:rounded-l-lg"
      />
      <div className="flex flex-col m-5 justify-center w-auto md:w-full">
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-3">
            <span className="font-bold">{place.name}</span>
            <span className="font-thin text-xs">{place.location}</span>
            <div className="flex gap-2 bg-white rounded-lg pr-4">
              <FontAwesomeIcon icon={faCar} />
              <p className="text-xs font-medium">{place.amenities}</p>
            </div>
            <RatingSummary rating={place.rating} />
          </div>
          <div className="flex">
            <span className="text-brand font-bold text-base">
              ${place.price} <span className="font-thin text-xs">/ night</span>
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
    name: "Gallery Apartments",
    location: "Location 1",
    amenities: "20+ Amenities",
    rating: 4.5,
    price: 400,
  },
  {
    id: 2,
    name: "Sunset Villas",
    location: "Location 2",
    amenities: "15+ Amenities",
    rating: 4.0,
    price: 350,
  },
  {
    id: 3,
    name: "Sunset Villas",
    location: "Location 2",
    amenities: "15+ Amenities",
    rating: 4.0,
    price: 350,
  },
  {
    id: 4,
    name: "Sunset Villas",
    location: "Location 2",
    amenities: "15+ Amenities",
    rating: 4.0,
    price: 350,
  },
  {
    id: 5,
    name: "Sunset Villas",
    location: "Location 2",
    amenities: "15+ Amenities",
    rating: 4.0,
    price: 350,
  },
  {
    id: 6,
    name: "Sunset Villas",
    location: "Location 2",
    amenities: "15+ Amenities",
    rating: 4.0,
    price: 350,
  },
];

const FindPlaces = () => {
  return (
    <div className="flex flex-col m-20 mx-auto w-4/5">
      {mockPlaces.map((place) => (
        <PlaceCard key={place.id} place={place} />
      ))}
      <button className="bg-brand p-3 text-white font-bold rounded-md md:text-sm text-xs">
        Show more results
      </button>
    </div>
  );
};

export default FindPlaces;
