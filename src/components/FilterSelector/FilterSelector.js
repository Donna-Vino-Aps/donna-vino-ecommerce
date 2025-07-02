import React from "react";
import FilterDropdown from "./FilterDropdown";

const FilterSelector = () => {
  const filterMockData = [
    {
      id: "winetype",
      variant: "regular",
      title: "Wine Type",
      options: ["Red", "White", "Rosé", "Sparkling"],
    },
    {
      id: "grapetype",
      variant: "regular",
      title: "Grape Type",
      options: ["Pinot Noir", "Malbec", "Primitivo"],
    },
    {
      id: "region",
      variant: "regular",
      title: "Region",
      options: ["Puglia", "Veneto", "Piedmont", "Abruzzo"],
    },
    {
      id: "pricerange",
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
