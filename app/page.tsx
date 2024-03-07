"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Navbar from "./components/organisms/navbar";
import HomePage from "./components/pages/Home";
import { Book } from "./components/interfaces/IBook";
import { handleSearch } from "./components/services/bookService";

const Home = () => {
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
      <HomePage books={books} />
    </>
  );
};

export default Home;
