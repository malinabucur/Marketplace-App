import CartIcon from "../atoms/cart";
import FavouritesIcon from "../atoms/heart";
import Logo from "../molecules/logo";

export default function Navbar() {
  return (
    <div className="flex mx-1 justify-between rounded-lg border-4 border-[#D3D3D3] drop-shadow-xl bg-black">
      <div className="mx-4">
        <Logo />
      </div>
      <div className="flex items-center mr-8">
        <FavouritesIcon fillColor="white" />
        <CartIcon fillColor="white" />
      </div>
    </div>
  );
}
