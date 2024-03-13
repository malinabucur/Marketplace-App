import React, { useEffect, useRef, useState } from "react";
import { CategoryListProps } from "../interfaces/ICategoryListProps";
import { ArrowIcon } from "../atoms/arrow";

const CategoryList: React.FC<CategoryListProps> = ({ searchBook }) => {
  const [focusedCategory, setFocusedCategory] = useState<string | null>(null);

  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const categoryList = [
    "Drama",
    "Historical Fiction",
    "Mystery",
    "Fantasy",
    "Science Fiction",
    "Fiction",
    "Horror",
    "Thriller",
    "Crime",
    "Adventure",
    "Romance",
    "Memoir",
    "Biography",
    "Realism",
    "History",
    "Satire",
    "Nonfiction",
    "Poetry",
    "Classics",
    "Animation",
  ];

  useEffect(() => {
    setFocusedCategory(categoryList[0]);
  }, []);

  const handleCategoryClick = (category: any) => {
    searchBook(category);
    setFocusedCategory(category);
  };

  const item_width = 200;

  const handleScroll = (scrollAmount: number) => {
    const newScrollPosition = scrollPosition + scrollAmount;

    setScrollPosition(newScrollPosition);

    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="text-black m-4 flex items-center">
      <div className="flex justify-center w-14 h-10 transition-all rounded-full select-none hover:bg-[#EEE5E3] active:bg-[#EEE5E3]">
        <button
          onClick={() => {
            handleScroll(-item_width);
          }}>
          <ArrowIcon d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </button>
      </div>

      <div ref={containerRef} className="text-black m-4 overflow-x-auto relative whitespace-nowrap" style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {categoryList.map((category, index) => (
          <button
            key={index}
            className={`px-3 py-1 text-base hover:text-[#6B6B6B] hover:border-2 hover:border-[#6B6B6B] hover:rounded-md ${
              focusedCategory === category ? "border-2 border-black rounded-md bg-[#EEE5E3]" : ""
            }`}
            onClick={() => handleCategoryClick(category)}>
            {category}
          </button>
        ))}
      </div>

      <div className="flex justify-center w-14 h-10 transition-all rounded-full select-none hover:bg-[#EEE5E3] active:bg-[#EEE5E3]">
        <button
          onClick={() => {
            handleScroll(item_width);
          }}>
          <ArrowIcon d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </button>
      </div>
    </div>
  );
};

export default CategoryList;
