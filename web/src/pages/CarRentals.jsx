import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import ItemList from "../components/ItemsList";
import { useSearch } from "../contexts/SearchContext";
import { formatDate, getQueryParams } from "../utils/helpers";
import Loader from "../components/Loader";

const CarRentals = () => {
  const {
    cars,
    loading,
    error,
    searchCars,
    setCurrentPage,
    setCarRentalsParams,
  } = useSearch();

  const location = useLocation();

  useEffect(() => {
    setCurrentPage("cars");

    const queryParams = getQueryParams(location.search);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (Object.keys(queryParams).length > 0) {
      const p = {
        p_car_type: queryParams.p_car_type,
        p_city: queryParams.p_city,
        p_search: queryParams.p_search,
        p_check_in: formatDate(today),
        p_check_out: formatDate(tomorrow),
      };
      setCarRentalsParams(p);
      searchCars(p);
    } else {
      const defaultSearchParams = {
        p_check_in: formatDate(today),
        p_check_out: formatDate(tomorrow),
      };

      setCarRentalsParams(defaultSearchParams);
      searchCars(defaultSearchParams);
    }
  }, [location.search]);

  if (loading) return <Loader />;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <ItemList
      items={cars}
      renderItem={(car) => <Card key={car.ID} item={car} />}
      itemsPerPage={3}
    />
  );
};

export default CarRentals;
