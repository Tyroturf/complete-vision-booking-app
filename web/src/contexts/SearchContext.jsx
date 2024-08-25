import React, { createContext, useContext, useEffect, useState } from "react";
import {
  searchPlaces as apiSearchPlaces,
  searchCars as apiSearchCars,
  searchTours as apiSearchTours,
} from "../api";
import { showErrorToast } from "../utils/toast";

const SearchContext = createContext();
export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [carRentalsParams, setCarRentalsParams] = useState({});
  const [findPlacesParams, setFindPlacesParams] = useState({});
  const [bookToursParams, setBookToursParams] = useState({});
  const [cars, setCars] = useState([]);
  const [places, setPlaces] = useState([]);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(null); // 'cars', 'places', or 'tours'

  const searchPlaces = async (params) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiSearchPlaces(params);
      setPlaces(response.data);
    } catch (err) {
      showErrorToast("Failed to fetch places", err);
    } finally {
      setLoading(false);
    }
  };

  const searchCars = async (params) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiSearchCars(params);
      setCars(response.data);
    } catch (err) {
      showErrorToast("Failed to fetch cars", err);
    } finally {
      setLoading(false);
    }
  };

  const searchTours = async (params) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiSearchTours(params);
      setTours(response.data);
    } catch (err) {
      showErrorToast("Failed to fetch tours", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage === "cars") {
      searchCars(carRentalsParams);
    } else if (currentPage === "places") {
      searchPlaces(findPlacesParams);
    } else if (currentPage === "tours") {
      searchTours(bookToursParams);
    }
  }, [currentPage, carRentalsParams, findPlacesParams, bookToursParams]);

  const updateSearchParams = (params) => {
    console.log("update", params);
    switch (currentPage) {
      case "cars":
        setCarRentalsParams(params);
        break;
      case "places":
        setFindPlacesParams(params);
        break;
      case "tours":
        setBookToursParams(params);
        break;
      default:
        break;
    }
  };

  const value = {
    carRentalsParams,
    findPlacesParams,
    bookToursParams,
    updateSearchParams,
    setCurrentPage,
    cars,
    places,
    tours,
    error,
    loading,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
