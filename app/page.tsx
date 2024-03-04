"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Book } from "./components/interfaces/IBook";
import Footer from "./components/molecules/footer";
import BookList from "./components/organisms/bookList";
import Navbar from "./components/organisms/navbar";
import { handleSearch } from "./components/services/bookService";

const Home: React.FC = () => {
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
      <main className="flex bg-white min-h-screen">
        <BookList books={books} />
      </main>
      <Footer />
    </>
  );
};

export default Home;
