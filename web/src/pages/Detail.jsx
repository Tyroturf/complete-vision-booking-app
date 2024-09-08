import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RatingSummary } from "../components/Review";
import ImageGallery from "../components/ImageGallery";

const Detail = ({ fetchDetail, type }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getDetail = async () => {
      try {
        const response = await fetchDetail(id);
        const data = response.data[type];
        setItem(data[0]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getDetail();
    }
  }, [id, fetchDetail, type]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching details: {error.message}</p>;

  const images = [
    item.IMAGE_URL,
    item.IMAGE1_URL,
    item.IMAGE2_URL,
    item.IMAGE3_URL,
    item.IMAGE4_URL,
  ];

  return (
    <div className="container max-w-full mx-auto mt-20">
      <div className="hidden lg:flex justify-between items-center px-5">
        <div className="flex-col items-center justify-center">
          <span className="font-bold text-xl text-gray-700">
            {item.LIST_NAME}
          </span>
          <RatingSummary />
          <span>{item.LOCATION}</span>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="text-brand font-bold text-base">
              {item.PRICE} <span className="font-thin text-xs"> / night</span>
            </span>
          </div>
          <button
            className="bg-brand p-4 px-6 text-white font-bold rounded-md"
            onClick={() => navigate(`/reservation/${type}/${item.ID}`)}
          >
            Reserve
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <ImageGallery images={images} />

      <div className="lg:hidden flex justify-between items-center p-5 pt-10">
        <div className="flex-col items-center justify-center text-gray-700">
          <span className="font-bold text-sm">{item.LIST_NAME}</span>
          <RatingSummary />
          <span className="text-xs font-thin">{item.LOCATION}</span>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="text-brand font-bold text-base">
              {item.PRICE} <span className="font-thin text-xs">/ night</span>
            </span>
          </div>
          <button
            className="bg-brand p-2 text-white font-medium rounded-md text-xs"
            onClick={() => navigate(`/reservation/${type}/${item.ID}`)}
          >
            Reserve
          </button>
        </div>
      </div>

      <div className="border border-gray-30 w-2/3 mx-auto my-5"></div>

      <div className="flex flex-col gap-2 bg-transparent rounded-lg p-4">
        <span className="text-md font-bold">Overview</span>
        <span className="text-xs md:text:lg tracking-wide font-thin">
          {item.DESCRIPTION}
        </span>
        <RatingSummary />
      </div>

      <div className="border border-gray-30 w-2/3 mx-auto my-5"></div>

      <div className="flex flex-col bg-transparent rounded-lg p-4">
        <span className="text-base font-bold">Amenities</span>
        <p className="text-xs text-gray-700">{item.AMENITIES}</p>
      </div>
    </div>
  );
};

export default Detail;
