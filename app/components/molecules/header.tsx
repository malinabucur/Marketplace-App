import React, { ChangeEvent, Component } from "react";
import CartIcon from "../atoms/cart";
import FavouritesIcon from "../atoms/heart";
import SearchBar from "./searchBar";
import { searchBookById, searchBookByTitle } from "../services/bookService";
import { Book } from "../interfaces/IBook";
import { HeaderProps, HeaderState } from "../interfaces/IHeaderProps";
import WishListModal from "./wishListModal";
import CartModal from "./cartModal";
import Modal from "./modal";
import { RemoveIcon } from "../atoms/remove";

class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      books: [],
      searchField: "",
      wishList: [],
      showWishListModal: false,
      cart: [],
      showCartModal: false,
      selectedBook: null,
      showBookModal: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

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
    if (wishList) {
      this.setState({ wishList: JSON.parse(wishList) });
    }
    if (cart) {
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

  removeFromCart = (id: string) => {
    const updatedCart = this.state.cart.filter((item) => item.id !== id);
    this.setState({ cart: updatedCart });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  removeFromWishList = (id: string) => {
    const updatedWishList = this.state.wishList.filter((item) => item.id !== id);
    this.setState({ wishList: updatedWishList });

    localStorage.setItem("wishList", JSON.stringify(updatedWishList));
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
                {this.state.wishList.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div onClick={() => this.handleItemClick(item)} className="flex py-3 cursor-pointer">
                      <div>
                        <img src={item.image} alt={item.title} className="w-20 h-28 inline-block mr-2" />
                      </div>
                      <div className="flex flex-col text-black">
                        <span className="text-xl font-medium">{item.title}</span>
                        <span className="text-lg font-base">{Array.isArray(item.authors) ? item.authors.join(", ") : item.authors}</span>
                      </div>
                    </div>
                    <div>
                      {" "}
                      <button onClick={() => this.removeFromWishList(item.id)} className="mx-4 py-3" title="Remove from wish list">
                        <RemoveIcon />
                      </button>
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
                {this.state.cart.map((item) => (
                  <div key={item.id} className="flex justify-between ">
                    <div onClick={() => this.handleItemClick(item)} className="flex py-3 cursor-pointer">
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
                    <div className="mx-4 py-3">
                      <button onClick={() => this.removeFromCart(item.id)} title="Remove from cart">
                        <RemoveIcon />
                      </button>
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
