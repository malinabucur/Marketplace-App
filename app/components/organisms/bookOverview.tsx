import React from "react";
import BookDetails from "./bookDetails";
import { Book } from "../interfaces/IBook";

const BookOverview: React.FC<{ book: Book }> = ({ book }) => {
  const thumbnail = book.volumeInfo?.imageLinks?.thumbnail || "";

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
      />
    </div>
  );
};

export default BookOverview;
