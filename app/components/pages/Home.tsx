"use client";
import Footer from "../molecules/footer";
import Pagination from "../organisms/pagination";
import BookOverview from "../organisms/bookOverview";
import { BookListProps } from "../interfaces/IBookListProps";

const HomePage: React.FC<BookListProps> = ({ books }) => {
  return (
    <>
      <div className="bg-white min-h-screen py-3">
        <Pagination books={books} />
        <BookOverview books={books} />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
