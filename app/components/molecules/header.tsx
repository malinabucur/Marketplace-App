"use client";

import React, { ChangeEvent, Component } from "react";
import CartIcon from "../atoms/cart";
import FavouritesIcon from "../atoms/heart";
import SearchBar from "./searchBar";
import request from "superagent";

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

  searchBook = (e: React.FormEvent) => {
    e.preventDefault();

    request
      .get("https://www.googleapis.com/books/v1/volumes")
      .query({ q: this.state.searchField })
      .then((data) => {
        console.log(data);
      });
  };

  handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchField: e.target.value });
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
