import { Link } from "react-router-dom";

const CarRentalCard = ({ car }) => {
  if (!car) return null;
  return (
    <Link
      to={"/cars"}
      className="flex-shrink-0 w-40 md:w-52 lg:w-64 cursor-pointer overflow-hidden rounded-md transform transition-transform duration-300 hover:scale-105"
    >
      <div className="relative w-36 h-52 md:w-52 md:h-80 lg:w-60 lg:h-96 overflow-hidden rounded-lg">
        <img
          src={car.image}
          alt={car.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col justify-end p-2 transition-opacity duration-300 bg-black bg-opacity-10 hover:bg-opacity-30">
          <div className="flex justify-between mb-2 text-xs lg:text-sm text-white mx-auto">
            <p className="font-bold">{car.name}</p>
          </div>
          <button className="text-white text-xs lg:text-sm w-full md:w-48 mx-auto p-2 bg-brand rounded-md font-medium hover:scale-105">
            Rent a car
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CarRentalCard;
