import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faCar } from "@fortawesome/free-solid-svg-icons";

const linkClass = `text-white px-3 font-medium p-2 rounded-md transition flex items-center 
                    space-x-2 hover:bg-white hover:bg-opacity-20 hover:backdrop-blur-md 
                    active:bg-gray-100 active:text-gray-800 sm:`;

export const Navbar = () => {
  return (
    <div className="container mx-auto flex justify-between px-6">
      <div className="flex">
        <Link className={`${linkClass} mr-2`} to="/my-bookings">
          <FontAwesomeIcon icon={faHotel} />
          <span className="text-sm">Find Stays</span>
        </Link>
        <Link className={linkClass} to="/my-hotels">
          <FontAwesomeIcon icon={faCar} />
          <span className="text-sm">Car Rentals</span>
        </Link>
      </div>

      <p className="flex items-center text-white px-3 font-bold text-3xl sm:text-lg">
        Complete Vision
      </p>

      <div className="flex">
        <Link to="/login" className={`${linkClass} mr-2`}>
          Login
        </Link>
        <Link to="/sign-up" className={linkClass}>
          Sign up
        </Link>
      </div>
    </div>
  );
};
