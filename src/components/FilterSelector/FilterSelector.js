import React from "react";
import FilterDropdown from "./FilterDropdown";
import SortBy from "./SortBy";
import useIsMobile from "@/hooks/useIsMobile";

const FilterSelector = (isFilterModalOpen) => {
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
  const isMobile = useIsMobile(768);

  return (
    <div className="flex flex-col gap-3">
      {!isMobile && <SortBy />}
      {filterData.map((filter) => (
        <div key={filter.title}>
          <FilterDropdown
            filter={filter}
            isFilterModalOpen={isFilterModalOpen}
          />
        </div>
      ))}
    </div>
  );
};

export default FilterSelector;
