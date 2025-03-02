import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotTub,
  faSwimmingPool,
  faSnowflake,
  faWifi,
  faTv,
  faCar,
  faUtensils,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";

const amenitiesIcons = {
  "Hot Tub": faHotTub,
  Pool: faSwimmingPool,
  "Air Condition": faSnowflake,
  WiFi: faWifi,
  TV: faTv,
  Parking: faCar,
  Kitchen: faUtensils,
  Gym: faDumbbell,
};

const AmenitiesList = ({ amenities = "" }) => {
  const amenitiesArray = amenities
    ? amenities.split(",").map((item) => item.trim())
    : [];

  return (
    <div className="grid grid-cols-3 md:flex gap-4">
      {amenitiesArray.length > 0 ? (
        amenitiesArray.map((amenity) => (
          <div key={amenity} className="flex items-center space-x-2">
            <FontAwesomeIcon
              icon={amenitiesIcons[amenity] || faUtensils}
              className="text-brand text-sm md:text:lg"
            />
            <span className="text-xs md:text:sm text-gray-700">{amenity}</span>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">No amenities available</p>
      )}
    </div>
  );
};

export default AmenitiesList;
