import React, { useEffect, useState } from "react";
import BookDetails from "./bookDetails";
import { BookOverviewProps } from "../interfaces/IBookOverviewProps";

const BookOverview: React.FC<BookOverviewProps> = ({ books }) => {
  const [wishList, setWishList] = useState<{ id: string; title: string; authors: string | string[]; image: string }[]>([]);
  const [cart, setCart] = useState<{ id: string; title: string; authors: string | string[]; image: string; amount: string }[]>([]);

  useEffect(() => {
    const storedWishList = localStorage.getItem("wishList");
    const storedCart = localStorage.getItem("cart");

    if (storedWishList && storedCart) {
      setWishList(JSON.parse(storedWishList));
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToWishList = (id: string, title: string, authors: string | string[], image: string) => {
    if (!wishList.some((item) => item.id === id)) {
      setWishList((prevWishList) => {
        const newWishList = [...prevWishList, { id, title, authors, image }];
        localStorage.setItem("wishList", JSON.stringify(newWishList));
        return newWishList;
      });
    }
  };

  const addToCart = (id: string, title: string, authors: string | string[], image: string, amount: string, currencyCode: string) => {
    if (!cart.some((item) => item.id === id)) {
      setCart((prevCart) => {
        const newCart = [...prevCart, { id, title, authors, image, amount, currencyCode }];
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      });
    }
  };

  return (
    <div className="flex justify-start my-10">
      {books.map((book, i: number) => {
        const thumbnail = book.volumeInfo?.imageLinks?.thumbnail || "";
        const amount = book.saleInfo?.listPrice?.amount || "";
        const currencyCode = book.saleInfo?.listPrice?.currencyCode || "";

        return (
          <BookDetails
            key={i}
            id={book.id}
            image={thumbnail}
            title={book.volumeInfo.title}
            authors={book.volumeInfo.authors}
            publishedDate={book.volumeInfo.publishedDate}
            description={book.volumeInfo.description}
            pageCount={book.volumeInfo.pageCount}
            categories={book.volumeInfo.categories}
            language={book.volumeInfo.language}
            amount={book.saleInfo.listPrice.amount}
            currencyCode={book.saleInfo.listPrice.currencyCode}
            addToWishList={() => addToWishList(book.id, book.volumeInfo.title, book.volumeInfo.authors, thumbnail)}
            addToCart={() => addToCart(book.id, book.volumeInfo.title, book.volumeInfo.authors, thumbnail, amount, currencyCode)}
          />
        );
      })}
    </div>
  );
};

export default BookOverview;
