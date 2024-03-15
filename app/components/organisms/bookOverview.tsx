import React, { useEffect, useState } from "react";
import BookDetails from "./bookDetails";
import { Book } from "../interfaces/IBook";

const BookOverview: React.FC<{ book: Book }> = ({ book }) => {
  const thumbnail = book.volumeInfo?.imageLinks?.thumbnail || "";

  const [wishList, setWishList] = useState<string[]>([]);

  useEffect(() => {
    const storedWishList = localStorage.getItem("wishList");
    if (storedWishList) {
      setWishList(JSON.parse(storedWishList));
    }
  }, []);

  const addToWishList = (title: string) => {
    if (!wishList.includes(title) && title != null) {
      setWishList((prevWishList) => {
        const newWishList = [...prevWishList, title];
        localStorage.setItem("wishList", JSON.stringify(newWishList));
        return newWishList;
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
        addToWishList={addToWishList}
      />
    </div>
  );
};

export default BookOverview;
