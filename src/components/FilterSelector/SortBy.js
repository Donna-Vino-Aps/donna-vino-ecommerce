import React, { useState } from "react";
import Image from "next/image";
import { usePreSaleWines } from "@/context/PreSaleWinesContext";
import { useLanguage } from "@/context/LanguageContext";

const sortingOptions = [
  { id: "wineVariety" },
  { id: "newest" },
  { id: "price-asc" },
  { id: "price-desc" },
  { id: "name-asc" },
  { id: "name-desc" },
];

const SortBy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedSort, setSelectedSort } = usePreSaleWines();
  const { translations } = useLanguage();

  const getLabel = (id) => {
    return (
      translations[`presale-filter.${id}`] ||
      sortingOptions.find((item) => item.id === id)?.id
    );
  };

  const selectedTitle = getLabel(selectedSort) || getLabel("newest");

  return (
    <section className="relative flex-shrink gap-4">
      <div
        className={`relative min-h-[3.5rem] w-[13rem] rounded-md border border-tertiary1-light xs:w-[17rem] md:ml-4 md:min-h-[2.75rem] md:w-[12.25rem]
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
            {sortingOptions.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer px-4 py-2 hover:rounded-sm hover:bg-tertiary2-dark"
                onClick={() => {
                  setSelectedSort(item.id);
                  setIsOpen(false);
                }}
              >
                {getLabel(item.id)}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SortBy;
