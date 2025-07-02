import React, { useState } from "react";
import Image from "next/image";
import DualRangeSlider from "./DualRangeSlider";
import PropTypes from "prop-types";

const FilterDropdown = ({ filter }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedMinimum, setSelectedMinimum] = useState(1);
  const [selectedMaximum, setSelectedMaximum] = useState(2000);
  return (
    <div className="flex flex-col gap-1">
      <div
        className={`flex cursor-pointer items-center justify-between px-3 md:px-5 ${isFilterOpen ? "rounded-t-lg" : "rounded-lg"} h-[3.75rem] w-[19.5rem] shadow-lg md:w-[26rem]`}
        onClick={() => setIsFilterOpen((prev) => !prev)}
      >
        <p className="font-barlow text-headlineSmall font-normal text-tertiary2-darker md:text-titleLarge">
          {filter.title}
        </p>
        <Image
          src={
            isFilterOpen ? "/icons/chevron-up.svg" : "/icons/chevron-down.svg"
          }
          alt={isFilterOpen ? "Close filter dropdown" : "Open filter dropdown"}
          width={28}
          height={28}
          className="h-7 w-7"
        />
      </div>
      {isFilterOpen &&
        (filter.variant === "regular" ? (
          <div className="mb-2 h-auto gap-3 rounded-b-lg py-3 shadow-lg">
            {filter.map((option, index) => (
              <div
                key={index}
                className="flex flex-row items-center justify-start px-3 py-1"
              >
                <input
                  type="checkbox"
                  className=" h-[2.125rem] w-[2.125rem] rounded-lg border-others-bordergray"
                ></input>
                <p className="ml-3 text-bodyLarge">{option}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-[8.375rem] flex-col rounded-b-lg shadow-lg md:h-[10.5rem]">
            <div className="flex justify-between px-12 py-8">
              <div className="flex flex-col">
                <p className="text-titleSmall text-others-gray">
                  Minimum Price
                </p>
                <p className="text-labelXLarge text-others-dark">
                  {selectedMinimum.toFixed(2).replace(".", ",")} kr
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-titleSmall text-others-gray">
                  Maximum Price
                </p>
                <p className="text-labelXLarge text-others-dark">
                  {selectedMaximum.toFixed(2).replace(".", ",")} kr
                </p>
              </div>
            </div>
            <DualRangeSlider
              min={1}
              max={2000}
              selectedMinimum={selectedMinimum}
              selectedMaximum={selectedMaximum}
              setSelectedMinimum={setSelectedMinimum}
              setSelectedMaximum={setSelectedMaximum}
            />
          </div>
        ))}
    </div>
  );
};

export default FilterDropdown;

FilterDropdown.propTypes = {
  isFilterOpen: PropTypes.func.isRequired,
  setIsFilterOpen: PropTypes.func.isRequired,
  selectedMinimum: PropTypes.number.isRequired,
  selectedMaximum: PropTypes.number.isRequired,
  setSelectedMinimum: PropTypes.func.isRequired,
  setSelectedMaximum: PropTypes.func.isRequired,
  step: PropTypes.number,
  filter: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantitySelected: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
