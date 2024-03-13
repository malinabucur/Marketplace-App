import { Book } from "./IBook";

export interface BookCategoriesListProps {
  updateBooks: (category: string) => Promise<void>;
}

export interface BookCategoriesListState {
  books: Book[];
}
