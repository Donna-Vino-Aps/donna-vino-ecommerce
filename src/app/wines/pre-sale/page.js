"use client";

import React, { useState } from "react";
import SEO from "@/components/SEO/SEO";
import PreSaleWineGrid from "@/components/WineGrid/PreSaleWineGrid";
import FilterSelector from "@/components/FilterSelector/FilterSelector";
import Image from "next/image";
import SortBy from "@/components/FilterSelector/SortBy";

const PreSaleWinesPage = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <>
      <SEO
        title="Pre-Sale Wines"
        description="Browse our exclusive selection of pre-sale wines."
      />
      {/* Filters for Mobile */}
      <div className="flex items-center justify-center gap-4 px-4 py-4 md:hidden">
        <SortBy />
        <button
          className="flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-lg border border-tertiary1-light"
          onClick={() => setIsFilterModalOpen(true)}
        >
          <Image
            src="/icons/filterslider.svg"
            alt="Open filters"
            width={22}
            height={22}
            className="h-[22px] w-[22px]"
          />
        </button>
      </div>

      {/* Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative max-h-[90vh] max-w-[24rem] overflow-y-auto rounded-lg bg-white p-8">
            <Image
              src="/icons/Handle.svg"
              alt="handle icon"
              width={30}
              height={4}
              className="relative bottom-3 mx-auto h-1 w-[30px]"
            />
            <p className="mb-3 mt-2 text-headlineSmall">Filter by:</p>
            <button
              onClick={() => setIsFilterModalOpen(false)}
              className="absolute right-4 top-4"
            >
              <Image
                src="/icons/close.svg"
                alt="Close"
                width={24}
                height={24}
                className="relative right-1 top-1 h-6 w-6"
              />
            </button>
            <div className="ml-2">
              <FilterSelector />
            </div>
          </div>
        </div>
      )}

      {/* Desktop layout */}
      <div className="container mx-auto flex flex-col items-start gap-8 px-4 py-8 md:flex-row">
        <div className="hidden md:block">
          <FilterSelector />
        </div>
        <div className="w-full">
          <PreSaleWineGrid />
        </div>
      </div>
    </>
  );
};

export default PreSaleWinesPage;
