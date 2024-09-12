import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import ItemList from "../components/ItemsList";
import { useSearch } from "../contexts/SearchContext";
import { formatDate } from "../utils/helpers";

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
    if (!queryString) {
      return {};
    }

    return queryString
      .slice(1)
      .split("&")
      .reduce((params, param) => {
        const [key, value] = param.split("=");
        if (key) {
          params[key] = decodeURIComponent(value);
        }
        return params;
      }, {});
  };

  useEffect(() => {
    setCurrentPage("places");

    const queryParams = getQueryParams(location.search);

    if (Object.keys(queryParams).length > 0) {
      setFindPlacesParams(queryParams);
      searchPlaces(queryParams);
    } else {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const defaultSearchParams = {
        p_check_in: formatDate(today),
        p_check_out: formatDate(tomorrow),
      };

      setFindPlacesParams(defaultSearchParams);
      searchPlaces(defaultSearchParams);
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
