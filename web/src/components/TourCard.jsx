import React from "react";
import { Link } from "react-router-dom";

const TourCard = ({ item }) => {
  if (!item) return null;

  return (
    <Link
      to={`/tours/${item.id}`}
      className="flex-shrink-0 w-44 md:w-72 cursor-pointer overflow-hidden rounded-md transform transition-transform duration-300 hover:scale-105 mx-auto"
    >
      <div className="flex flex-col h-full">
        <img
          src={item.image}
          alt={item.name}
          className="w-44 md:w-72 h-36 md:h-44 object-cover rounded-t-md"
        />

        <div className="flex flex-col p-2 bg-white">
          <div className="flex flex-col gap-1 mb-2">
            <p className="font-bold text-xs lg:text-sm text-gray-700 text-center">
              {item.name}
            </p>
            <p className="text-xs text-gray-500">{item.LOCATION}</p>
          </div>

          <button className="w-full p-2 bg-brand text-white rounded-md font-medium text-xs lg:text-sm hover:scale-105 transition">
            Book Experience
          </button>
        </div>
      </div>
    </Link>
  );
};

export default TourCard;
