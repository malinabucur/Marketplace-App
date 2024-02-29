import Image from "next/image";
import CartIcon from "../atoms/cart";
export default function Cards() {
  return (
    <div className="bg-white rounded-lg shadow-xl border-2 border-[#D3D3D3] w-56 h-auto mx-10">
      <div>
        <Image src="/cover.jpg" alt="Cover Image" width={225} height={80} className="rounded-t-lg" />
      </div>
      <div className="text-black text-base ml-1">
        <p>Title:</p>
        <p>Author:</p>
        <p>Release date:</p>
      </div>
      <div className="flex text-black justify-center my-3 ">
        <button className="flex justify-center hover:bg-black hover:text-white">
          <CartIcon />
          <p className="ml-2">Add to cart</p>
        </button>
      </div>
    </div>
  );
}
