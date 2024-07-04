import { Link } from "react-router-dom";
// import { useAppContext } from "../contexts/AppContext";
// import SignOutButton from "./SignOutButton";
import hero from "../assets/hero.jpeg";
import Hero from "./Hero";
import { Navbar } from "./Navbar";

const Header = () => {
  const isLoggedIn = false;

  return (
    <div
      className="relative bg-cover bg-center py-6 h-96 m-6 rounded-xl"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url(${hero})`,
      }}
    >
      <Navbar />
      <Hero />
    </div>
  );
};

export default Header;
