import React from "react";
import Image from "next/image";

const FilterIcon = () => {
  return (
    <button
      className="flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-lg border border-tertiary1-light"
      onClick={() => setIsFilterModalOpen(true)}
    >
      <Image
        src="/icons/filterslider.svg"
        alt="Open filters"
        width={22}
        height={22}
        className="h-[22px] w-[22px]"
      />
    </button>
  );
};

export default FilterIcon;
