import React, { ChangeEvent, Component, Dispatch, SetStateAction } from "react";
import CartIcon from "../atoms/cart";
import FavouritesIcon from "../atoms/heart";
import SearchBar from "./searchBar";
import { searchBookById, searchBookByTitle } from "../services/bookService";
import { Book } from "../interfaces/IBook";
import { HeaderProps, HeaderState } from "../interfaces/IHeaderProps";
import WishListModal from "./wishListModal";
import CartModal from "./cartModal";
import Modal from "./modal";

class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = { books: [], searchField: "", wishList: [], showWishListModal: false, cart: [], showCartModal: false, selectedBook: null, showBookModal: false };
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

  toggleBookModal = () => {
    this.setState((prevState) => ({ showBookModal: !prevState.showBookModal }));
  };

  handleItemClick = async (item: any) => {
    try {
      const bookData = await searchBookById(item.id);
      this.setState({ selectedBook: bookData });
    } catch (error) {
      console.error("Error handling click:", error);
    }
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
              <WishListModal onClose={this.toggleWishListModal} wishList={this.state.wishList}>
                {this.state.wishList.map((item, index) => (
                  <div key={index} onClick={() => this.handleItemClick(item)} className="flex py-3 cursor-pointer">
                    <div>
                      <img src={item.image} alt={item.title} className="w-20 h-28 inline-block mr-2" />
                    </div>
                    <div className="flex flex-col text-black">
                      <span className="text-xl font-medium">{item.title}</span>
                      <span className="text-lg font-base">{Array.isArray(item.authors) ? item.authors.join(", ") : item.authors}</span>
                    </div>
                  </div>
                ))}
              </WishListModal>
            )}
            {this.state.selectedBook && <Modal book={this.state.selectedBook} onClose={this.toggleBookModal} show={this.state.showBookModal} />}
          </div>
          <button onClick={this.toggleCartModal}>
            <CartIcon />
          </button>
          <div className="content-center">
            {this.state.showCartModal && (
              <CartModal onClose={this.toggleCartModal} cart={this.state.cart}>
                {this.state.cart.map((item, index) => (
                  <div key={index} onClick={() => this.handleItemClick(item)} className="flex py-3 cursor-pointer">
                    <div>
                      <img src={item.image} alt={item.title} className="w-20 h-28 inline-block mr-2" />
                    </div>
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
            {this.state.selectedBook && <Modal book={this.state.selectedBook} onClose={this.toggleBookModal} show={this.state.showBookModal} />}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
