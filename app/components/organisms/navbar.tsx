import Image from "next/image";
import Header from "../molecules/header";
import { Autour_One } from "next/font/google";

export default function Navbar() {
  return (
    <div className="bg-[#EEE5E3] w-full h-96">
      <div className="px-4">
        <Header />
      </div>
      <div className="flex justify-between py-[-10px]">
        <div className="px-44 my-[-30px]">
          <Image src="/accent_nav.png" alt="Navbar Image Accent" width={300} height={100} priority />
        </div>

        <div className="text-black abril-fatface-regular py-20 pr-48">
          <p className="text-5xl font-bold">Welcome to</p>
          <p className="text-7xl font-bold ml-10">ChapterCharm </p>
        </div>
      </div>
    </div>
  );
}
