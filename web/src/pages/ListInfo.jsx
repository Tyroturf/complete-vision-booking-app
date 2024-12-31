import { Link, useLocation, useParams } from "react-router-dom";
import room from "../assets/room.avif";
import scrape from "../assets/scrape.webp";
import ap from "../assets/ap.avif";
import suv from "../assets/suv.png";
import t1 from "../assets/t1.png";
import benz from "../assets/benz.avif";
import beach from "../assets/beach.png";
import bus from "../assets/bus.png";
import gall from "../assets/gall.png";
import hist from "../assets/hist.png";

const ListInfo = () => {
  const { type } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const hostType = queryParams.get("hostType");

  const images = {
    property: {
      section1: scrape,
      section2: room,
      section3: ap,
    },
    vehicle: {
      section1: suv,
      section2: bus,
      section3: benz,
    },
    tour: {
      section1: gall,
      section2: hist,
      section3: beach,
    },
  };

  const currentImages = images[type] || images.property;

  return (
    <div className="my-16 md:my-20 space-y-10">
      <section
        className="relative flex flex-col p-4 md:p-7 shadow-md gap-y-3 rounded-md bg-cover bg-center"
        style={{
          backgroundImage: `url(${t1})`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60 rounded-md"></div>

        <div className="relative z-10 text-white space-x-2 flex justify-between">
          <div>
            <h1 className="font-bold text-base md:text-xl">
              {type === "property" && "Let's List Your Property"}
              {type === "vehicle" && "Let's List Your Vehicle"}
              {type === "tour" && "Let's Tour Together"}
            </h1>
            <p className="text-xs md:text-sm font-medium">
              {type === "property" &&
                "List your property for others to rent or buy."}
              {type === "vehicle" && "List your vehicle for rent or sale."}
              {type === "tour" &&
                "Embark on your dream vacation with exclusive 24/7 car service and a personal chauffeur, complemented by a private tour."}
            </p>
          </div>
          <Link
            className="text-xs lg:text-sm  md:w-28 p-2 bg-white rounded-md font-bold hover:scale-105 transition text-slate-500 text-center md:mt-2"
            to={`/register-host?hostType=${hostType}`}
          >
            Get Started
          </Link>
        </div>
      </section>

      <section className="flex flex-col md:flex-row gap-6 items-center">
        <div className="md:w-1/2">
          <img
            src={currentImages.section1}
            alt="Why List With Us"
            className="w-full h-auto rounded-md shadow-md"
          />
        </div>
        <article className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Why List with Us?
          </h2>
          <div className="text-xs md:text-sm space-y-3">
            <p className="text-gray-600">
              <strong>Global Reach:</strong> Your property will be seen by
              millions of travelers from around the world. We use advanced
              marketing strategies to ensure your listing is visible to a broad
              audience.
            </p>
            <p className="text-gray-600">
              <strong>Easy Management:</strong> Our user-friendly platform makes
              it simple to manage your listing. You can update your property
              details, manage bookings, and communicate with guests, all from
              one convenient dashboard.
            </p>
            <p className="text-gray-600">
              <strong>Secure Transactions:</strong> We prioritize the security
              of both our hosts and guests. Our secure payment system ensures
              you receive your earnings on time and without hassle.
            </p>
            <p className="text-gray-600">
              <strong>24/7 Support:</strong> Our dedicated support team is
              available around the clock to assist you with any questions or
              issues that may arise.
            </p>
            <p className="text-gray-600">
              <strong>Comprehensive Insights:</strong> Gain valuable insights
              into your property’s performance with our detailed analytics.
              Understand booking trends, guest preferences, and more to optimize
              your listing and increase bookings.
            </p>
          </div>
        </article>
      </section>

      <section className="flex flex-col md:flex-row-reverse gap-6 items-center">
        <div className="md:w-1/2">
          <img
            src={currentImages.section2}
            alt="List Your Property"
            className="w-full h-auto rounded-md shadow-md"
          />
        </div>
        <article className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            How to List Your Property
          </h2>
          <div className="text-xs md:text-sm space-y-3">
            <p className="text-gray-600">
              <strong>Step 1: Create an Account</strong>
              <br />
              Sign up for an account on Complete Vision. It’s quick, easy, and
              free.
            </p>
            <p className="text-gray-600">
              <strong>Step 2: List Your Property</strong>
              <br />
              Fill in the details about your property. Provide high-quality
              photos, a detailed description, and set your availability.
            </p>
            <p className="text-gray-600">
              <strong>Step 3: Set Your Price</strong>
              <br />
              Determine your nightly, weekly, or monthly rates. You have full
              control over your pricing and can adjust it at any time.
            </p>
            <p className="text-gray-600">
              <strong>Step 4: Publish Your Listing</strong>
              <br />
              Once you’re satisfied with your listing, publish it to our
              platform. Your property will be live and visible to travelers
              worldwide.
            </p>
          </div>
        </article>
      </section>

      <section className="flex flex-col md:flex-row gap-6 items-center">
        <div className="md:w-1/2">
          <img
            src={currentImages.section3}
            alt="Tips for a Great Listing"
            className="w-full h-auto rounded-md shadow-md"
          />
        </div>
        <article className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Tips for a Great Listing
          </h2>
          <div className="text-xs md:text-sm space-y-3">
            <p className="text-gray-600">
              <strong>High-Quality Photos:</strong> Showcase your property with
              high-resolution images. Highlight key features and amenities to
              attract potential guests.
            </p>
            <p className="text-gray-600">
              <strong>Detailed Descriptions:</strong> Provide a comprehensive
              description of your property. Include information about the
              location, nearby attractions, and any unique aspects of your
              property.
            </p>
            <p className="text-gray-600">
              <strong>Accurate Availability:</strong> Keep your calendar
              up-to-date to avoid double bookings and ensure a smooth experience
              for your guests.
            </p>
            <p className="text-gray-600">
              <strong>Competitive Pricing:</strong> Research similar properties
              in your area to set competitive rates. Consider offering discounts
              for longer stays or last-minute bookings.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
};

export default ListInfo;
