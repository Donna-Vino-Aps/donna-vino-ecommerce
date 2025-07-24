import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import useIsMobile from "@/hooks/useIsMobile";
import SearchButtonFilter from "./SearchButtonFilter";
import SortBy from "../FilterSelector/SortBy";
import { usePreSaleWines } from "@/context/PreSaleWinesContext";

const SearchBar = () => {
  const isMobile = useIsMobile(768);
  const { wines, searchQuery, setSearchQuery } = usePreSaleWines();
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // search suggestions logic
  useEffect(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (trimmed.length > 0) {
      const allTitles = wines
        .filter((wine) => wine.title?.toLowerCase().includes(trimmed))
        .map((wine) => wine.title);

      const uniqueSuggestions = [...new Set(allTitles)].slice(0, 5);
      setSearchSuggestions(uniqueSuggestions);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery, wines]);

  const handleSearch = () => {
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="flex justify-center">
      <div
        className={`relative flex items-center justify-between rounded-lg border border-tertiary1-light focus:outline-none md:mx-7 ${isMobile ? "h-auto w-[17rem]" : "h-[5.625rem] w-full"}`}
      >
        {!isMobile && <SortBy />}
        <div className="relative w-full max-w-xs md:max-w-none">
          <input
            type="text"
            value={searchQuery}
            onFocus={() => {
              if (searchQuery && searchSuggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            onChange={(e) => {
              setSearchQuery(e.target.value.trimStart());
              setShowSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className={`rounded-md bg-white text-sm text-tertiary2-darker placeholder-gray-400 focus:outline-none px-3 ${
              isMobile
                ? "h-10 w-full pr-8"
                : "text-bodyLarge h-[50%] w-[60%] md:w-[70%] pr-10"
            }`}
            placeholder={isMobile ? "Search any wine" : ""}
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 "
              aria-label="Clear search"
            >
              <FiX className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          )}
        </div>

        {!isMobile && <SearchButtonFilter onClick={handleSearch} />}

        {/* Dropdown for suggestions */}
        {showSuggestions && searchSuggestions.length > 0 && (
          <ul className="absolute left-0 top-full z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-md">
            {searchSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setSearchQuery(suggestion);
                  setShowSuggestions(false);
                }}
                className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      {isMobile && <SearchButtonFilter onClick={handleSearch} />}
    </div>
  );
};

export default SearchBar;
