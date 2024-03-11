import Image from "next/image";
import CartIcon from "../atoms/cart";
import React, { useState } from "react";
import { BookCardProps } from "../interfaces/IBookCardProps";
import { Book } from "../interfaces/IBook";
import { searchBookById } from "../services/bookService";
import Modal from "../molecules/modal";

const BookCards: React.FC<BookCardProps> = ({ id, image, title, authors, publishedDate, volumeInfo }) => {
  const [selectedBook, setSelectedBook] = useState<Book>();
  const [book, setBook] = useState<Book>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = async () => {
    try {
      const bookData = await searchBookById(id);
      setBook(bookData);
      setSelectedBook(bookData);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error handling click:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={handleClick} type="button" data-twe-toggle="BookModal" data-twe-target="#BookModal" data-twe-ripple-init>
        <div className="flex flex-col bg-white rounded-lg shadow-xl border-2 border-[#D3D3D3] w-60 h-[30rem] mx-12 mb-6 ">
          <div className="h-[22rem] overflow-hidden ">
            <Image src={image} alt="Book Cover Image" width={240} height={100} />
          </div>
          <div className="text-start text-black text-base ml-1">
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
      </button>
      {isModalOpen && selectedBook && <Modal book={selectedBook} onClose={closeModal} />}
    </>
  );
};

export default BookCards;
