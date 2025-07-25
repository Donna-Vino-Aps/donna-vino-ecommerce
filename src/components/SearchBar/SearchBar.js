import React, { useState, useEffect } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import SearchButtonFilter from "./SearchButtonFilter";
import SortBy from "../FilterSelector/SortBy";

const SearchBar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile(768);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex justify-center">
      <div
        className={`flex items-center justify-between rounded-lg border border-tertiary1-light focus:outline-none md:mx-7 ${isMobile ? "h-[3.5rem] w-[13rem] xs:w-[17rem]" : "h-[5.625rem] w-full"}`}
      >
        {!isMobile && <SortBy />}
        <input
          type="text"
          className="ml-6 h-[75%] w-[90%] text-bodyLarge text-tertiary2-darker focus:outline-none md:h-[50%] md:w-[50%] lg:h-[50%] lg:w-[70%]"
          placeholder={isMobile ? "Search any wine" : ""}
        ></input>
        {!isMobile && <SearchButtonFilter />}
      </div>
      {isMobile && <SearchButtonFilter />}
    </div>
  );
};

export default SearchBar;
