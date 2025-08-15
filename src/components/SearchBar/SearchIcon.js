import React from "react";
import Image from "next/image";
import useIsMobile from "@/hooks/useIsMobile";

const SearchIcon = () => {
  const isMobile = useIsMobile(768);
  return (
    <div
      className={`mx-4 flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-lg md:mx-6 md:h-[2.875rem] md:w-[3.086rem]`}
    >
      {isMobile ? (
        <Image
          src="/icons/search-alt.svg"
          alt="Search icon"
          width={23.62}
          height={26.78}
          className="h-[26.78px] w-[23.62px]"
          style={{ width: "auto" }}
        />
      ) : (
        <Image
          src="/icons/search-alt.svg"
          alt="Search icon"
          width={23.62}
          height={22}
          className="h-[22px] w-[23.62px]"
          style={{ height: "auto" }}
        />
      )}
    </div>
  );
};

export default SearchIcon;
