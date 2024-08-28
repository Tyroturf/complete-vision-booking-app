import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import ItemList from "../components/ItemsList";
import { searchTours } from "../api";

const BookTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await searchTours();
        console.log(response);
        setTours(response.data.tours);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <ItemList
      items={tours}
      renderItem={(tour) => <Card key={tour.id} item={tour} />}
      itemsPerPage={3}
    />
  );
};

export default BookTours;
