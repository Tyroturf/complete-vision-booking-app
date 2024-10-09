import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faHotel,
  faBars,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthContext";
import { showSuccessToast } from "../utils/toast";
import logo from "../assets/logo.png";

const baseLinkClasses =
  "text-xs lg:text-sm font-medium lg:px-3 md:px-1 py-2 rounded-md transition flex items-center space-x-2 mx-1";
const defaultLinkClasses =
  "text-gray-800 hover:bg-white hover:bg-opacity-15 hover:backdrop-blur-md active:bg-white active:bg-opacity-30";
const activeLinkClasses = "text-brand bg-white bg-opacity-15 backdrop-blur-md";

export const ProfileDropdown = ({ toggleDropdown, handleLogout }) => {
  const profileLink = "hover:bg-gray-100 w-full p-2 px-6";
  return (
    <motion.div
      className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <ul className="space-y-1 text-sm font-medium my-2">
        <li className={profileLink}>
          <Link to="/dashboard" className="text-gray-600">
            Dashboard
          </Link>
        </li>
        <li className={profileLink}>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </motion.div>
  );
};

const SubNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showSuccessToast("Logged out successfully");
    navigate("/login");
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 overflow-visible w-full">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              className="text-gray-500 font-bold text-sm md:text-xl"
              to={"/"}
            >
              <img className="md:h-14 h-8" src={logo} alt="Logo" />
            </Link>

            {/* Hamburger menu for small screens */}
            <button
              className="lg:hidden text-gray-500 lg:text-2xl md:text-lg"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>

            {/* Links for larger screens */}
            <div className="hidden lg:flex space-x-4 items-center ml-auto">
              <NavLink
                className={({ isActive }) =>
                  `${baseLinkClasses} ${
                    isActive ? activeLinkClasses : defaultLinkClasses
                  }`
                }
                to="/places"
              >
                <FontAwesomeIcon icon={faHotel} />
                <span>Find Stays</span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${baseLinkClasses} ${
                    isActive ? activeLinkClasses : defaultLinkClasses
                  }`
                }
                to="/cars"
              >
                <FontAwesomeIcon icon={faCar} />
                <span>Car Rentals</span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${baseLinkClasses} ${
                    isActive ? activeLinkClasses : defaultLinkClasses
                  }`
                }
                to="/tours"
              >
                <FontAwesomeIcon icon={faCar} />
                <span>Book Tour</span>
              </NavLink>
              <span className="h-5 border-l border-gray-400"></span>
              {user ? (
                <div className="relative">
                  <button
                    className={`${baseLinkClasses} ${defaultLinkClasses}`}
                    onClick={toggleDropdown}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </button>
                  {dropdownOpen && (
                    <ProfileDropdown
                      toggleDropdown={toggleDropdown}
                      handleLogout={handleLogout}
                    />
                  )}
                </div>
              ) : (
                <>
                  <NavLink
                    className={({ isActive }) =>
                      `${baseLinkClasses} ${
                        isActive ? activeLinkClasses : defaultLinkClasses
                      }`
                    }
                    to="/login"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `${baseLinkClasses} ${
                        isActive ? activeLinkClasses : defaultLinkClasses
                      }`
                    }
                    to="/register"
                  >
                    Sign Up
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `${baseLinkClasses} ${
                        isActive ? activeLinkClasses : defaultLinkClasses
                      }`
                    }
                    to="/host"
                  >
                    Become a host
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Responsive drawer for smaller screens */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-40 backdrop-filter backdrop-blur-lg transform transition-transform duration-300 lg:hidden z-50 ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              className="absolute top-5 right-5 text-white text-2xl"
              onClick={() => setMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="flex flex-col items-center justify-center h-full gap-y-3">
              <Link
                className="text-white my-3"
                to="/places"
                onClick={handleLinkClick}
              >
                <span className="text-base font-bold">Find Stays</span>
              </Link>
              <Link
                className="text-white my-3"
                to="/cars"
                onClick={handleLinkClick}
              >
                <span className="text-base font-bold">Car Rentals</span>
              </Link>
              <Link
                className="text-white my-3"
                to="/tours"
                onClick={handleLinkClick}
              >
                <span className="text-base font-bold">Book Tour</span>
              </Link>
              {user ? (
                <>
                  <Link
                    className="text-white my-3"
                    to="/dashboard"
                    onClick={handleLinkClick}
                  >
                    <span className="text-base font-bold">Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                    }}
                    className="text-white my-3"
                  >
                    <span className="text-base font-bold">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    className="text-white my-3"
                    to="/login"
                    onClick={handleLinkClick}
                  >
                    <span className="text-base font-bold">Login</span>
                  </Link>
                  <Link
                    className="text-white my-3"
                    to="/register"
                    onClick={handleLinkClick}
                  >
                    <span className="text-base font-bold">Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SubNav;
