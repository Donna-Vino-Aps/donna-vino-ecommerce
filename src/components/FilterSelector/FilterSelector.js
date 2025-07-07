import React, { useEffect, useState } from "react";
import FilterDropdown from "./FilterDropdown";
import SortBy from "./SortBy";
import useIsMobile from "@/hooks/useIsMobile";

const FilterSelector = (isFilterModalOpen) => {
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
