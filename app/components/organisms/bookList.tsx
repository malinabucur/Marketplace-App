import BookCards from "./bookCards";
import React from "react";
import { BookListProps } from "../interfaces/IBookListProps";

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div className="flex flex-wrap justify-center my-4">
      {books.map((book, i: number) => {
        const thumbnail = book.volumeInfo?.imageLinks?.thumbnail || "";

        return (
          <BookCards
            key={i}
            id={book.id}
            image={thumbnail}
            title={book.volumeInfo.title}
            authors={book.volumeInfo.authors}
            publishedDate={book.volumeInfo.publishedDate}
            volumeInfo={book.volumeInfo}
          />
        );
      })}
    </div>
  );
};

export default BookList;
