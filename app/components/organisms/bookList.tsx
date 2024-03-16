import BookCards from "./bookCards";
import React, { useEffect, useState } from "react";
import { BookListProps } from "../interfaces/IBookListProps";

const BookList: React.FC<BookListProps> = ({ books }) => {
  const [cart, setCart] = useState<{ id: string; title: string; authors: string | string[]; image: string; amount: string }[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (id: string, title: string, authors: string | string[], image: string, amount: string, currencyCode: string) => {
    if (!cart.some((item) => item.id === id)) {
      setCart((prevCart) => {
        var newCart = [...prevCart, { id, title, authors, image, amount, currencyCode }];
        localStorage.setItem("cart", JSON.stringify(newCart));

        return newCart;
      });
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
            addToCart={() => addToCart(book.id, book.volumeInfo.title, book.volumeInfo.authors, thumbnail, amount, currencyCode)}
          />
        );
      })}
    </div>
  );
};

export default BookList;
