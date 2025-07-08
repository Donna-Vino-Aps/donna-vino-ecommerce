import React from "react";
import Image from "next/image";

const SearchButtonFilter = () => {
  return (
    <button
      className={`flex h-[3.5rem] w-[3.5rem] md:h-[2.875rem] md:w-[2.875rem] items-center justify-center rounded-lg bg-primary-normal mx-4 md:mx-6`}
      onClick={() => setIsFilterModalOpen(true)}
    >
      <Image
        src="/icons/search-alt-white.svg"
        alt="Search icon"
        width={22}
        height={22}
        className="h-[22px] w-[22px]"
      />
    </button>
  );
};

export default SearchButtonFilter;
