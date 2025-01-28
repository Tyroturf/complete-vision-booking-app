import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RatingSummary } from "./Review";

const Card = ({ item }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = location.search;

  const isPlacesPage = location.pathname.includes("places");
  const isCarsPage = location.pathname.includes("cars");

  const handleNavigate = () => {
    if (isPlacesPage) {
      navigate(`/places/${item.ID}${queryParams}`);
    } else if (isCarsPage) {
      navigate(`/cars/${item.ID}${queryParams}`);
    } else {
      navigate(`/tours/${item.ID}${queryParams}`);
    }
  };

  console.log("item", item);
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-sm mb-7">
      <img
        src={item.IMAGE1_URL}
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
              <AmenitiesList amenities={item?.AMENITIES} />
            </div>
            {/* <RatingSummary rating={item.rating} /> */}
          </div>
          <div className="flex">
            <span className="text-brand font-bold text-base">
              ${item.PRICE}{" "}
              <span className="font-thin text-xs md:text-sm">
                / {isPlacesPage ? "night" : "day"}
              </span>
            </span>
          </div>
        </div>
        <div className="flex my-5">
          <button
            className="bg-brand p-3 px-6 text-white font-medium rounded-sm text-xs w-full"
            onClick={handleNavigate}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
