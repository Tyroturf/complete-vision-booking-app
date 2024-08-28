import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import ItemList from "../components/ItemsList";
import { searchCars } from "../api";

const CarRentals = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await searchCars();
        console.log(response);
        setCars(response.data.car_rentals);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  console.log("cars", cars);
  return (
    <ItemList
      items={cars}
      renderItem={(car) => <Card key={car.id} item={car} />}
      itemsPerPage={3}
    />
  );
};

export default CarRentals;
