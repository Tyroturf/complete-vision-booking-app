import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import {
  fetchCarBookings,
  fetchPlaceBookings,
  fetchTourBookings,
} from "../api";
import { BookingCard } from "./Bookings";
import Back from "../components/Back";
import { getHeadingText } from "../utils/helpers";

const ListingBookings = () => {
  const { user_id, host_type } = JSON.parse(localStorage.getItem("user"));

  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchListingsData();
  }, []);

  const fetchListingsData = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (host_type === "L") {
        response = await fetchPlaceBookings(user_id);
        if (response?.status === 200) setListings(response.data.Bookings);
      } else if (host_type === "V") {
        response = await fetchCarBookings(user_id);
        if (response?.status === 200) setListings(response.data.CarBookings);
      } else if (host_type === "T") {
        response = await fetchTourBookings(user_id);
        if (response?.status === 200) setListings(response.data.TourBookings);
      }
      if (response?.status !== 200) {
        setError("Failed to load listings. Please try again.");
      }
    } catch (err) {
      setError("Failed to load listings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 md:mt-20 p-4">
      <Back path={"/manage"} page={`Manage ${getHeadingText(host_type)}`} />
      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (!listings || listings.length === 0) && (
        <p className="text-gray-800 text-xs md:text-sm p-5">
          No listings found
        </p>
      )}
      {!loading &&
        !error &&
        listings &&
        listings.map((listing, index) => (
          <BookingCard key={index} booking={listing} />
        ))}
    </div>
  );
};

export default ListingBookings;
