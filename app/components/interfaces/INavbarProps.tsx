import { Dispatch, SetStateAction } from "react";
import { Book } from "./IBook";

export interface NavbarProps {
  updateBooks: Dispatch<SetStateAction<Book[]>>;
  updateSearchField: (value: string) => void;
  searchBooks: (searchField: string) => Promise<void>;
}
