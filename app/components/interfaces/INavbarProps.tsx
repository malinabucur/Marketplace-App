import { Dispatch, SetStateAction } from "react";
import { Book } from "./IBook";

export interface NavbarProps {
  updateBooks: Dispatch<SetStateAction<Book[]>>;
  searchBooks: (searchField: string) => Promise<void>;
}
