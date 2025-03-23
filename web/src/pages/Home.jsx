import React from "react";
import { useNavigate } from "react-router";
import { useSearch } from "../contexts/SearchContext";

import CityCard from "../components/CityCard";
import CarRentalCard from "../components/CarRentalCard";
import TourCard from "../components/TourCard";

import suv from "../assets/suv.png";
import scrape from "../assets/scrape.webp";
import hall from "../assets/hall.webp";
import vill from "../assets/vill.png";
import t1 from "../assets/t1.png";
import ab from "../assets/ab.png";
import benz from "../assets/benz.avif";
import porshe from "../assets/porshe.avif";
import beach from "../assets/beach.png";
import bus from "../assets/bus.png";
import gall from "../assets/gall.png";
import hist from "../assets/hist.png";

const Home = () => {
  const navigate = useNavigate();
  const { setCurrentPage, updateSearchParams } = useSearch();

  const cities = [
    { id: 1, name: "Accra", image: vill },
    { id: 2, name: "Kumasi", image: scrape },
    { id: 3, name: "Aburi", image: ab },
    { id: 4, name: "Cape Coast", image: hall },
  ];

  const cars = [
    { id: 1, name: "Sedan", image: benz },
    { id: 3, name: "SUV", image: suv },
    { id: 4, name: "Bus", image: bus },
    { id: 2, name: "Coupe", image: porshe },
  ];

  const tours = [
    { id: 1, name: "Galleria Tour", image: gall },
    { id: 2, name: "Historical Tour", image: hist },
    { id: 3, name: "Fun Experiences", image: beach },
  ];

  const handleCityClick = (cityName) => {
    updateSearchParams({ location: cityName });
    setCurrentPage("places");
  };

  const handleCarClick = (car) => {
    updateSearchParams({ location: car });
    setCurrentPage("cars");
  };

  const handleTourClick = (tour) => {
    updateSearchParams({ location: tour });
    setCurrentPage("tours");
  };

  const handleClick = () => {
    navigate("/cars");
  };

  return (
    <>
      <div
        className="relative flex flex-col p-4 md:p-7 my-10 shadow-md gap-y-3 rounded-md bg-cover bg-center"
        style={{
          backgroundImage: `url(${t1})`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60 rounded-md"></div>

        <div className="relative flex justify-between items-center z-10">
          <p className="font-bold text-base md:text-xl text-white">
            Let's Tour Together
          </p>
          <div className="bg-white w-10 h-10 rounded-lg flex flex-col items-center justify-center text-xs px-6 text-slate-600">
            <p>From</p>
            <p className="font-bold">$100</p>
          </div>
        </div>

        <p className="relative text-xs md:text-sm text-white font-medium z-10">
          Embark on your dream vacation with exclusive 24/7 car service with a
          personal chauffeur, complemented by a private tour.
        </p>

        <button
          className="relative text-xs lg:text-sm w-full sm:w-48 p-2 bg-white rounded-md font-bold hover:scale-105 transition text-slate-500 z-10"
          onClick={() => navigate("/tours")}
        >
          Book a Tour
        </button>
      </div>

      <div className="space-y-3 m-1 pt-5  md:pt-10 rounded-lg shadow-md p-2 md:p-4 lg:p-7">
        <div className="flex justify-between">
          <span className="text-xs md:text-base font-bold text-slate-600">
            Find Places
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
            <CityCard
              key={city.id}
              city={city}
              onClick={() => handleCityClick(city.name)}
              navigate={navigate}
            />
          ))}
        </div>
      </div>

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
            <CarRentalCard
              key={car.id}
              car={car}
              onClick={() => handleCarClick(car.name)}
              navigate={navigate}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3 m-1 pt-5 mt-2 md:mt-3 md:pt-10 shadow-md p-2 md:p-4 lg:p-7">
        <span className="text-xs md:text-base font-bold text-slate-600">
          Popular Tours
        </span>
        <div className="flex flex-col md:flex-row">
          <p className="text-xs font-medium text-slate-600 lg:text-sm">
            Explore our range of tours and make the most out of your journey
            with exclusive offers.
          </p>
          <button
            className="border border-brand w-24 lg:w-36 text-xs rounded-md hover:scale-105 md:ml-10 mt-2 md:mt-0 md:justify-end transition py-1"
            onClick={() => navigate("/tours")}
          >
            See All
          </button>
        </div>
        <div className="flex gap-1 md:gap-2 lg:gap-3 overflow-x-auto py-2">
          {tours.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              onClick={handleTourClick}
              navigate={navigate}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
