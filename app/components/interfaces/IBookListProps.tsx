import { Book } from "./IBook";

export interface BookListProps {
  books: Book[];
  searchField?: string;
}
