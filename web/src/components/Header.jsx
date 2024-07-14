import hero from "../assets/hero.jpeg";
import Hero from "./Hero";
import { Navbar } from "./Navbar";
import SubNav from "./SubNav";

const Header = () => {
  return (
    <div>
      <div className="bg-brand md:hidden w-full">
        <SubNav />
      </div>
      <Hero imageUrl={hero} />
    </div>
  );
};

export default Header;
