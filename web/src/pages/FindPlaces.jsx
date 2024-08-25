import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import ItemList from "../components/ItemsList";
import { searchPlaces } from "../api";

const FindPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await searchPlaces();
        console.log(response);
        setPlaces(response.data.listings);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;
  console.log("places", places);
  return (
    <ItemList
      items={places}
      renderItem={(place) => <Card key={place.LISTING_ID} item={place} />}
      itemsPerPage={3}
    />
  );
};

export default FindPlaces;
