import React from "react";
import { SortManagerProps } from "../interfaces/ISortManagerProps";

const SortManager: React.FC<SortManagerProps> = ({ sort, handleSort }) => {
  return (
    <div className="flex justify-end bg-white text-black text-md px-16">
      <label>
        Sort by:
        <select className="border-2 border-black rounded-md mx-2 px-2 py-0.5" defaultValue="None" value={sort} onChange={handleSort}>
          <option value="None">None</option>
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
        </select>
      </label>
    </div>
  );
};

export default SortManager;
