import React from "react";
import BookDetails from "./bookDetails";
import { Book } from "../interfaces/IBook";

const BookOverview: React.FC<Book> = ({ volumeInfo }) => {
  const thumbnail = volumeInfo?.imageLinks?.thumbnail || "";

  return (
    <div className="flex flex-wrap justify-center my-4">
      <BookDetails
        image={thumbnail}
        title={volumeInfo.title}
        authors={volumeInfo.authors}
        publishedDate={volumeInfo.publishedDate}
        description={volumeInfo.description}
        pageCount={volumeInfo.pageCount}
        categories={volumeInfo.categories}
        language={volumeInfo.language}
      />
    </div>
  );
};

export default BookOverview;
