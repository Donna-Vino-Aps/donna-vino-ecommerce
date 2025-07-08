import React from "react";
import Image from "next/image";
import useIsMobile from "@/hooks/useIsMobile";

const SearchButtonFilter = () => {
  const isMobile = useIsMobile(768);

  return (
    <button
      className={`flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-lg bg-primary-normal mx-4`}
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
