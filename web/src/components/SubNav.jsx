import {
  faCar,
  faHotel,
  faBars,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import the useAuth hook

const SubNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth(); // Destructure user and logout from the useAuth hook

  const linkClass =
    "text-gray-800 text-xs lg:text-sm font-medium lg:px-3 md:px-1 py-2 rounded-md transition flex items-center space-x-2 hover:bg-white hover:bg-opacity-15 hover:backdrop-blur-md active:bg-white active:bg-opacity-30 mx-1";

  const activeLinkClass =
    "text-orange-500 bg-white bg-opacity-15 backdrop-blur-md";

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 overflow-hidden w-full">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link className="text-gray-500 font-bold text-sm md:text-xl" to={"/"}>
            Complete Vision
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
                isActive ? `${linkClass} ${activeLinkClass}` : linkClass
              }
              to="/places"
            >
              <FontAwesomeIcon icon={faHotel} />
              <span>Find Stays</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${linkClass} ${activeLinkClass}` : linkClass
              }
              to="/cars"
            >
              <FontAwesomeIcon icon={faCar} />
              <span>Car Rentals</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${linkClass} ${activeLinkClass}` : linkClass
              }
              to="/tours"
            >
              <FontAwesomeIcon icon={faCar} />
              <span>Book Tour</span>
            </NavLink>
            <span className="h-5 border-l border-gray-400"></span>
            {user ? (
              <>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `${linkClass} ${activeLinkClass}` : linkClass
                  }
                  to="/profile"
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span>Profile</span>
                </NavLink>
                <button
                  onClick={logout}
                  className="text-gray-800 text-xs lg:text-sm font-medium lg:px-3 md:px-1 py-2 rounded-md transition flex items-center space-x-2 hover:bg-white hover:bg-opacity-15 hover:backdrop-blur-md active:bg-white active:bg-opacity-30 mx-1"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `${linkClass} ${activeLinkClass}` : linkClass
                  }
                  to="/login"
                >
                  Login
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `${linkClass} ${activeLinkClass}` : linkClass
                  }
                  to="/register"
                >
                  Sign Up
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
                  to="/profile"
                  onClick={handleLinkClick}
                >
                  <span className="text-base font-bold">Profile</span>
                </Link>
                <button
                  onClick={() => {
                    handleLinkClick();
                    logout();
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
  );
};

export default SubNav;
