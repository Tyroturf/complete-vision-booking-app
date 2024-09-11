import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
    setFindPlacesParams,
  } = useSearch();

  const location = useLocation();

  const getQueryParams = (queryString) => {
    return queryString
      .slice(1)
      .split("&")
      .reduce((params, param) => {
        const [key, value] = param.split("=");
        params[key] = decodeURIComponent(value);
        return params;
      }, {});
  };

  useEffect(() => {
    setCurrentPage("places");

    const queryParams = getQueryParams(location.search);

    if (queryParams) {
      setFindPlacesParams(queryParams);
      searchPlaces(queryParams);
    } else {
      searchPlaces();
    }
  }, [location.search]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <ItemList
      items={places}
      renderItem={(place) => <Card key={place.ID} item={place} />}
      itemsPerPage={3}
    />
  );
};

export default FindPlaces;
