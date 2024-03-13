import React, { useEffect, useState } from "react";
import { SortManagerProps } from "../interfaces/ISortManagerProps";

const SortManager: React.FC<SortManagerProps> = ({ sort, handleSort }) => {
  const [selectedSort, setSelectedSort] = useState(sort);

  useEffect(() => {
    setSelectedSort(sort);
  }, [sort]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedSort(selectedValue);
    handleSort(e);
  };

  return (
    <div className="flex justify-end bg-white text-black text-md px-16">
      <label>
        Sort by:
        <select className="border-2 border-black rounded-md mx-2 px-2 py-0.5" value={selectedSort} onChange={handleChange}>
          <option value="None">None</option>
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
        </select>
      </label>
    </div>
  );
};

export default SortManager;
