import React, { useState } from "react";

const ItemList = ({ items = [], renderItem, itemsPerPage = 3 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="my-10 mx-auto">
      <div className="flex flex-col">{currentItems.map(renderItem)}</div>
      <div className="flex justify-center mt-6 gap-x-4 items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-brand p-3 text-white font-bold rounded-md md:text-sm text-xs hover:scale-105 transition"
        >
          Previous
        </button>
        <span className="text-xs md:text-sm font-bold">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-brand p-3 text-white font-bold rounded-md md:text-sm text-xs hover:scale-105 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ItemList;
