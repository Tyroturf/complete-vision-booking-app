import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import SearchResults from "../pages/SearchResults";
import PreviousSearch from "../components/PreviousSearch";
import SubNav from "../components/SubNav";
import { Navbar } from "../components/Navbar";

const Layout = ({ children }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "",
  });
  const [showPreviousSearch, setShowPreviousSearchBar] = useState(false);

  const handleSearchSubmit = (values) => {
    setSearchParams(values); // Store search parameters on submit
    setShowPreviousSearchBar(true); // Hide search bar after submitting search
  };

  const toggleSearchBar = () => {
    setShowPreviousSearchBar(!showPreviousSearch);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {location.pathname === "/" && <Header />}
      {location.pathname !== "/" && <SubNav />}
      {/* Render Search Bar */}
      {!showPreviousSearch && location.pathname !== "/hotel" && (
        <div className="mt-20 md:mt-16">
          <SearchBar
            initialValues={searchParams}
            onSubmit={handleSearchSubmit}
          />
        </div>
      )}
      {location.pathname === "/search" &&
        searchParams &&
        showPreviousSearch && (
          <div className="container mx-auto z-0 max-w-full pt-5 mt-10 flex-1 md:mt-16">
            {/* Render Previous Search Component */}
            <PreviousSearch
              searchParams={searchParams}
              onNewSearch={toggleSearchBar}
            />
          </div>
        )}
      <div className="bg-[#f8f8f8]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
