import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faCar,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const linkClass =
    "text-white text-sm font-medium px-3 py-2 rounded-md transition flex items-center space-x-2 hover:bg-white hover:bg-opacity-20 hover:backdrop-blur-md active:bg-gray-100 active:text-brand";

  return (
    <nav className="container mx-auto px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <p className="text-white font-bold text-xl sm:text-xl">
          Complete Vision
        </p>

        {/* Hamburger menu for small screens */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>

        {/* Links for larger screens */}
        <div className="hidden md:flex space-x-4 items-center ml-auto">
          <Link
            className={`${linkClass} mr-2`}
            to="/my-bookings"
            onClick={() => setMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faHotel} />
            <span>Find Stays</span>
          </Link>
          <Link
            className={linkClass}
            to="/my-hotels"
            onClick={() => setMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </Link>
          <Link
            className={`${linkClass} mr-2`}
            to="/login"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            className={linkClass}
            to="/sign-up"
            onClick={() => setMenuOpen(false)}
          >
            Sign up
          </Link>
        </div>
      </div>

      <div className="md:hidden flex mt-6">
        <Link
          className={`${linkClass} mr-2`}
          to="/my-bookings"
          onClick={() => setMenuOpen(false)}
        >
          <FontAwesomeIcon icon={faHotel} />
          <span>Find Stays</span>
        </Link>
        <Link
          className={linkClass}
          to="/my-hotels"
          onClick={() => setMenuOpen(false)}
        >
          <FontAwesomeIcon icon={faCar} />
          <span>Car Rentals</span>
        </Link>
      </div>

      {/* Responsive menu for smaller screens */}
      {menuOpen && (
        <div className="absolute left-1/3 right-0 top-20 bg-brand flex flex-col items-center md:hidden space-y-2 py-4">
          <Link
            className={linkClass}
            to="/login"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            className={linkClass}
            to="/sign-up"
            onClick={() => setMenuOpen(false)}
          >
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
};
