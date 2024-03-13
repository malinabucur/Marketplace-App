import { Component } from "react";
import { Book } from "../interfaces/IBook";
import { BookCategoriesListProps, BookCategoriesListState } from "../interfaces/IBookCategoriesListProps";
import { searchBooks } from "../services/bookService";
import CategoryList from "../organisms/categoryList";

class BookCategoriesList extends Component<BookCategoriesListProps, BookCategoriesListState> {
  constructor(props: BookCategoriesListProps) {
    super(props);
    this.state = { books: [] };
  }

  updateBooksState: React.Dispatch<React.SetStateAction<Book[]>> = (newBooks: Book[] | ((prevState: Book[]) => Book[])) => {
    this.setState((prevState) => ({
      books: typeof newBooks === "function" ? (newBooks as (prevState: Book[]) => Book[])(prevState.books) : newBooks,
    }));
  };

  searchBook = async (category: string) => {
    if (category.trim() !== "") {
      const books = await searchBooks(category);
      this.props.updateBooks(category);
      this.updateBooksState(books);
    }
  };

  render() {
    return (
      <div>
        <CategoryList searchBook={this.searchBook} />
      </div>
    );
  }
}

export default BookCategoriesList;
