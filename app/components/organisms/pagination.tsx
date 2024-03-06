import { useEffect, useState } from "react";
import { PaginationArrowIcon } from "../atoms/paginationArrow";
import BookList from "./bookList";
import { BookListProps } from "../interfaces/IBookListProps";
import SortManager from "../molecules/sort";
import { Book } from "../interfaces/IBook";

const Pagination: React.FC<BookListProps> = ({ books }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, books.length);

  const totalPages = Math.ceil((books?.length || 0) / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const [sort, setSort] = useState<string>("");

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  const sortedBooks = [...books].sort((a: Book, b: Book) => {
    if (sort === "Newest") {
      return parseInt(b.volumeInfo.publishedDate?.substring(0, 4) || "0") - parseInt(a.volumeInfo.publishedDate?.substring(0, 4) || "0");
    } else if (sort === "Oldest") {
      return parseInt(a.volumeInfo.publishedDate?.substring(0, 4) || "0") - parseInt(b.volumeInfo.publishedDate?.substring(0, 4) || "0");
    }
    return 0;
  });

  const displayedBooks = sortedBooks.slice(startIndex, endIndex);

  return (
    <div>
      <SortManager sort={sort} handleSort={handleSort} />
      <BookList books={displayedBooks} />

      <div className="flex items-center justify-center">
        <button
          className="flex items-center gap-2 p-3 text-sm font-bold text-center text-black align-middle transition-all rounded-full select-none hover:bg-[#EEE5E3] active:bg-[#EEE5E3] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}>
          <PaginationArrowIcon d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle text-sm font-medium uppercase text-black transition-all hover:bg-[#EEE5E3] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
                currentPage === index + 1 ? "bg-black text-white text-sm shadow-md focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" : ""
              }`}
              type="button"
              onClick={() => handlePageChange(index + 1)}>
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">{index + 1}</span>
            </button>
          ))}
        </div>

        <button
          className="flex items-center p-3 text-sm font-bold text-center text-black uppercase align-middle transition-all rounded-full select-none hover:bg-[#EEE5E3] active:bg-[#EEE5E3] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}>
          <PaginationArrowIcon d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
