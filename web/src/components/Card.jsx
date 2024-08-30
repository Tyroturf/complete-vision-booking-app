import React from "react";
import { useNavigate } from "react-router-dom";
import { RatingSummary } from "./Review";

const Card = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-sm mb-7">
      <img
        src={item.IMAGE_URL}
        alt={item.LIST_NAME}
        className="w-full h-52 md:w-96 md:h-72 lg:h-72 object-cover rounded-t-lg md:rounded-r-none md:rounded-l-lg"
      />
      <div className="flex flex-col m-5 justify-center w-auto md:w-full">
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-3">
            <span className="font-bold text-sm md:text-base text-gray-700">
              {item.LIST_NAME}
            </span>
            <span className="font-thin text-xs">{item.LOCATION}</span>
            <div className="flex gap-2 bg-white rounded-lg pr-4">
              <p className="text-xs">{item.AMENITIES}</p>
            </div>
            <RatingSummary rating={item.rating} />
          </div>
          <div className="flex">
            <span className="text-brand font-bold text-base">
              {item.PRICE}{" "}
              <span className="font-thin text-xs md:text-sm">/ night</span>
            </span>
          </div>
        </div>
        <div className="flex my-5">
          <button
            className="bg-brand p-3 px-6 text-white font-medium rounded-sm text-xs w-full"
            onClick={() => navigate(`/place/${item.LISTING_ID}`)}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
