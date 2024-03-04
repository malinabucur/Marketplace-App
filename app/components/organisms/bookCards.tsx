import Image from "next/image";
import CartIcon from "../atoms/cart";
import React from "react";
import { BookCardProps } from "../interfaces/IBookCardProps";

const BookCards: React.FC<BookCardProps> = ({ image, title, authors, publishedDate }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-xl border-2 border-[#D3D3D3] w-60 h-auto mx-12 mb-6 ">
      <div className="h-[22rem] overflow-hidden ">
        <Image src={image} alt="Book Cover Image" width={240} height={100} />
      </div>
      <div className="flex-grow text-black text-base ml-1">
        <p className="font-semibold">{title || "-"}</p>
        <p>{authors || "-"} </p>
        <p>{publishedDate || "-"}</p>
      </div>
      <hr className="h-px my-2 bg-gray-200 border-0" />
      <div className="flex text-black justify-center mb-3">
        <button className="flex justify-center">
          <CartIcon />
          <p className="ml-2">Add to cart</p>
        </button>
      </div>
    </div>
  );
};

export default BookCards;
