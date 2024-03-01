"use client";

import { ChangeEvent, Component } from "react";
import CartIcon from "../atoms/cart";
import FavouritesIcon from "../atoms/heart";
import SearchBar from "./searchBar";

interface HeaderProps {
  books: string[];
  searchField: string;
}

class Header extends Component<{}, HeaderProps> {
  constructor(props: {}) {
    super(props);
    this.state = { books: [], searchField: "" };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    return (
      <div className="flex justify-end items-center">
        <SearchBar handleSearch={this.handleSearch} />
        <FavouritesIcon />
        <CartIcon />
      </div>
    );
  }
}

export default Header;
