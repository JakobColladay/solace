import { PaginationProps } from "../types"

const SimplePagination: React.FC<PaginationProps> = ({
     currentPage,
     totalPages,
     onPageChange
    }) => {
    // Don't render pagination if there's only one page
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center space-x-2 mt-4 py-3">
            {/* Previous button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${
                    currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-blue-600 hover:bg-blue-50'
                }`}
            >
                Previous
            </button>

            {/* Page indicator */}
            <span className="px-3 py-1 text-sm">
        Page {currentPage} of {totalPages}
      </span>
        {/* Next button */}
        <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded ${
                currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-blue-600 hover:bg-blue-50'
            }`}
        >
            Next
        </button>
        </div>
    );
};

export default SimplePagination;