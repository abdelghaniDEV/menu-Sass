import React, { useEffect, useState } from "react";

export default function Pagination({ data, setData, itemsPerPage }) {
  
  // State for the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get the data for the current page
  const getCurrentData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  useEffect(() => {
    setData(getCurrentData());
  }, [currentPage , data ]);

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Generate page buttons
  const renderPageButtons = () => {
    return Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        className={`h-8 w-8 rounded-[4px] ${
          currentPage === index + 1 ? "bg-neutral-400" : "bg-neutral-300"
        } hover:bg-neutral-400 transition`}
        onClick={() => paginate(index + 1)}
      >
        {index + 1}
      </button>
    ));
  };

  return (
    <div className="pagination-controls flex gap-2 justify-center items-center mb-10">
      {/* Previous Button */}
      <button
        disabled={currentPage === 1}
        className="rounded-[4px] px-3 bg-neutral-300 h-8 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-400 transition"
        onClick={() => paginate(currentPage - 1)}
      >
        Prev
      </button>

      {/* Page Buttons */}
      {renderPageButtons()}

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        className="rounded-[4px] px-3 bg-neutral-300 h-8 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-400 transition"
        onClick={() => paginate(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
