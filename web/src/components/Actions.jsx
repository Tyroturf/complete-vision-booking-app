import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DropdownMenu = ({ openAddModal, getAddButtonText }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Open Menu
      </button>

      {dropdownOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50 py-2">
          <ul className="flex flex-col">
            <li>
              <button
                onClick={openAddModal}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-xs"
              >
                {getAddButtonText()}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/blocked-properties");
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-xs flex items-center gap-2"
              >
                View Blocked Properties
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/listing-bookings");
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-xs flex items-center gap-2"
              >
                View Listing Bookings
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
