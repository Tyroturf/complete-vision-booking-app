import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import wheel from "../assets/wheel.webp";
import city from "../assets/city.webp";
import scrape from "../assets/scrape.webp";
import hall from "../assets/hall.webp";
import fnj from "../assets/fnj.jpeg";
import tall from "../assets/tall.webp";
import benz from "../assets/benz.avif";
import porshe from "../assets/porshe.avif";
import sport from "../assets/sport.avif";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Review, RatingSummary } from "../components/Review";
import ImageGallery from "../components/ImageGallery";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const PlaceDetail = () => {
  const images = [city, wheel, tall, hall, scrape];

  return (
    <div className="container max-w-full mx-auto mt-20">
      <div className="hidden lg:flex justify-between items-center px-5">
        <div className="flex-col items-center justify-center">
          <span className="font-bold text-xl">Exodus Apartments</span>
          <RatingSummary />
          <span>Location</span>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="text-brand font-bold text-xl">
              $400 <span className="font-thin text-base">/ night</span>
            </span>
          </div>
          <button className="bg-brand p-4 px-6 text-white font-bold rounded-md">
            Reserve
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div>
        <ImageGallery images={images} />
        <div className="lg:hidden flex justify-between items-center p-5 pt-10">
          <div className="flex-col items-center justify-center">
            <span className="font-bold text-sm">Exodus Apartments</span>
            <RatingSummary />
            <span className="text-xs font-thin">Location</span>
          </div>
          <div className="flex flex-col gap-y-4">
            <div>
              <span className="text-brand font-bold text-base">
                $400 <span className="font-thin text-xs">/ night</span>
              </span>
            </div>
            <button className="bg-brand p-1 px-2 text-white font-medium rounded-md text-xs">
              Reserve
            </button>
          </div>
        </div>

        <div className="border border-gray-30 w-2/3 mx-auto my-5"></div>

        <div className="flex flex-col gap-2 bg-transparent rounded-lg p-4">
          <span className="text-base font-bold">Overview</span>
          <span className="text-xs font-thin">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio hic
            repudiandae, minima dicta consectetur necessitatibus, nemo obcaecati
            perferendis perspiciatis quos debitis explicabo fuga iste esse
            praesentium repellat ipsa. Cumque, enim. Cumque. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Optio hic repudiandae, minima
            dicta consectetur necessitatibus, nemo obcaecati perferendis
            perspiciatis quos debitis explicabo fuga iste esse praesentium
            repellat ipsa. Cumque, enim. Cumque. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Optio hic repudiandae, minima dicta
            consectetur necessitatibus, nemo obcaecati perferendis perspiciatis
            quos debitis explicabo fuga iste esse praesentium repellat ipsa.
            Cumque, enim. Cumque.
            <a href="" className=" mx-2 font-bold text-brand">
              Learn more
            </a>
          </span>
          <RatingSummary />
        </div>

        <div className="border border-gray-30 w-2/3 mx-auto my-5"></div>

        <div className="flex flex-col md:gap-2  bg-transparent rounded-lg p-4">
          <span className="text-base font-bold">Available Rooms</span>
          {/* Available roooms */}
          <div className="flex justify-between border-b border-b-gray-200 pb-5">
            <div className="flex items-center ">
              <img src={wheel} className="h-5 w-5" alt="icon" />
              <p className="mx-3 text-xs">
                Superior room - 1 double bed or 2 twin beds
              </p>
            </div>
            <div className="flex items-center gap-x-7">
              <span className="text-sm font-bold">
                $600 USD <span className="font-thin">/ night</span>
              </span>
              <button className="bg-brand p-1 px-3 text-white font-bold rounded-md text-xs">
                Book now
              </button>
            </div>
          </div>
          <div className="flex justify-between border-b border-b-gray-200 pb-5">
            <div className="flex items-center ">
              <img src={wheel} className="h-5 w-5" alt="icon" />
              <p className="mx-3 text-xs">
                Superior room - 1 double bed or 2 twin beds
              </p>
            </div>
            <div className="flex items-center gap-x-7">
              <span className="text-sm font-bold">
                $600 USD <span className="font-thin">/ night</span>
              </span>
              <button className="bg-brand p-1 px-3 text-white font-bold rounded-md text-xs">
                Book now
              </button>
            </div>
          </div>
          <div className="flex justify-between border-b border-b-gray-200 pb-5">
            <div className="flex items-center ">
              <img src={wheel} className="h-5 w-5" alt="icon" />
              <p className="mx-3 text-xs">
                Superior room - 1 double bed or 2 twin beds
              </p>
            </div>
            <div className="flex items-center gap-x-7">
              <span className="text-sm font-bold">
                $600 USD <span className="font-thin">/ night</span>
              </span>
              <button className="bg-brand p-1 px-3 text-white font-bold rounded-md text-xs">
                Book now
              </button>
            </div>
          </div>
        </div>

        <div className="border border-gray-30 w-2/3 mx-auto md:my-10 my-5"></div>

        <div className="hidden md:flex flex-col gap-2 bg-transparent rounded-lg p-4">
          <div className="flex">
            <p className="text-sm font-bold">Amenities</p>
          </div>
          <Link to="/my-hotels" className="p-2">
            <FontAwesomeIcon icon={faCar} />
            <span className="text-xs ml-3">Great Location</span>
          </Link>
        </div>

        <div className="border border-gray-30 w-2/3 mx-auto md:my-10 my-5"></div>

        <div className="flex flex-col bg-transparent rounded-lg p-4">
          <span className="text-base font-bold">What this place offers</span>
          <Link to="/my-hotels" className="my-2 text-xs flex justify-between">
            <span className="font-thin">Bay view</span>
            <FontAwesomeIcon icon={faCar} />
          </Link>
          <Link to="/my-hotels" className="my-2 text-xs flex justify-between">
            <span className="font-thin">Bay view</span>
            <FontAwesomeIcon icon={faCar} />
          </Link>
          <Link to="/my-hotels" className="my-2 text-xs flex justify-between">
            <span className="font-thin">Bay view</span>
            <FontAwesomeIcon icon={faCar} />
          </Link>
          <Link to="/my-hotels" className="my-2 text-xs flex justify-between">
            <span className="font-thin">Bay view</span>
            <FontAwesomeIcon icon={faCar} />
          </Link>
          <button className="border border-brand px-4 text-brand font-medium rounded-md text-xs py-2">
            Show all 20 amenities
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;
