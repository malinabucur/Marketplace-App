import React from "react";
import { BookDetailsProps } from "../interfaces/IBookDetailsProps";
import Image from "next/image";

const BookDetails: React.FC<BookDetailsProps> = ({ image, title, authors, publishedDate, description, pageCount, categories, language }) => {
  return (
    <div className="flex">
      <div className="m-6">
        <Image src={image} alt="Book Cover Image" width={400} height={300} />
      </div>

      <div className="text-black text-base m-3">
        <div>
          <div className="text-3xl font-semibold">{title}</div>
          <div>{authors}</div>
          <div>{publishedDate}</div>
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0" />
        <div>
          <div>
            <span className="font-bold">Description:</span> {description}
          </div>
          <div>
            <span className="font-bold">Page number:</span> {pageCount}
          </div>
          <div>
            <span className="font-bold">Category:</span> {categories}
          </div>
          <div>
            <span className="font-bold">Language:</span> {language}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
