import CartIcon from "../atoms/cart";
import FavouritesIcon from "../atoms/heart";
import SearchBar from "./searchBar";

export default function Header() {
  return (
    <div className="flex justify-end items-center">
      <SearchBar />
      <FavouritesIcon />
      <CartIcon />
    </div>
  );
}
