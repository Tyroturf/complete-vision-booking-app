import { Link } from "react-router-dom";

const CityCard = ({ city }) => {
  return (
    <Link
      to={`/places?p_search=${encodeURIComponent(city.name)}`}
      className="flex-shrink-0 w-36 md:w-48 lg:w-64 cursor-pointer overflow-hidden rounded-md transform transition-transform duration-300 hover:scale-105"
    >
      <div className="relative flex items-center">
        <div className="relative w-16 h-16 md:w-24 md:h-24 lg:w-36 lg:h-36 rounded-lg overflow-hidden group">
          <img
            src={city.image}
            alt={city.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 border-2 border-transparent transition rounded-lg"></div>
        </div>

        <div className="flex flex-col px-2">
          <span className="text-slate-500 font-bold tracking-wide text-xs lg:text-sm">
            {city.name}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CityCard;
