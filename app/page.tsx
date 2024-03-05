"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Book } from "./components/interfaces/IBook";
import Footer from "./components/molecules/footer";
import Navbar from "./components/organisms/navbar";
import { handleSearch } from "./components/services/bookService";
import Pagination from "./components/organisms/pagination";

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const updateBooks: Dispatch<SetStateAction<Book[]>> = (newBooks: Book[] | ((prevState: Book[]) => Book[])) => {
    setBooks((prevState) => (typeof newBooks === "function" ? newBooks(prevState) : newBooks));
  };

  const searchBooks = async (searchField: string) => {
    await handleSearch(searchField);
  };

  useEffect(() => {
    const loadDefaultBooks = async () => {
      const defaultBooks = await handleSearch("drama");
      updateBooks(defaultBooks);
    };

    loadDefaultBooks();
  }, []);

  return (
    <>
      <Navbar updateBooks={updateBooks} searchBooks={searchBooks} />
      <main className="bg-white min-h-screen py-3">
        <Pagination books={books} />
      </main>
      <Footer />
    </>
  );
};

export default Home;
