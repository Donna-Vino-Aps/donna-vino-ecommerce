import React from "react";
import Image from "next/image";

const SearchIcon = () => {
  return (
    <div
      className={`mx-4 flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-lg md:mx-6 md:h-[2.875rem] md:w-[3.086rem]`}
    >
      <Image
        src="/icons/search-alt.svg"
        alt="Search icon"
        width={23.62}
        height={22}
        className="h-[26.78px] md:h-[22px] md:w-[23.62px]"
      />
    </div>
  );
};

export default SearchIcon;
