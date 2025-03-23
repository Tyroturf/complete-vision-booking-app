import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import SubNav from "../components/SubNav";

const Layout = ({ children }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useState({
    city: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    search: "",
    carType: "",
    tourType: "",
  });

  const handleSearchSubmit = (values) => {
    setSearchParams(values);
  };

  const showSearchBar =
    location.pathname === "/" ||
    location.pathname === "/places" ||
    location.pathname === "/cars" ||
    location.pathname === "/tours";

  const searchBarMarginClass =
    location.pathname === "/" ? "mt-24 md:mt-3" : "mt-24";

  return (
    <div className="flex flex-col min-h-screen">
      {location.pathname === "/" ? <Header /> : <SubNav />}
      {showSearchBar && (
        <div className={searchBarMarginClass}>
          <SearchBar
            initialValues={searchParams}
            onSubmit={handleSearchSubmit}
          />
        </div>
      )}
      <div className="flex-grow flex justify-center my-5">
        <div className="w-full max-w-6xl p-4">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
