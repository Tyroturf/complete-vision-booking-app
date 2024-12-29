import React, { useState, useEffect } from "react";
import { ProfileHero } from "./Dashboard";
import hero from "../assets/g.jpg";
import Modal from "../components/Modal";
import AddNewListForm from "../forms/AddNewListForm";
import { fetchListings } from "../api";

const Manage = () => {
  const { user_id } = JSON.parse(localStorage.getItem("user"));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const openAddModal = () => {
    setSelectedListing(null);
    toggleModal();
  };

  const openEditModal = (listing) => {
    setSelectedListing(listing);
    toggleModal();
  };

  useEffect(() => {
    const getListings = async () => {
      try {
        const response = await fetchListings(user_id);
        if (response.status === 200 && response.data) {
          setListings(response.data);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getListings();
  }, []);

  return (
    <div className="flex flex-col">
      <ProfileHero imageUrl={hero} />
      <NewList openAddModal={openAddModal} />

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <AddNewListForm
          mode={selectedListing ? "edit" : "add"}
          initialValues={selectedListing}
          onClose={toggleModal}
        />
      </Modal>

      {isLoading ? (
        <p className="text-center py-4">Loading listings...</p>
      ) : listings.length === 0 ? (
        <p className="text-center py-4">No listings available.</p>
      ) : (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-2">
          {listings.map((listing) => (
            <ListCard
              key={listing.id}
              listing={listing}
              onEdit={() => openEditModal(listing)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const NewList = ({ openAddModal }) => {
  return (
    <button
      onClick={openAddModal}
      className="flex items-center gap-3 my-3 md:my-10 w-40"
    >
      <span className="flex items-center justify-center w-8 h-8 bg-brand text-white rounded-full transition hover:scale-110">
        +
      </span>
      <p className="text-xs text-slate-700">Add New List</p>
    </button>
  );
};

const ListCard = ({ listing, onEdit }) => {
  return (
    <div className="cursor-pointer overflow-hidden rounded-md transform transition-transform duration-300 hover:scale-105">
      <div className="relative w-full h-60 overflow-hidden rounded-lg">
        <img
          src={listing.image1_url}
          alt={listing.list_name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col justify-end p-2 transition-opacity duration-300 bg-black bg-opacity-10 hover:bg-opacity-30">
          <div className="flex justify-between gap-10 mb-2 text-xs lg:text-sm text-white mx-auto">
            <p className="font-bold">{listing.list_name}</p>
            <p className="font-bold">${listing.price}</p>
          </div>
          <button
            onClick={onEdit}
            className="text-white text-xs w-full p-2 bg-brand rounded-md font-medium hover:scale-105"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Manage;
