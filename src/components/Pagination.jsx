import React from 'react';

export default function PaginationControls({currentPage, totalPages, handlePageChange, isLoading}) {
    const maxPagesToShow = 5;
    const pageNumbers = [];
    const toCalculate = Math.floor(maxPagesToShow/2);

    if(totalPages > 0) pageNumbers.push(1);

    let startPage = Math.max(2, currentPage - toCalculate +1 );
    let endPage = Math.min(totalPages-1, currentPage + toCalculate);

    if(currentPage<=toCalculate + 1) {
        startPage = 2;
        endPage = Math.min(totalPages-1, maxPagesToShow);
    }

    if(currentPage >= totalPages - toCalculate) {
        startPage = Math.max(2, totalPages - maxPagesToShow + 1);
        endPage = totalPages - 1;
    }
    
    if(startPage>2) {
        pageNumbers.push("...");
    }

    for(let i = startPage; i <= endPage; i++) {
        if(!pageNumbers.includes(i)) { 
            pageNumbers.push(i)
        }
    }

    if(endPage < totalPages - 1 && totalPages>maxPagesToShow) {
            pageNumbers.push("...");
    }

    if(totalPages > 1 && !pageNumbers.includes(totalPages)) {
        pageNumbers.push(totalPages);
    }

    const PageButton = ({ page, label = page }) => {
    const isCurrent = page === currentPage;
    const isEllipsis = label === "...";

    let Pageclasses =
      "px-4 py-2 mx-1 rounded-lg font-semibold transition-all duration-200 shadow-md";

    if (isEllipsis) {
      Pageclasses += " text-gray-500 cursor-default";
    } else if (isCurrent) {
      Pageclasses += " bg-yellow-600 text-white scale-105 shadow-yellow-500/50";
    } else {
      Pageclasses += " bg-gray-700 text-gray-300 hover:bg-yellow-500 hover:text-gray-900";
    }
    return (
      <button
        onClick={() => !isEllipsis && handlePageChange(page)}
        className={Pageclasses}
        disabled={isLoading || isEllipsis}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex justify-center items-center mt-3 mb-6 flex-wrap">
    
      <button
        className="px-4 py-3 mx-2 bg-gray-700 text-white rounded-lg font-semibold shadow-md disabled:opacity-50 hover:bg-gray-600 transition-colors"
        disabled={currentPage === 1 || isLoading}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>

  
      {pageNumbers.map((num, index) => (
        <PageButton key={index} page={num} label={num} />
      ))}

      <button
        className="px-4 py-3 mx-2 bg-gray-700 text-white rounded-lg font-semibold shadow-md disabled:opacity-50 hover:bg-gray-600 transition-colors"
        disabled={currentPage === totalPages || isLoading}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}