import React from "react";
import Image from "next/image";
import FilterSelector from "./FilterSelector";
import PropTypes from "prop-types";

const FilterModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-60 transition-opacity duration-300">
      <div
        className={`relative top-[14rem] h-full w-full transform overflow-y-auto rounded-lg bg-white p-7 shadow-lg transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <Image
          src="/icons/Handle.svg"
          alt="handle icon"
          width={30}
          height={4}
          className="relative bottom-3 mx-auto h-1 w-[30px]"
        />
        <p className="mb-4 mt-5 text-headlineSmall">Filter by:</p>
        <button onClick={onClose} className="absolute right-4 top-4">
          <Image
            src="/icons/close.svg"
            alt="Close"
            width={24}
            height={24}
            className="relative right-1 top-1 h-6 w-6"
          />
        </button>
        <div className="ml-2">
          <FilterSelector isFilterModalOpen={isOpen} />
        </div>
      </div>
    </div>
  );
};

export default FilterModal;

FilterModal.propTypes = {
  isOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
