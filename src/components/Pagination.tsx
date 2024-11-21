interface PaginationProps {
  ordersPerPage: number;
  totalOrders: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

function Pagination({ ordersPerPage, totalOrders, currentPage, setCurrentPage }: PaginationProps) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-8 flex justify-center">
      <ul className="inline-flex flex-wrap justify-center space-x-1">
        {pageNumbers.map(number => (
          <li key={number} className="mb-2">
            <button
              onClick={() => setCurrentPage(number)}
              className={`px-2 py-1 rounded text-[13px] ${
                currentPage === number
                  ? "bg-blue-500 text-white focus-visible:ring-blue-500"
                  : "bg-gray-300 text-gray-700 focus-visible:ring-gray-300 hover:opacity-90"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
