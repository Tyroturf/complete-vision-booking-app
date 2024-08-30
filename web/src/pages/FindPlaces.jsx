import React, { useEffect } from "react";
import Card from "../components/Card";
import ItemList from "../components/ItemsList";
import { useSearch } from "../contexts/SearchContext";

const FindPlaces = () => {
  const {
    places,
    loading,
    error,
    searchPlaces,
    setCurrentPage,
    findPlacesParams,
  } = useSearch();

  useEffect(() => {
    if (findPlacesParams) {
      searchPlaces(findPlacesParams);
    } else {
      searchPlaces();
    }
    setCurrentPage("places");
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <ItemList
      items={places}
      renderItem={(place) => <Card key={place.LISTING_ID} item={place} />}
      itemsPerPage={3}
    />
  );
};

export default FindPlaces;
