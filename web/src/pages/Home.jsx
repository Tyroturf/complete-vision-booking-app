// import { useQuery } from "react-query";
// import * as apiClient from "../api-client";

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
// import cityLights from '../../assets/city-lights.jpg';
// import desertOasis from '../../assets/desert-oasis.jpg';

const Home = () => {
  //   const { data: hotels } = useQuery("fetchQuery", () =>
  //     apiClient.fetchHotels()
  //   );

  //   const topRowHotels = hotels?.slice(0, 2) || [];
  //   const bottomRowHotels = hotels?.slice(2) || [];

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

  return (
    <>
      {/* Latest Destination Section */}
      <div className="space-y-3 m-1 pt-5 md:mt-2 md:pt-10 lg:pt-10 border border-brand rounded-lg shadow-md p-2 md:p-4 lg:p-7">
        <span className="text-xs md:text-base lg:text-xl font-bold">
          Latest Destinations
        </span>
        <div className="flex gap-1 md:gap-2 lg:gap-3 overflow-x-auto py-2">
          {cities.map((city) => (
            <LatestDestinationCard key={city.id} city={city} />
          ))}
        </div>
      </div>

      {/* Car Rental Section */}
      <div className="space-y-3 m-1 pt-5 mt-2 md:mt-3 md:pt-10 lg:pt-10 border border-brand rounded-lg shadow-md p-2 md:p-4 lg:p-7">
        <span className="text-xs md:text-base lg:text-xl font-bold">
          Car Rentals
        </span>
        <div className="flex flex-col md:flex-row">
          <p className="text-xs font-medium text-slate-600 lg:text-sm">
            Going somewhere to celebrate this season? Whether you’re going home
            or somewhere to roam, we’ve got the travel tools to get you to your
            destination.
          </p>
          <button className="border border-brand w-24 lg:w-36 text-xs rounded-sm hover:scale-105 md:ml-10 mt-2 md:mt-0 md:justify-end transition py-1">
            See All
          </button>
        </div>
        <div className="flex gap-1 md:gap-2 lg:gap-3 overflow-x-auto py-2">
          {cars.map((car) => (
            <CarRentalCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
