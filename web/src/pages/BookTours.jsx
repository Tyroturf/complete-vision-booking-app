import React from "react";
import Card from "../components/Card";
import city from "../assets/city.webp";
import scrape from "../assets/scrape.webp";
import hall from "../assets/hall.webp";
import fnj from "../assets/fnj.jpeg";
import tall from "../assets/tall.webp";
import wheel from "../assets/wheel.webp";
import ItemList from "../components/ItemsList";

const mockTours = [
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
const BookTours = () => {
  //   const { setCurrentPage, tours } = useSearch();

  //   useEffect(() => {
  //     setCurrentPage("tours");
  //   }, [setCurrentPage]);

  return (
    <ItemList
      items={mockTours}
      renderItem={(tour) => <Card key={tour.id} item={tour} />}
      itemsPerPage={3}
    />
  );
};

export default BookTours;
