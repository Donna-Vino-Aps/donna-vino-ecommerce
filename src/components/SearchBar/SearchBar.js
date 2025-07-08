import React, { useState, useEffect } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import SearchButtonFilter from "./SearchButtonFilter";

const SearchBar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile(768);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={`flex justify-between items-center mx-6 border border-tertiary1-light rounded-lg ${isMobile ? "h-[3.5rem]" : "w-full h-[5.625rem]"}`}
    >
      <p className="text-bodyLarge text-tertiary2-darker mx-4">
        Search any wine
      </p>
      {!isMobile && <SearchButtonFilter />}
    </div>
  );
};

export default SearchBar;
