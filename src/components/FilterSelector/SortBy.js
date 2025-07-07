import React, { useState } from "react";
import Image from "next/image";

const SortBy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSorting, setSelectedSorting] = useState(null);

  const sortingMockData = [
    {
      id: "price",
      title: "Price (low -> high)",
      display: "price",
    },
    {
      id: "newest",
      title: "Newest",
      display: "newest",
    },
    {
      id: "winetype",
      title: "Wine Type",
      display: "wine type",
    },
  ];

  const sortingData = sortingMockData;

  const selectedTitle =
    sortingData.find((item) => item.id === selectedSorting)?.display || "…";

  return (
    <section className="relative flex gap-4">
      <div
        className={`relative w-[15rem] border border-tertiary1-light rounded-md min-h-[3.5rem]
      ${isOpen ? "rounded-b-none border-b-0" : ""}`}
      >
        {/* Make the header and dropdown consistent in padding and alignment */}
        <div
          className="cursor-pointer px-4 pb-2 pt-4 md:pt-3"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className="flex items-center justify-between">
            <p className="text-labelLarge font-semibold md:text-titleMedium">
              Sort by {selectedSorting ? selectedTitle : ""}
            </p>
            <Image
              src={isOpen ? "/icons/chevron-up.svg" : "/icons/chevron-down.svg"}
              alt={isOpen ? "Close sorting dropdown" : "Open sorting dropdown"}
              width={20}
              height={20}
              className="h-5 w-5 md:h-7 md:w-7"
            />
          </div>
        </div>
        {isOpen && (
          <div className="absolute -left-[1px] top-full z-50 box-border w-[calc(100%+2px)] rounded-b-md border-b border-l border-r border-tertiary1-light bg-white">
            {sortingData.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer px-4 py-2 hover:rounded-sm hover:bg-tertiary2-dark"
                onClick={() => {
                  setSelectedSorting(item.id);
                  setIsOpen(false);
                }}
              >
                {item.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SortBy;
