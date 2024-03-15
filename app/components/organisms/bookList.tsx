import BookCards from "./bookCards";
import React, { useEffect, useState } from "react";
import { BookListProps } from "../interfaces/IBookListProps";
import { title } from "process";

const BookList: React.FC<BookListProps> = ({ books }) => {
  const [cart, setCart] = useState<string[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (title: string) => {
    if (!cart.includes(title) && title != null) {
      setCart((prevCart) => [...prevCart, title]);
    }
  };

  return (
    <div className="flex flex-wrap justify-center my-4">
      {books.map((book, i: number) => {
        const thumbnail = book.volumeInfo?.imageLinks?.thumbnail || "";
        const amount = book.saleInfo?.listPrice?.amount || "";
        const currencyCode = book.saleInfo?.listPrice?.currencyCode || "";

        return (
          <BookCards
            key={i}
            id={book.id}
            image={thumbnail}
            title={book.volumeInfo.title}
            authors={book.volumeInfo.authors}
            publishedDate={book.volumeInfo.publishedDate}
            volumeInfo={book.volumeInfo}
            saleInfo={book.saleInfo}
            amount={amount}
            currencyCode={currencyCode}
            addToCart={() => addToCart(book.volumeInfo.title)}
          />
        );
      })}
    </div>
  );
};

export default BookList;
