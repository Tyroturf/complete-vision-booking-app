import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import ItemList from "../components/ItemsList";
import { useSearch } from "../contexts/SearchContext";
import { formatDate, getQueryParams } from "../utils/helpers";
import Loader from "../components/Loader";

const BookTours = () => {
  const {
    tours,
    loading,
    error,
    searchTours,
    setCurrentPage,
    setBookToursParams,
  } = useSearch();

  const location = useLocation();

  useEffect(() => {
    setCurrentPage("tours");

    const queryParams = getQueryParams(location.search);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (Object.keys(queryParams).length > 0) {
      const p = {
        p_tour_type: queryParams.p_tour_type,
        p_city: queryParams.p_city,
        p_search: queryParams.p_search,
        p_check_in: formatDate(today),
        p_check_out: formatDate(tomorrow),
      };
      setBookToursParams(p);
      searchTours(p);
    } else {
      const defaultSearchParams = {
        p_check_in: formatDate(today),
        p_check_out: formatDate(tomorrow),
      };

      setBookToursParams(defaultSearchParams);
      searchTours(defaultSearchParams);
    }
  }, [location.search]);

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
