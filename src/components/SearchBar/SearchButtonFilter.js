import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";

const SearchButtonFilter = ({ onClick }) => {
  return (
    <button
      className={`mx-4 flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-lg bg-primary-normal md:mx-6 md:h-[2.875rem] md:w-[3.086rem]`}
      onClick={onClick}
    >
      <Image
        src="/icons/search-alt-white.svg"
        alt="Search icon"
        width={23.62}
        height={22}
        className="h-[26.78px] md:h-[22px] md:w-[23.62px]"
      />
    </button>
  );
};

SearchButtonFilter.propTypes = {
  onClick: PropTypes.func,
};

export default SearchButtonFilter;
