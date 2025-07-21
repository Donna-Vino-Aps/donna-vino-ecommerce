import React, { useEffect, useState } from "react";
import FilterDropdown from "./FilterDropdown";
import useIsMobile from "@/hooks/useIsMobile";
import ModalFilterDropdown from "./ModalFilterDropdown";
import PropTypes from "prop-types";
import { usePreSaleWines } from "@/context/PreSaleWinesContext";

const FilterSelector = ({ isFilterModalOpen }) => {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile(768);
  const { availableFilters } = usePreSaleWines();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filterData = availableFilters ?? [];

  if (!isMounted) return null;

  return (
    <div
      className={`flex flex-col ${isMobile && isFilterModalOpen ? "gap-1" : "ml-3 gap-3"}`}
    >
      {filterData.map((filter) => (
        <div key={filter.key}>
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
  handleFilterChange: PropTypes.func.isRequired,
};
