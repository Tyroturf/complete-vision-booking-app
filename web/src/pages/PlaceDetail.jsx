import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RatingSummary } from "../components/Review";
import ImageGallery from "../components/ImageGallery";
import { fetchPlace } from "../api";

const PlaceDetail = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getPlaceDetails = async () => {
      try {
        const response = await fetchPlace(id);
        console.log(response.data.listings);
        setPlace(response.data.listings[0]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getPlaceDetails();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching place details: {error.message}</p>;

  const images = [
    place.IMAGE_URL,
    place.IMAGE1_URL,
    place.IMAGE2_URL,
    place.IMAGE3_URL,
  ];

  return (
    <div className="container max-w-full mx-auto mt-20">
      <div className="hidden lg:flex justify-between items-center px-5">
        <div className="flex-col items-center justify-center">
          <span className="font-bold text-xl">{place.LIST_NAME}</span>
          <RatingSummary />
          <span>{place.LOCATION}</span>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="text-brand font-bold text-xl">
              {place.PRICE} <span className="font-thin text-base">/ night</span>
            </span>
          </div>
          <button
            className="bg-brand p-4 px-6 text-white font-bold rounded-md"
            onClick={() => navigate("/reserve")}
          >
            Reserve
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <ImageGallery images={images} />

      <div className="lg:hidden flex justify-between items-center p-5 pt-10">
        <div className="flex-col items-center justify-center">
          <span className="font-bold text-sm">{place.LIST_NAME}</span>
          <RatingSummary />
          <span className="text-xs font-thin">{place.LOCATION}</span>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="text-brand font-bold text-base">
              {place.PRICE} <span className="font-thin text-xs">/ night</span>
            </span>
          </div>
          <button
            className="bg-brand p-2 text-white font-medium rounded-md text-xs"
            onClick={() => navigate("/reserve")}
          >
            Reserve
          </button>
        </div>
      </div>

      <div className="border border-gray-30 w-2/3 mx-auto my-5"></div>

      <div className="flex flex-col gap-2 bg-transparent rounded-lg p-4">
        <span className="text-base font-bold">Overview</span>
        <span className="text-xs font-thin">{place.DESCRIPTION}</span>
        <RatingSummary />
      </div>

      <div className="border border-gray-30 w-2/3 mx-auto my-5"></div>

      <div className="flex flex-col bg-transparent rounded-lg p-4">
        <span className="text-base font-bold">Amenities</span>
        <p className="text-xs">{place.AMENITIES}</p>
        <button className="border border-brand px-4 text-brand font-medium rounded-md text-xs py-2">
          Show all amenities
        </button>
      </div>
    </div>
  );
};

export default PlaceDetail;
