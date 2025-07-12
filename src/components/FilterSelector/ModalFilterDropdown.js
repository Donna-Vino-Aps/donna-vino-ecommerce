import React, { useState } from "react";
import Image from "next/image";
import DualRangeSlider from "./DualRangeSlider";
import PropTypes from "prop-types";
import CheckboxField from "../FormFields/CheckboxField";
import { usePreSaleWines } from "@/context/PreSaleWinesContext";
import { useLanguage } from "@/context/LanguageContext";

const ModalFilterDropdown = ({ filter }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { setActiveFilters, activeFilters } = usePreSaleWines();
  const [selectedOptions, setSelectedOptions] = useState(
    activeFilters.find((f) => f.key == filter.key)?.options ?? [],
  );
  const { translations } = useLanguage();

  const handleCheckboxChange = (option) => {
    const nextSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    setSelectedOptions(nextSelectedOptions);

    setActiveFilters((prev) => {
      // optionally replace existing entry for this filter
      const filtered = prev.filter((f) => f.key !== filter.key);
      if (nextSelectedOptions.length > 0) {
        return [...filtered, { ...filter, options: nextSelectedOptions }];
      }
      return filtered; // if nothing is selected, remove this filter
    });
  };

  const bottlePriceFilter = activeFilters.find((f) => f.key === "bottlePrice");

  const minPrice = bottlePriceFilter?.min ?? filter.min;
  const maxPrice = bottlePriceFilter?.max ?? filter.max;

  return (
    <div className="flex flex-col">
      <div
        className={`flex cursor-pointer items-center justify-between px-5 ${isFilterOpen ? "rounded-t-lg" : "rounded-lg"} h-[3.75rem] w-full`}
        onClick={() => setIsFilterOpen((prev) => !prev)}
      >
        <p className="font-barlow text-headlineSmall font-normal text-others-dark md:text-titleLarge">
          {translations[`presale-filter.${filter.key}`]}
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
                  {translations["presale-filter.minPrice"]}
                </p>
                <p className="text-labelXLarge text-others-dark">
                  {minPrice.toFixed(2).replace(".", ",")} kr
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-titleSmall text-others-gray">
                  {translations["presale-filter.minPrice"]}
                </p>
                <p className="text-labelXLarge text-others-dark">
                  {maxPrice.toFixed(2).replace(".", ",")} kr
                </p>
              </div>
            </div>
            <DualRangeSlider
              min={filter.min ?? 1}
              max={filter.max ?? 2000}
              step={1}
              selectedMinimum={minPrice}
              selectedMaximum={maxPrice}
              setSelectedMinimum={(newMin) => {
                setActiveFilters((prev) => {
                  const prevBottlePrice = prev.find(
                    (f) => f.key == "bottlePrice",
                  );
                  const filtered = prev.filter((f) => f.key !== filter.key);
                  return [
                    ...filtered,
                    {
                      ...filter,
                      min: newMin,
                      max: prevBottlePrice?.max ?? filter.max,
                    },
                  ];
                });
              }}
              setSelectedMaximum={(newMax) => {
                setActiveFilters((prev) => {
                  const prevBottlePrice = prev.find(
                    (f) => f.key == "bottlePrice",
                  );
                  const filtered = prev.filter((f) => f.key !== filter.key);
                  return [
                    ...filtered,
                    {
                      ...filter,
                      min: prevBottlePrice?.min ?? filter.min,
                      max: newMax,
                    },
                  ];
                });
              }}
            />
          </div>
        ))}
    </div>
  );
};

export default ModalFilterDropdown;

ModalFilterDropdown.propTypes = {
  filter: PropTypes.shape({
    variant: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
    min: PropTypes.number,
    max: PropTypes.number,
    key: PropTypes.string.isRequired,
  }).isRequired,
};
