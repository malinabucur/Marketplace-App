import React, { useEffect, useState } from "react";
import { BookDetailsProps } from "../interfaces/IBookDetailsProps";
import Image from "next/image";
import FavouritesIcon from "../atoms/heart";

const BookDetails: React.FC<BookDetailsProps> = ({ image, title, authors, publishedDate, description, pageCount, categories, language, addToWishList }) => {
  const handleAddToWishList = async () => {
    addToWishList(title);
  };

  return (
    <div className="flex space-between w-[auto] h-[30rem] mx-12">
      <div className="h-[22rem] w-auto my-3">
        <Image src={image} alt="Book Cover Image" width={200} height={100} className="object-cover" />
      </div>

      <div className="text-black text-base mx-3 px-4">
        <div className="flex justify-between">
          <div className="py-2">
            <div className="text-3xl font-semibold">{title}</div>
            <div>{Array.isArray(authors) ? authors.join(", ") : authors || "-"}</div>
            <div>{publishedDate}</div>
          </div>
        </div>
        <hr className="h-px my-4 bg-gray-500 border-0" />
        <div className="pb-10">
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
          <div className="mt-3">
            <button className="flex items-center" onClick={handleAddToWishList}>
              <FavouritesIcon />
              Add to wish list
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
