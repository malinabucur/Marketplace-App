import { Dispatch, SetStateAction } from "react";
import { Book } from "./IBook";

export interface HeaderProps {
  updateBooks: Dispatch<SetStateAction<Book[]>>;
}

export interface HeaderState {
  books: Book[];
  searchField: string;
}
