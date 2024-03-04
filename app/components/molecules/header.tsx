import React, { ChangeEvent, Component, Dispatch, SetStateAction } from "react";
import CartIcon from "../atoms/cart";
import FavouritesIcon from "../atoms/heart";
import SearchBar from "./searchBar";
import { searchBooks } from "../services/bookService";
import { Book } from "../interfaces/IBook";
import { HeaderProps, HeaderState } from "../interfaces/IHeaderProps";

class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = { books: [], searchField: "" };
    this.handleSearch = this.handleSearch.bind(this);
  }

  updateBooksState: React.Dispatch<React.SetStateAction<Book[]>> = (newBooks: Book[] | ((prevState: Book[]) => Book[])) => {
    this.setState((prevState) => ({
      books: typeof newBooks === "function" ? (newBooks as (prevState: Book[]) => Book[])(prevState.books) : newBooks,
    }));
  };

  handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchField: e.target.value });
  };

  searchBook = async (e: React.FormEvent) => {
    e.preventDefault();

    const { searchField } = this.state;

    if (searchField.trim() !== "") {
      const books = await searchBooks(searchField);
      this.props.updateBooks(books);
    }
  };

  render() {
    return (
      <div className="flex justify-end items-center">
        <SearchBar searchBook={this.searchBook} handleSearch={this.handleSearch} />
        <FavouritesIcon />
        <CartIcon />
      </div>
    );
  }
}

export default Header;
