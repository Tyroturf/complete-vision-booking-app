import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import ItemList from "../components/ItemsList";
import { useSearch } from "../contexts/SearchContext";

const CarRentals = () => {
  const { cars, loading, error, searchCars, setCurrentPage, carRentalsParams } =
    useSearch();

  useEffect(() => {
    if (carRentalsParams) {
      searchCars(carRentalsParams);
    } else {
      searchCars();
    }
    setCurrentPage("cars");
  }, []);

  if (loading) return <p>Loading...</p>;
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
