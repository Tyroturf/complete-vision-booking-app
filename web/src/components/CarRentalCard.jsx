const CarRentalCard = ({ car, onClick, navigate }) => {
  if (!car) return null;

  const handleClick = () => {
    onClick(car.name);
    navigate(`/cars?p_car_type=${encodeURIComponent(car.name)}`);
  };

  return (
    <div
      className="flex-shrink-0 w-40 md:w-52 lg:w-64 cursor-pointer overflow-hidden rounded-md transform transition-transform duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <div className="relative w-36 h-52 md:w-52 md:h-80 lg:w-60 lg:h-96 overflow-hidden rounded-lg">
        <img
          src={car.image}
          alt={car.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-2 transition-opacity duration-300 bg-black bg-opacity-10 hover:bg-opacity-30">
          <div className="flex justify-between mb-2 text-xs lg:text-sm text-white mx-auto">
            <p className="font-bold text-sm md:text-lg">{car.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarRentalCard;
