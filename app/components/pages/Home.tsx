"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Book } from "../interfaces/IBook";
import Footer from "../molecules/footer";
import Navbar from "../organisms/navbar";
import { handleSearch } from "../services/bookService";
import Pagination from "../organisms/pagination";
import BookOverview from "../organisms/bookOverview";

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

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
        <BookOverview books={books} />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
