import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faCar,
  faBars,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ProfileDropdown } from "./SubNav";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    showSuccessToast("Logged out successfully");
    navigate("/login");
  };

  const linkClass =
    "text-white text-xs lg:text-sm font-medium lg:px-3 md:px-2 py-2 rounded-md transition flex items-center space-x-2 hover:bg-white hover:bg-opacity-15 hover:backdrop-blur-md active:bg-white active:bg-opacity-30";

  return (
    <nav className="container mx-auto px-6 py-4">
      <div className="flex justify-between items-center gap-5">
        {/* Logo */}
        <Link className="text-white font-bold text-sm md:text-lg" to={"/"}>
          Complete Vision
        </Link>

        {/* Hamburger menu for small screens */}
        <button
          className="md:hidden text-white lg:text-2xl md:text-lg"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        {/* Links for larger screens */}
        <div className="hidden md:flex space-x-4 items-center ml-auto">
          <Link className={linkClass} to="/places">
            <FontAwesomeIcon icon={faHotel} />
            <span>Find Stays</span>
          </Link>
          <Link className={linkClass} to="/cars">
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </Link>
          <Link className={linkClass} to="/tours">
            <FontAwesomeIcon icon={faCar} />
            <span>Book Tour</span>
          </Link>
          <span className="h-5 border-l border-gray-400"></span>

          {user ? (
            <div className="relative">
              <button className={linkClass} onClick={toggleDropdown}>
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
              <Link className={linkClass} to="/login">
                <span>Login</span>
              </Link>
              <Link className={linkClass} to="/register">
                <span>Sign Up</span>
              </Link>
              <Link className={linkClass} to="/register">
                <span>Become a Host</span>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Responsive drawer for smaller screens */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 backdrop-filter backdrop-blur-lg transform transition-transform duration-300 md:hidden z-50 ${
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
          <Link className={linkClass} to="/places">
            <span className="text-base font-bold">Find Stays</span>
          </Link>
          <Link className={linkClass} to="/cars">
            <span className="text-base font-bold">Car Rentals</span>
          </Link>
          <Link className={linkClass} to="/tours">
            <span className="text-base font-bold">Book Tour</span>
          </Link>
          <Link className={linkClass} to="/login">
            <span className="text-base font-bold">Login</span>
          </Link>
          <Link className={linkClass} to="/register">
            <span className="text-base font-bold">Sign Up</span>
          </Link>
          <Link className={linkClass} to="/register">
            <span className="text-base font-bold">Become a Host</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
