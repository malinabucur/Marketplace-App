import { Dispatch, SetStateAction } from "react";
import { Book } from "./IBook";
import { VolumeInfo } from "./IVolumeInfo";
import { SaleInfo } from "./ISaleInfo";

export interface HeaderProps {
  updateBooks: Dispatch<SetStateAction<Book[]>>;
  updateSearchField: (value: string) => void;
}

export interface HeaderState {
  books: Book[];
  searchField: string;
  wishList: { id: string; title: string; authors: string | string[]; image: string }[];
  showWishListModal: boolean;
  showCartModal: boolean;
  cart: { id: string; title: string; authors: string | string[]; image: string; amount: string; currencyCode: string; volumeInfo: VolumeInfo; publishedDate: string; saleInfo: SaleInfo }[];
  selectedBook: Book | null;
  showBookModal: boolean;
}
