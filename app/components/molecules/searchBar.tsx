import Input from "../atoms/input";
import SearchIcon from "../atoms/search";

export default function SearchBar() {
  return (
    <form className="flex items-center max-w-lg mx-auto">
      <div className="flex justify-between text-black text-lg border-b-2 border-[#6B6B6B] m-3 px-2 w-full">
        <Input placeholder="Search..." />
        <button type="submit">
          <SearchIcon />
        </button>
      </div>
    </form>
  );
}
