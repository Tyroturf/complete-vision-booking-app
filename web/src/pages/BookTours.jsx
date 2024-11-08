import React, { useEffect } from "react";
import Card from "../components/Card";
import ItemList from "../components/ItemsList";
import { useSearch } from "../contexts/SearchContext";
import Loader from "../components/Loader";

const BookTours = () => {
  const {
    tours,
    loading,
    error,
    searchTours,
    setCurrentPage,
    bookToursParams,
  } = useSearch();

  useEffect(() => {
    if (bookToursParams) {
      searchTours(bookToursParams);
    } else {
      searchTours();
    }
    setCurrentPage("tours");
  }, []);

  if (loading) return <Loader />;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <ItemList
      items={tours}
      renderItem={(tour) => <Card key={tour.ID} item={tour} />}
      itemsPerPage={3}
    />
  );
};

export default BookTours;
