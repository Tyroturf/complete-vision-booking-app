import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden w-full hover:scale-105 transition cursor-pointer"
      onClick={() => navigate(`/place/${item.id}`)}
    >
      <div className="flex flex-col items-center w-full">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-60 md:h-72 object-cover rounded-t-lg"
        />
        <div className="flex-1 p-4 w-full">
          <h3 className="text-sm font-semibold text-gray-800">{item.name}</h3>
          <p className="text-xs text-gray-500 mb-2">{item.location}</p>
          <p className="text-xs text-brand font-bold">${item.price} / night</p>
          <div className="flex flex-wrap mt-2">
            <ul className="flex flex-wrap space-x-2">
              {item.amenities.map((amenity, index) => (
                <li
                  key={index}
                  className="text-xs bg-gray-200 px-2 py-1 rounded-md mb-1"
                >
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button className="bg-brand p-3 px-6 text-white font-medium rounded-sm text-xs w-full">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Card;
