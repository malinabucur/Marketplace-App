import { Dispatch, SetStateAction } from "react";
import { Book } from "./IBook";

export interface HeaderProps {
  updateBooks: Dispatch<SetStateAction<Book[]>>;
  updateSearchField: (value: string) => void;
}

export interface HeaderState {
  books: Book[];
  searchField: string;
  wishList: { title: string; authors: string | string[]; image: string }[];
  showWishListModal: boolean;
  selectedBookTitle: string;
  showCartModal: boolean;
  cart: { title: string; authors: string | string[]; image: string; amount: string; currencyCode: string }[];
}
