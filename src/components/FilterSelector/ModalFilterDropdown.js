import React, { useState } from "react";
import Image from "next/image";
import DualRangeSlider from "./DualRangeSlider";
import PropTypes from "prop-types";
import CheckboxField from "../FormFields/CheckboxField";

const ModalFilterDropdown = ({ filter }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedMinimum, setSelectedMinimum] = useState(1);
  const [selectedMaximum, setSelectedMaximum] = useState(2000);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option],
    );
  };
  return (
    <div className="flex flex-col">
      <div
        className={`flex cursor-pointer items-center justify-between px-5 ${isFilterOpen ? "rounded-t-lg" : "rounded-lg"} h-[3.75rem] w-full`}
        onClick={() => setIsFilterOpen((prev) => !prev)}
      >
        <p className="font-barlow text-headlineSmall font-normal text-others-dark md:text-titleLarge">
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
          <div className="h-auto gap-3 border-t border-tertiary1-light py-3">
            {filter.options.map((option) => (
              <div
                key={option}
                className="flex flex-row items-center justify-start px-3 py-1"
              >
                <CheckboxField
                  name={option}
                  label={option}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  isFilter={true}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-[8.375rem] flex-col rounded-b-lg border-t border-tertiary1-light">
            <div className="flex justify-between px-8 py-8">
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

export default ModalFilterDropdown;

ModalFilterDropdown.propTypes = {
  isFilterModalOpen: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    variant: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
