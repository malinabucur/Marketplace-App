import React, { ChangeEvent, useState } from "react";
import Input from "../atoms/input";
import SearchIcon from "../atoms/search";
import { SearchBarProps } from "../interfaces/ISearchBarProps";

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch, searchBookByTitle, searchField }) => {
  const [localSearchField, setLocalSearchField] = useState(searchField);

  const handleLocalSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchField(e.target.value);
    handleSearch(e);
  };

  const handleLocalSearchBook = async (e: React.FormEvent) => {
    e.preventDefault();
    await searchBookByTitle(e);

    setTimeout(() => {
      setLocalSearchField("");
    }, 50);
  };

  return (
    <form className="flex items-center border-b-2 border-[#6B6B6B]" onSubmit={handleLocalSearchBook}>
      <div className="flex justify-between items-center text-black text-lg pb-1 px-2 w-full">
        <Input placeholder="Search..." value={localSearchField} onChange={handleLocalSearch} />
        <button type="submit">
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
