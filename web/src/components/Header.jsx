import { Link } from "react-router-dom";
// import { useAppContext } from "../contexts/AppContext";
// import SignOutButton from "./SignOutButton";
import hero from "../assets/hero.jpeg";
import Hero from "./Hero";
import { Navbar } from "./Navbar";

const Header = () => {
  const isLoggedIn = false;

  return (
    <div>
      <div
        className="bg-brand h-32 md:hidden" // Solid color for small screens
      >
        <Navbar />
      </div>
      <div
        className="hidden md:block relative bg-cover bg-center py-6 h-96 m-2 rounded-xl" // Background image for medium screens and up
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url(${hero})`,
        }}
      >
        <Navbar />
        <Hero />
      </div>
    </div>
  );
};

export default Header;
