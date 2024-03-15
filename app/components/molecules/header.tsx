import React, { ChangeEvent, Component, Dispatch, SetStateAction } from "react";
import CartIcon from "../atoms/cart";
import FavouritesIcon from "../atoms/heart";
import SearchBar from "./searchBar";
import { searchBookByTitle } from "../services/bookService";
import { Book } from "../interfaces/IBook";
import { HeaderProps, HeaderState } from "../interfaces/IHeaderProps";
import WishListModal from "./wishListModal";

class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = { books: [], searchField: "", wishList: [], showModal: false, selectedBookTitle: "" };
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

  searchBookByTitle = async (e: React.FormEvent) => {
    e.preventDefault();

    const { searchField } = this.state;

    if (searchField.trim() !== "") {
      const books = await searchBookByTitle(searchField);
      this.props.updateBooks(books);
      this.props.updateSearchField(searchField);

      setTimeout(() => {
        this.props.updateSearchField("");
      }, 50);
    }
  };

  componentDidMount() {
    const wishList = localStorage.getItem("wishList");
    if (wishList) {
      this.setState({ wishList: JSON.parse(wishList) });
    }
  }

  addToWishList = (title: string) => {
    if (!this.state.wishList.includes(title) && title !== null) {
      const updatedWishList = [...this.state.wishList, title];
      this.setState({ wishList: updatedWishList });
      localStorage.setItem("wishList", JSON.stringify(updatedWishList));
    }
  };

  toggleModal = () => {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  };

  handleBookClick = (title: string) => {
    console.log("Book clicked:", title);
  };

  render() {
    return (
      <div className="flex justify-end items-center">
        <SearchBar searchBookByTitle={this.searchBookByTitle} handleSearch={this.handleSearch} searchField={this.state.searchField} />
        <div className="flex justify-center items-center mt-2 ml-2">
          <button onClick={this.toggleModal}>
            <FavouritesIcon />
          </button>
          <div className="text-black content-center">
            {this.state.showModal && (
              <WishListModal onClose={this.toggleModal} wishList={this.state.wishList} onBookClick={this.handleBookClick}>
                {this.state.wishList.map((title, index) => (
                  <li key={index} onClick={() => this.handleBookClick(title)}>
                    {title}
                  </li>
                ))}
              </WishListModal>
            )}
          </div>
          <CartIcon />
        </div>
      </div>
    );
  }
}

export default Header;
