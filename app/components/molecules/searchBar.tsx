import { ChangeEvent } from "react";
import Input from "../atoms/input";
import SearchIcon from "../atoms/search";

interface SearchBarProps {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
  return (
    <form className="flex items-center">
      <div className="flex justify-between text-black text-lg border-b-2 border-[#6B6B6B] m-3 px-2 w-full">
        <Input placeholder="Search..." onChange={handleSearch} />
        <button type="submit">
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
