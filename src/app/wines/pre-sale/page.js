"use client";

import React, { useState } from "react";
import SEO from "@/components/SEO/SEO";
import PreSaleWineGrid from "@/components/WineGrid/PreSaleWineGrid";
import FilterSelector from "@/components/FilterSelector/FilterSelector";
import SortBy from "@/components/FilterSelector/SortBy";
import FilterModal from "@/components/FilterSelector/FilterModal";
import FilterIcon from "@/components/FilterSelector/FilterIcon";
import SearchBar from "@/components/SearchBar/SearchBar";

const PreSaleWinesPage = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <>
      <SEO
        title="Pre-Sale Wines"
        description="Browse our exclusive selection of pre-sale wines."
      />
      {/* Search & Mobile Filter Header */}
      <div className="container mx-auto mt-4 md:mt-1">
        <div className="flex flex-col gap-2 rounded-lg border border-tertiary1-light py-6 shadow-sm md:border-none md:shadow-none">
          <SearchBar />
          <div className="mt-3 flex items-center justify-center gap-4 md:hidden">
            <SortBy />
            <FilterIcon onClick={() => setIsFilterModalOpen((prev) => !prev)} />
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isFilterModalOpen && (
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
        />
      )}

      {/* Main Layout */}
      <div className="container mx-auto mt-6 flex flex-col gap-4 px-4 md:flex-row">
        {/* Filter sidebar (hidden on mobile) */}
        {!isFilterModalOpen && (
          <div className="hidden md:block md:min-w-[250px] md:max-w-[300px]">
            <FilterSelector isFilterModalOpen={false} />
          </div>
        )}

        {/* Grid aligned to the right and fills available space */}
        <div className="flex w-full justify-center md:justify-end">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2.5xl:grid-cols-3">
            <PreSaleWineGrid />
          </div>
        </div>
      </div>
    </>
  );
};

export default PreSaleWinesPage;
