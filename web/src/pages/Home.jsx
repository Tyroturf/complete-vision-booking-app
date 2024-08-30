import LatestDestinationCard from "../components/LatestDestinationCard";
import city from "../assets/city.webp";
import scrape from "../assets/scrape.webp";
import hall from "../assets/hall.webp";
import wheel from "../assets/wheel.webp";
import fnj from "../assets/fnj.jpeg";
import tall from "../assets/tall.webp";
import benz from "../assets/benz.avif";
import porshe from "../assets/porshe.avif";
import sport from "../assets/sport.avif";

import CarRentalCard from "../components/CarRentalCard";
import { useNavigate } from "react-router";

const Home = () => {
  // const [cities, setCities] = useState([]);
  // const [cars, setCars] = useState([]);
  // const [loadingCities, setLoadingCities] = useState(true);
  // const [loadingCars, setLoadingCars] = useState(true);
  const navigate = useNavigate();

  const cities = [
    {
      id: 1,
      name: "Tema",
      image: wheel,
      count: 2,
    },
    {
      id: 2,
      name: "East Legon",
      image: scrape,
      count: 10,
    },
    {
      id: 3,
      name: "Tema",
      image: tall,
      count: 2,
    },
    {
      id: 4,
      name: "East Legon",
      image: hall,
      count: 10,
    },
    {
      id: 5,
      name: "Tema",
      image: fnj,
      count: 2,
    },
    {
      id: 6,
      name: "East Legon",
      image: city,
      count: 10,
    },
    {
      id: 7,
      name: "Tema",
      image: wheel,
      count: 2,
    },
    {
      id: 8,
      name: "East Legon",
      image: scrape,
      count: 10,
    },
  ];

  const cars = [
    {
      id: 1,
      name: "Mercedes C220",
      image: benz,
      price: 2000,
    },
    {
      id: 2,
      name: "Porshe",
      image: porshe,
      price: 1000,
    },
    {
      id: 3,
      name: "Ferrari",
      image: sport,
      price: 21000,
    },
    {
      id: 4,
      name: "Mercedes C220",
      image: benz,
      price: 2000,
    },
    {
      id: 5,
      name: "Porshe",
      image: porshe,
      price: 1000,
    },
    {
      id: 6,
      name: "Ferrari",
      image: sport,
      price: 21000,
    },
    {
      id: 7,
      name: "Mercedes C220",
      image: benz,
      price: 2000,
    },
    {
      id: 8,
      name: "Porshe",
      image: porshe,
      price: 1000,
    },
    {
      id: 9,
      name: "Ferrari",
      image: sport,
      price: 21000,
    },
  ];

  // useEffect(() => {
  //   const fetchCities = async () => {
  //     try {
  //       const response = await apiFetchCities();
  //       setCities(response.data);
  //     } catch (error) {
  //       showErrorToast("Error fetching cities: " + error.message);
  //     } finally {
  //       setLoadingCities(false);
  //     }
  //   };

  //   // Fetch car rentals
  //   const fetchCars = async () => {
  //     try {
  //       const response = await apiFetchCars();
  //       setCars(response.data);
  //     } catch (error) {
  //       showErrorToast("Error fetching cars: " + error.message);
  //     } finally {
  //       setLoadingCars(false);
  //     }
  //   };

  //   fetchCities();
  //   fetchCars();
  // }, []);

  const handleClick = () => {
    navigate("/cars");
  };

  return (
    <>
      {/* Latest Destination Section */}
      <div className="space-y-3 m-1 pt-5  md:pt-10 rounded-lg shadow-md p-2 md:p-4 lg:p-7">
        <div className="flex justify-between">
          <span className="text-xs md:text-base font-bold text-slate-600">
            Latest Destinations
          </span>
          <button
            className="border border-brand ml-8 w-24 lg:w-36 text-xs rounded-md hover:scale-105 mt-2 md:mt-0 md:justify-end transition py-1"
            onClick={() => navigate("/places")}
          >
            See All
          </button>
        </div>
        <div className="flex gap-1 md:gap-2 lg:gap-3 overflow-x-auto py-2">
          {cities.map((city) => (
            <LatestDestinationCard key={city.id} city={city} />
          ))}
        </div>
      </div>

      {/* Car Rental Section */}
      <div className="space-y-3 m-1 pt-5 mt-2 md:mt-3 md:pt-10 shadow-md p-2 md:p-4 lg:p-7">
        <span className="text-xs md:text-base font-bold text-slate-600">
          Car Rentals
        </span>
        <div className="flex flex-col md:flex-row">
          <p className="text-xs font-medium text-slate-600 lg:text-sm">
            Going somewhere to celebrate this season? Whether you’re going home
            or somewhere to roam, we’ve got the travel tools to get you to your
            destination.
          </p>
          <button
            className="border border-brand w-24 lg:w-36 text-xs rounded-md hover:scale-105 md:ml-10 mt-2 md:mt-0 md:justify-end transition py-1"
            onClick={handleClick}
          >
            See All
          </button>
        </div>
        <div className="flex gap-1 md:gap-2 lg:gap-3 overflow-x-auto py-2">
          {cars.map((car) => (
            <CarRentalCard key={car.id} car={car} />
          ))}
        </div>
      </div>

      {/* Book Tour */}
      <div className="flex bg-brand-5xl rounded-md flex-col p-4 md:p-7 my-10 shadow-md gap-y-3">
        <div className="flex justify-between items-center">
          <p className="font-bold text-base md:text:xl text-white">
            Let's Tour Together
          </p>
          <div className="bg-white w-10 h-10 rounded-lg flex flex-col items-center justify-center text-xs px-6 text-slate-600">
            <p>From</p>
            <p className="font-bold">$100</p>
          </div>
        </div>
        <p className="text-xs md:text-sm text-white font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          optio alias unde nulla voluptatem aspernatur, sapiente labore
          exercitationem assumenda voluptas vitae. Reiciendis culpa explicabo
          doloremque illum laboriosam? Quam, dicta iste. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Explicabo optio alias unde nulla
          voluptatem aspernatur, sapiente labore exercitationem assumenda
          voluptas vitae. Reiciendis culpa explicabo doloremque illum
          laboriosam? Quam, dicta iste.
        </p>

        <button
          className="text-xs lg:text-sm w-full sm:w-48 p-2 bg-white rounded-md font-bold hover:scale-105 transition text-slate-600"
          onClick={() => navigate("/tours")}
        >
          Book a Tour
        </button>
      </div>
    </>
  );
};

export default Home;
