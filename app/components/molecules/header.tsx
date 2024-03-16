import React, { ChangeEvent, Component, Dispatch, SetStateAction } from "react";
import CartIcon from "../atoms/cart";
import FavouritesIcon from "../atoms/heart";
import SearchBar from "./searchBar";
import { searchBookByTitle } from "../services/bookService";
import { Book } from "../interfaces/IBook";
import { HeaderProps, HeaderState } from "../interfaces/IHeaderProps";
import WishListModal from "./wishListModal";
import CartModal from "./cartModal";

class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = { books: [], searchField: "", wishList: [], showWishListModal: false, selectedBookTitle: "", cart: [], showCartModal: false };
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
    const cart = localStorage.getItem("cart");
    if (wishList && cart) {
      this.setState({ wishList: JSON.parse(wishList) });
      this.setState({ cart: JSON.parse(cart) });
    }
  }

  toggleWishListModal = () => {
    this.setState((prevState) => ({ showWishListModal: !prevState.showWishListModal }));

    const wishList = JSON.parse(localStorage.getItem("wishList") || "[]");
    this.setState({ wishList });
  };

  toggleCartModal = () => {
    this.setState((prevState) => ({ showCartModal: !prevState.showCartModal }));

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    this.setState({ cart });
  };

  handleBookClick = (title: string) => {
    console.log("Book clicked:", title);
  };

  render() {
    return (
      <div className="flex justify-end items-center">
        <SearchBar searchBookByTitle={this.searchBookByTitle} handleSearch={this.handleSearch} searchField={this.state.searchField} />
        <div className="flex justify-center items-center mt-2 ml-2">
          <button onClick={this.toggleWishListModal}>
            <FavouritesIcon />
          </button>
          <div className="text-black content-center">
            {this.state.showWishListModal && (
              <WishListModal onClose={this.toggleWishListModal} wishList={this.state.wishList} onBookClick={this.handleBookClick}>
                {this.state.wishList.map((item, index) => (
                  <div key={index} onClick={() => this.handleBookClick(item.title)} className="flex py-3">
                    <img src={item.image} alt={item.title} className="w-20 h-28 inline-block mr-2" />
                    <div className="flex flex-col text-black">
                      <span className="text-xl font-medium">{item.title}</span>
                      <span className="text-lg font-base">{Array.isArray(item.authors) ? item.authors.join(", ") : item.authors}</span>
                    </div>
                  </div>
                ))}
              </WishListModal>
            )}
          </div>
          <button onClick={this.toggleCartModal}>
            <CartIcon />
          </button>
          <div className="content-center">
            {this.state.showCartModal && (
              <CartModal onClose={this.toggleCartModal} cart={this.state.cart} onBookClick={this.handleBookClick}>
                {this.state.cart.map((item, index) => (
                  <div key={index} onClick={() => this.handleBookClick(item.title)} className="flex py-3">
                    <img src={item.image} alt={item.title} className="w-20 h-28 inline-block mr-2" />
                    <div className="flex flex-col text-black">
                      <span className="text-xl font-medium">{item.title}</span>
                      <span className="text-lg font-base">{Array.isArray(item.authors) ? item.authors.join(", ") : item.authors}</span>
                      <span className="">
                        {item.amount} {item.currencyCode}
                      </span>
                    </div>
                  </div>
                ))}
              </CartModal>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
