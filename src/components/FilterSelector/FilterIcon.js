import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";

const FilterIcon = ({ onClick }) => {
  return (
    <button
      className="flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-lg border border-tertiary1-light"
      onClick={onClick}
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

FilterIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};
