import React from "react";
import FilterDropdown from "./FilterDropdown";

const FilterSelector = () => {
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

  return (
    <div className="flex flex-col gap-3">
      {filterData.map((filter) => (
        <div key={filter.id}>
          <FilterDropdown filter={filter} />
        </div>
      ))}
    </div>
  );
};

export default FilterSelector;
