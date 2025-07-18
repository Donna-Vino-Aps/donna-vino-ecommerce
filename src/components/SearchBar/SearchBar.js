import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useIsMobile from "@/hooks/useIsMobile";
import SearchButtonFilter from "./SearchButtonFilter";
import SortBy from "../FilterSelector/SortBy";
import { usePreSaleWines } from "@/context/PreSaleWinesContext";

const SearchBar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile(768);
  const { wines, searchQuery, setSearchQuery } = usePreSaleWines();
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [inputText, setInputText] = useState(searchQuery);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  //search suggestions logic

  useEffect(() => {
    setInputText(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (inputText.trim() === "") {
      setSearchQuery("");
    }
  }, [inputText]);

  useEffect(() => {
    const trimmed = inputText.trim().toLowerCase();
    if (trimmed.length > 0) {
      const allTitles = wines
        .filter((wine) => wine.title?.toLowerCase().includes(trimmed))
        .map((wine) => wine.title);

      const uniqueSuggestions = [...new Set(allTitles)].slice(0, 5);
      setSearchSuggestions(uniqueSuggestions);
    } else {
      setSearchSuggestions([]);
    }
  }, [inputText, wines]);

  const handleSearch = () => {
    setSearchQuery(inputText);
  };

  if (!isMounted) return null;

  return (
    <div className="flex justify-center">
      <div
        className={`relative flex items-center justify-between rounded-lg border border-tertiary1-light focus:outline-none md:mx-7 ${isMobile ? "h-[3.5rem] w-[13rem] xs:w-[17rem]" : "h-[5.625rem] w-full"}`}
      >
        {!isMobile && <SortBy />}
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="ml-6 h-[75%] w-[90%] text-bodyLarge text-tertiary2-darker focus:outline-none md:h-[50%] md:w-[50%] lg:h-[50%] lg:w-[70%]"
          placeholder={isMobile ? "Search any wine" : ""}
        />
        {!isMobile && <SearchButtonFilter onClick={handleSearch} />}

        {/* Dropdown for suggestions */}
        {searchSuggestions.length > 0 && (
          <ul className="absolute left-0 top-full z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-md">
            {searchSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  setSearchQuery(suggestion);
                  setInputText(suggestion);
                  setSearchSuggestions([]);
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

SearchBar.propTypes = {};

export default SearchBar;
