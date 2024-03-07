import React from "react";
import { BookDetailsProps } from "../interfaces/IBookDetailsProps";
import Image from "next/image";

const BookDetails: React.FC<BookDetailsProps> = ({ image, title, authors, publishedDate, description, pageCount, categories, language }) => {
  return (
    <div className="flex space-between">
      <div className="my-1 justify-center h-80 w-11/12">
        <Image src={image} alt="Book Cover Image" width={100} height={100} className="object-cover w-full h-full" />
      </div>

      <div className="text-black text-base mx-3 px-4">
        <div>
          <div className="text-3xl font-semibold">{title}</div>
          <div>{authors}</div>
          <div>{publishedDate}</div>
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0" />
        <div>
          <div>
            <span className="font-bold">Description: </span>
            <span dangerouslySetInnerHTML={{ __html: description }} />
          </div>
          <div className="pt-3">
            <span className="font-bold">Page number:</span> {pageCount}
          </div>
          <div>
            <span className="font-bold">Category:</span> {categories}
          </div>
          <div>
            <span className="font-bold">Language:</span> <span className="uppercase">{language}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
