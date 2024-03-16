import React, { useEffect, useState } from "react";
import BookDetails from "./bookDetails";
import { Book } from "../interfaces/IBook";

const BookOverview: React.FC<{ book: Book }> = ({ book }) => {
  const thumbnail = book.volumeInfo?.imageLinks?.thumbnail || "";
  const amount = book.saleInfo?.listPrice?.amount || "";
  const currencyCode = book.saleInfo?.listPrice?.currencyCode || "";

  const [wishList, setWishList] = useState<{ title: string; authors: string | string[]; image: string }[]>([]);
  const [cart, setCart] = useState<{ title: string; authors: string | string[]; image: string; amount: string }[]>([]);

  useEffect(() => {
    const storedWishList = localStorage.getItem("wishList");
    const storedCart = localStorage.getItem("cart");

    if (storedWishList && storedCart) {
      setWishList(JSON.parse(storedWishList));
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToWishList = (title: string, authors: string | string[], image: string) => {
    if (!wishList.some((item) => item.title === title)) {
      setWishList((prevWishList) => {
        const newWishList = [...prevWishList, { title, authors, image }];
        localStorage.setItem("wishList", JSON.stringify(newWishList));
        return newWishList;
      });
    }
  };

  const addToCart = (title: string, authors: string | string[], image: string, amount: string, currencyCode: string) => {
    if (!cart.some((item) => item.title === title)) {
      setCart((prevCart) => {
        const newCart = [...prevCart, { title, authors, image, amount, currencyCode }];
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      });
    }
  };

  return (
    <div className="flex justify-start my-10">
      <BookDetails
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
        addToWishList={() => addToWishList(book.volumeInfo.title, book.volumeInfo.authors, thumbnail)}
        addToCart={() => addToCart(book.volumeInfo.title, book.volumeInfo.authors, thumbnail, amount, currencyCode)}
      />
    </div>
  );
};

export default BookOverview;
