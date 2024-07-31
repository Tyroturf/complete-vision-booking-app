import React from "react";
// import porshe from "../assets/porshe.avif";
import wheel from "../assets/wheel.webp";
// import { RatingSummary } from "../components/Review";
// import { faCar } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import city from "../assets/city.webp";
import scrape from "../assets/scrape.webp";
import hall from "../assets/hall.webp";
import fnj from "../assets/fnj.jpeg";
import tall from "../assets/tall.webp";
import ItemList from "../components/ItemsList";
// import { useSearch } from "../contexts/SearchContext";

// const PlaceCard = ({ place }) => {
//   const navigate = useNavigate();
//   return (
//     <div className="flex flex-col md:flex-row bg-white shadow-sm mb-7">
//       <img
//         src={porshe}
//         alt={place.name}
//         className="w-full h-52 md:w-48 md:h-72 lg:w-52 lg:h-72 object-cover rounded-t-lg md:rounded-t-none md:rounded-l-lg"
//       />
//       <div className="flex flex-col m-5 justify-center w-auto md:w-full">
//         <div className="flex justify-between">
//           <div className="flex flex-col gap-y-3">
//             <span className="font-bold">{place.name}</span>
//             <span className="font-thin text-xs">{place.location}</span>
//             <div className="flex gap-2 bg-white rounded-lg pr-4">
//               <FontAwesomeIcon icon={faCar} />
//               <p className="text-xs font-medium">{place.amenities}</p>
//             </div>
//             <RatingSummary rating={place.rating} />
//           </div>
//           <div className="flex">
//             <span className="text-brand font-bold text-base">
//               ${place.price} <span className="font-thin text-xs">/ night</span>
//             </span>
//           </div>
//         </div>
//         <div className="flex my-5">
//           <button
//             className="bg-brand p-3 px-6 text-white font-medium rounded-sm text-xs w-full"
//             onClick={() => navigate("/hotel")}
//           >
//             View
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

const mockPlaces = [
  {
    id: 1,
    name: "Skyline Apartments",
    location: "East Legon",
    image: wheel,
    price: 1500,
    bedrooms: 2,
    amenities: ["Pool", "Gym", "WiFi"],
    checkIn: "2024-08-01",
    checkOut: "2024-08-15",
    guests: 2,
  },
  {
    id: 2,
    name: "Lakeside Residency",
    location: "Tema",
    image: hall,
    price: 1800,
    bedrooms: 3,
    amenities: ["Parking", "WiFi", "Air Conditioning"],
    checkIn: "2024-08-01",
    checkOut: "2024-08-15",
    guests: 4,
  },
  {
    id: 3,
    name: "Green View Apartments",
    location: "East Legon",
    image: tall,
    price: 1200,
    bedrooms: 1,
    amenities: ["WiFi", "Gym"],
    checkIn: "2024-08-01",
    checkOut: "2024-08-15",
    guests: 1,
  },
  {
    id: 4,
    name: "City Lights Apartments",
    location: "Tema",
    image: scrape,
    price: 1700,
    bedrooms: 2,
    amenities: ["Pool", "WiFi", "Air Conditioning"],
    checkIn: "2024-08-01",
    checkOut: "2024-08-15",
    guests: 3,
  },
  {
    id: 5,
    name: "Urban Oasis",
    location: "East Legon",
    image: city,
    price: 1600,
    bedrooms: 2,
    amenities: ["Gym", "WiFi", "Parking"],
    checkIn: "2024-08-01",
    checkOut: "2024-08-15",
    guests: 2,
  },
  {
    id: 6,
    name: "Harbor View Apartments",
    location: "Tema",
    image: fnj,
    price: 2000,
    bedrooms: 3,
    amenities: ["Pool", "Gym", "WiFi", "Parking"],
    checkIn: "2024-08-01",
    checkOut: "2024-08-15",
    guests: 4,
  },
];

const FindPlaces = () => {
  //   const { setCurrentPage, places } = useSearch();

  //   useEffect(() => {
  //     setCurrentPage("places");
  //   }, [setCurrentPage]);

  return (
    <ItemList
      items={mockPlaces}
      renderItem={(place) => <Card key={place.id} item={place} />}
      itemsPerPage={3}
    />
  );
};

export default FindPlaces;
