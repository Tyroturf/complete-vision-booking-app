// components/PreviousSearch.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const PreviousSearch = ({ searchParams, onNewSearch }) => {
  const toggleSearchBar = () => {
    onNewSearch();
  };

  return (
    <div className="max-w-sm mx-auto mt-5 px-5">
      <div className="border border-brand flex items-center justify-between bg-white shadow-md rounded-lg p-4 cursor-pointer">
        <div className="flex items-center">
          <div>
            <p className="font-semibold">{searchParams.name}</p>
            <p className="text-gray-600 text-xs">
              {searchParams.dates} - {searchParams.date} .{" "}
              {searchParams.guests.length} adults
            </p>
          </div>
        </div>
        <button
          className="text-sm font-bold transition hover:scale-110"
          onClick={toggleSearchBar}
        >
          <FontAwesomeIcon icon={faSearch} className="text-gray-600 mr-2" />
        </button>
      </div>
    </div>
  );
};

export default PreviousSearch;
