const CityCard = ({ city, onClick, navigate }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick(city.name);
    navigate(`/places?p_city=${encodeURIComponent(city.name)}`);
  };

  return (
    <div
      className="flex-shrink-0 w-36 md:w-48 lg:w-64 cursor-pointer overflow-hidden rounded-md transform transition-transform duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <div className="relative flex items-center">
        <div className="relative w-16 h-16 md:w-24 md:h-24 lg:w-36 lg:h-36 rounded-lg overflow-hidden group">
          <img
            src={city.image}
            alt={city.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col px-2">
          <span className="text-slate-500 font-bold tracking-wide text-xs lg:text-sm">
            {city.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CityCard;
