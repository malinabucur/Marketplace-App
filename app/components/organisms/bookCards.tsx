import Image from "next/image";
import CartIcon from "../atoms/cart";
import React, { useState } from "react";
import { BookCardProps } from "../interfaces/IBookCardProps";
import { Book } from "../interfaces/IBook";
import { searchBookById } from "../services/bookService";
import Modal from "../molecules/modal";
import SuccessAlert from "../atoms/alert";

const BookCards: React.FC<BookCardProps> = ({ id, image, title, authors, publishedDate, amount, currencyCode, addToCart }) => {
  const [selectedBook, setSelectedBook] = useState<Book>();
  const [book, setBook] = useState<Book>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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

  const handleAddToCart = () => {
    addToCart(id, title, Array.isArray(authors) ? authors.join(", ") : authors, image, amount, currencyCode);

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <>
      <div className="flex flex-col bg-white rounded-lg shadow-xl border-2 border-[#D3D3D3] w-[15rem] h-[35rem] mx-12 mb-6">
        <button onClick={handleClick} type="button" data-twe-toggle="BookModal" data-twe-target="#BookModal" data-twe-ripple-init>
          <div className="h-[22rem] overflow-hidden ">
            <Image src={image} alt="Book Cover Image" width={240} height={100} />
          </div>
        </button>
        <div className="text-start text-black text-base ml-1 h-[7rem]">
          <p className="font-semibold">{title || "-"}</p>
          <p>{Array.isArray(authors) ? authors.join(", ") : authors || "-"}</p>
          <p>{publishedDate || "-"}</p>
        </div>
        <hr className="h-px my-2 bg-gray-500 border-0" />
        <div className="flex flex-col text-black justify-center mb-3">
          <p className="text-center">
            {amount} {currencyCode}
          </p>
          <button className="flex justify-center mt-2" onClick={handleAddToCart}>
            <CartIcon />
            <p className="ml-2">Add to cart</p>
          </button>
        </div>
      </div>
      {isModalOpen && selectedBook && <Modal book={selectedBook} onClose={closeModal} show={isModalOpen} />}
      {showAlert && <SuccessAlert message={"Successfully added to cart!"} />}
    </>
  );
};

export default BookCards;
