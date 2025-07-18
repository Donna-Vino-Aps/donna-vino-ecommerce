import React, { useState } from "react";
import Image from "next/image";
import { usePreSaleWines } from "@/context/PreSaleWinesContext";

const SortBy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedSort, setSelectedSort } = usePreSaleWines();

  const sortingMockData = [
    {
      id: "winetype",
      title: "Wine Type",
      display: "Wine type",
    },
    {
      id: "newest",
      title: "Newest",
      display: "Newest",
    },
    {
      id: "price-asc",
      title: "Price (low-->high)",
      display: "Price",
    },
    {
      id: "price-desc",
      title: "Price (high-->low)",
      display: "Price",
    },
    {
      id: "name-asc",
      title: "Name (A->Z)",
      display: "Name",
    },
    {
      id: "name-desc",
      title: "Name (Z->A)",
      display: "Name",
    },
  ];

  const sortingData = sortingMockData;

  const selectedTitle =
    sortingData.find((item) => item.id === selectedSort)?.display || "Newest";

  return (
    <section className="relative flex-shrink gap-4">
      <div
        className={`relative min-h-[3.5rem] w-[13rem] rounded-md border border-tertiary1-light xs:w-[17rem] md:ml-4 md:min-h-[2.75rem] md:w-[9.625rem]
      ${isOpen ? "rounded-b-none border-b-0" : ""}`}
      >
        {/* Make the header and dropdown consistent in padding and alignment */}
        <div
          className="cursor-pointer px-4 pb-2 pt-4 md:px-6 md:pt-2"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className="flex items-center justify-between font-barlow">
            <p className="text-labelLarge font-medium md:text-titleMedium">
              {selectedSort ? selectedTitle : "Newest"}
            </p>
            <div className="md:relative md:top-[1px]">
              <Image
                src={
                  isOpen ? "/icons/chevron-up.svg" : "/icons/chevron-down.svg"
                }
                alt={
                  isOpen ? "Close sorting dropdown" : "Open sorting dropdown"
                }
                width={14}
                height={14}
                className="h-[5] w-5 md:h-[14px] md:w-[14px]"
              />
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="absolute -left-[1px] top-full z-50 box-border w-[calc(100%+2px)] rounded-b-md border-b border-l border-r border-tertiary1-light bg-white">
            {sortingData.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer px-4 py-2 hover:rounded-sm hover:bg-tertiary2-dark"
                onClick={() => {
                  setSelectedSort(item.id);
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
