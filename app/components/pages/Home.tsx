"use client";
import Footer from "../molecules/footer";
import Pagination from "../organisms/pagination";
import { BookListProps } from "../interfaces/IBookListProps";

const HomePage: React.FC<BookListProps> = ({ books, searchField }) => {
  return (
    <>
      <div className="bg-white min-h-screen py-3">
        <Pagination books={books} searchField={searchField} />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
