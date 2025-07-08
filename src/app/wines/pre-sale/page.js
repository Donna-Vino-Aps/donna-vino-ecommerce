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
      {/* Filters for Mobile */}
      <div className="mt-4 flex flex-col justify-center gap-2 md:mt-1">
        <SearchBar />
        <div className="mr-4 mt-3 flex items-center justify-center gap-4 md:hidden">
          <SortBy />
          <FilterIcon onClick={() => setIsFilterModalOpen((prev) => !prev)} />
        </div>
      </div>

      {/* Modal */}
      {isFilterModalOpen && (
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
        />
      )}

      {/* Desktop layout */}
      <div className="container mx-auto flex flex-col items-start gap-4 px-4 py-8 md:flex-row">
        {!isFilterModalOpen && (
          <div className="hidden md:block">
            <FilterSelector isFilterModalOpen={false} />
          </div>
        )}
        <div className="w-full">
          <PreSaleWineGrid />
        </div>
      </div>
    </>
  );
};

export default PreSaleWinesPage;
