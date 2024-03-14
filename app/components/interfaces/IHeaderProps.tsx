import { Dispatch, SetStateAction } from "react";
import { Book } from "./IBook";

export interface HeaderProps {
  updateBooks: Dispatch<SetStateAction<Book[]>>;
  updateSearchField: (value: string) => void;
}

export interface HeaderState {
  books: Book[];
  searchField: string;
}
