import React from "react";

const SearchResultCard = ({ item }) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden flex mb-4 ml-0 w-full md:flex-grow-0 md:flex-shrink-0 md:flex-basis-1/2 hover:scale-105 transition">
      <div className="flex flex-col md:flex-row w-full">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-44 md:w-32 md:h-44 lg:w-44 lg:h-48 object-cover rounded-t-lg md:rounded-t -none md:rounded-l-lg"
        />
        <div className="flex-1 p-4">
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
      </div>
    </div>
  );
};

export default SearchResultCard;
