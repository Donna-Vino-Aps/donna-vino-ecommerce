import React, { useEffect, useState } from "react";
import FilterDropdown from "./FilterDropdown";
import useIsMobile from "@/hooks/useIsMobile";
import ModalFilterDropdown from "./ModalFilterDropdown";
import PropTypes from "prop-types";

const FilterSelector = ({ isFilterModalOpen }) => {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile(768);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filterMockData = [
    {
      variant: "regular",
      title: "Wine Type",
      options: ["Red", "White", "Rosé", "Sparkling"],
    },
    {
      variant: "regular",
      title: "Grape Type",
      options: ["Pinot Noir", "Malbec", "Primitivo"],
    },
    {
      variant: "regular",
      title: "Region",
      options: ["Puglia", "Veneto", "Piedmont", "Abruzzo"],
    },
    {
      variant: "price",
      title: "Price Range",
    },
  ];
  const filterData = filterMockData;

  if (!isMounted) return null;

  return (
    <div className="ml-10 flex flex-col gap-3">
      {filterData.map((filter) => (
        <div key={filter.title}>
          {isMobile && isFilterModalOpen ? (
            <ModalFilterDropdown filter={filter} />
          ) : (
            <FilterDropdown filter={filter} />
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterSelector;

FilterSelector.propTypes = {
  isFilterModalOpen: PropTypes.func.isRequired,
};
