import React from "react";
import { BookOverviewProps } from "../interfaces/IBookOverviewProps";
import BookDetails from "./bookDetails";

const BookOverview: React.FC<BookOverviewProps> = ({ books }) => {
  return (
    <div className="flex flex-wrap justify-center my-4">
      {books.map((book, i: number) => {
        const thumbnail = book.volumeInfo?.imageLinks?.thumbnail || "";

        return (
          <BookDetails
            key={i}
            image={thumbnail}
            title={book.volumeInfo.title}
            authors={book.volumeInfo.authors}
            publishedDate={book.volumeInfo.publishedDate}
            description={book.volumeInfo.description}
            pageCount={book.volumeInfo.pageCount}
            categories={book.volumeInfo.categories}
            language={book.volumeInfo.language}
          />
        );
      })}
    </div>
  );
};

export default BookOverview;
