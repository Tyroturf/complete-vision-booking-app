import React, { useState, useEffect } from "react";
import { ProfileHero } from "./Dashboard";
import hero from "../assets/g.jpg";
import Modal from "../components/Modal";
import AddNewListForm from "../forms/AddNewListForm";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  fetchListings,
  fetchCarListing,
  fetchTourListing,
  deleteListing,
  deleteVehicle,
  deleteTour,
} from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showErrorToast, showSuccessToast } from "../utils/toast";

const Manage = () => {
  const { user_id, host_type } = JSON.parse(localStorage.getItem("user"));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleConfirmModal = () => {
    setIsConfirmModalOpen(!isConfirmModalOpen);
  };

  const openAddModal = () => {
    setSelectedListing(null);
    toggleModal();
  };

  const openEditModal = (listing) => {
    setSelectedListing(listing);
    toggleModal();
  };

  const openDeleteModal = (listing) => {
    setSelectedListing(listing);
    toggleConfirmModal();
  };

  const confirmDelete = async () => {
    try {
      let response;
      if (selectedListing) {
        if (host_type === "V") {
          response = await deleteVehicle(selectedListing.ID);
        } else if (host_type === "T") {
          response = await deleteTour(selectedListing.ID);
        } else response = await deleteListing(selectedListing.ID);
        if (response.status === 200) {
          showSuccessToast("Item added successfully");
          setListings((prev) =>
            prev.filter((item) => item.ID !== selectedListing.ID)
          );
          getListings();
        } else {
          showErrorToast("Error deleting item");
        }
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
    } finally {
      toggleConfirmModal();
    }
  };

  const getAddButtonText = () => {
    switch (host_type) {
      case "V":
        return "Add New Vehicle";
      case "T":
        return "Add New Tour";
      default:
        return "Add New Listing";
    }
  };

  const getListings = async () => {
    try {
      let response;
      let listings = [];

      if (host_type === "V") {
        response = await fetchCarListing(user_id);
        if (
          response.status === 200 &&
          Array.isArray(response.data.CarRentals)
        ) {
          listings = response.data.CarRentals;
        }
      } else if (host_type === "T") {
        response = await fetchTourListing(user_id);
        if (
          response.status === 200 &&
          Array.isArray(response.data.HostListings)
        ) {
          listings = response.data.HostListings;
        }
      } else {
        response = await fetchListings(user_id);
        if (
          response.status === 200 &&
          Array.isArray(response.data.HostListings)
        ) {
          listings = response.data.HostListings;
        }
      }

      setListings(listings);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setListings([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getListings();
  }, [host_type, user_id]);

  return (
    <div className="flex flex-col">
      <ProfileHero imageUrl={hero} />

      <NewList openAddModal={openAddModal} buttonText={getAddButtonText()} />

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <AddNewListForm
          mode={selectedListing ? "edit" : "add"}
          initialValues={selectedListing}
          onClose={toggleModal}
          getListings={getListings}
        />
      </Modal>

      <Modal isOpen={isConfirmModalOpen} onClose={toggleConfirmModal}>
        <div className="p-4">
          <h2 className="text-md md:text-lg font-bold mb-4">
            Confirm Deletion
          </h2>
          <p className="text-sm md:text-md">
            Are you sure you want to delete this listing?
          </p>
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={toggleConfirmModal}
              className="px-4 py-2 bg-gray-300 rounded-md text-sm md:text-md"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-brand text-white rounded-md text-sm md:text-md"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {isLoading ? (
        <p className="text-center py-4">Loading listings...</p>
      ) : listings.length === 0 ? (
        <p className="text-center py-4">No listings available.</p>
      ) : (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-2">
          {Array.isArray(listings) &&
            listings.map((listing) => (
              <ListCard
                key={listing.ID}
                listing={listing}
                onEdit={() => openEditModal(listing)}
                onDelete={() => openDeleteModal(listing)}
              />
            ))}
        </div>
      )}
    </div>
  );
};

const NewList = ({ openAddModal, buttonText }) => {
  return (
    <button
      onClick={openAddModal}
      className="flex items-center gap-3 my-3 md:my-10 w-40"
    >
      <span className="flex items-center justify-center w-8 h-8 bg-brand text-white rounded-full transition hover:scale-110">
        +
      </span>
      <p className="text-xs text-slate-700">{buttonText}</p>
    </button>
  );
};

const ListCard = ({ listing, onEdit, onDelete }) => {
  const imageUrl = listing.Image1URL || "https://via.placeholder.com/300";

  return (
    <div className="cursor-pointer overflow-hidden rounded-md transform transition-transform duration-300 hover:scale-105">
      <div className="relative w-full h-60 overflow-hidden rounded-lg">
        <img
          src={imageUrl}
          alt={listing.ListName}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col justify-end p-2 transition-opacity duration-300 bg-black bg-opacity-10 hover:bg-opacity-50">
          <div className="flex justify-between gap-10 mb-2 text-xs lg:text-sm text-white mx-auto">
            <p className="font-bold">{listing.ListName}</p>
            <p className="font-bold">${listing.Price}</p>
          </div>
          <div className="flex gap-10 mx-auto justify-between">
            <button
              onClick={onEdit}
              className="flex items-center justify-center text-white text-md w-10 h-10 p-2 hover:scale-105"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              onClick={onDelete}
              className="flex items-center justify-center text-white text-md w-10 h-10 p-2 hover:scale-105"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Manage;
