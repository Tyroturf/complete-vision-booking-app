import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import AmenitiesList from "../components/AmenitiesList";

const Card = ({ item }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = location.search;

  const isPlacesPage = location.pathname.includes("places");
  const isCarsPage = location.pathname.includes("cars");
  const isToursPage = location.pathname.includes("tours");

  const handleNavigate = () => {
    if (isPlacesPage) {
      navigate(`/places/${item.ID}${queryParams}`);
    } else if (isCarsPage) {
      navigate(`/cars/${item.ID}${queryParams}`);
    } else {
      navigate(`/tours/${item.ID}${queryParams}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden mb-7">
      <img
        src={item.IMAGE1_URL}
        alt={item.LIST_NAME}
        className="w-full h-52 md:w-96 md:h-72 lg:h-72 object-cover"
      />
      <div className="flex flex-col m-5 justify-center w-auto md:w-full">
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-3">
            <span className="font-bold text-sm md:text-base text-gray-700">
              {item.LIST_NAME}
            </span>

            <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {item.LOCATION}
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
              {item.CITY}
            </div>

            {isPlacesPage && (
              <div className="flex gap-2 bg-white rounded-lg pr-4 my-5">
                <AmenitiesList amenities={item?.AMENITIES} />
              </div>
            )}
            {isToursPage && (
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                {item.TOUR_TYPE}
              </div>
            )}
            {isCarsPage && (
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                {item.CAR_TYPE}
              </div>
            )}
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
            className="bg-brand p-3 px-6 text-white font-medium rounded-sm text-xs w-full hover:bg-brand-dark"
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
