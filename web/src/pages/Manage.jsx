import React, { useState } from "react";
import { ProfileHero } from "./Dashboard";
import hero from "../assets/g.jpg";
import suv from "../assets/suv.png";
import benz from "../assets/benz.avif";
import porshe from "../assets/porshe.avif";
import bus from "../assets/bus.png";
import Modal from "../components/Modal";
import AddNewListForm from "../forms/AddNewListForm";

const Manage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cars = [
    { id: 1, name: "Sedan", image: benz, price: 2000 },
    { id: 3, name: "SUV", image: suv, price: 21000 },
    { id: 4, name: "Bus", image: bus, price: 2000 },
    { id: 2, name: "Coupe", image: porshe, price: 1000 },
  ];

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col">
      <ProfileHero imageUrl={hero} />
      <NewList toggleModal={toggleModal} />

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <AddNewListForm />
      </Modal>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-2">
        {cars.map((car) => (
          <ListCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

const NewList = ({ toggleModal }) => {
  return (
    <button
      onClick={toggleModal}
      className="flex items-center gap-3 my-3 md:my-10 w-40"
    >
      <span className="flex items-center justify-center w-8 h-8 bg-brand text-white rounded-full transition hover:scale-110">
        +
      </span>
      <p className="text-xs text-slate-700">Add New List</p>
    </button>
  );
};

const ListCard = ({ car }) => {
  return (
    <div className="cursor-pointer overflow-hidden rounded-md transform transition-transform duration-300 hover:scale-105">
      <div className="relative w-full h-60 overflow-hidden rounded-lg">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col justify-end p-2 transition-opacity duration-300 bg-black bg-opacity-10 hover:bg-opacity-30">
          <div className="flex justify-between gap-10 mb-2 text-xs lg:text-sm text-white mx-auto">
            <p className="font-bold">{car.name}</p>
            <p className="font-bold">${car.price}</p>
          </div>
          <button className="text-white text-xs w-full p-2 bg-brand rounded-md font-medium hover:scale-105">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Manage;
