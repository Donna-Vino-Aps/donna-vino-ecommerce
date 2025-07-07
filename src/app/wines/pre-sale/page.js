"use client";

import React, { useState } from "react";
import SEO from "@/components/SEO/SEO";
import PreSaleWineGrid from "@/components/WineGrid/PreSaleWineGrid";
import FilterSelector from "@/components/FilterSelector/FilterSelector";
import Image from "next/image";
import SortBy from "@/components/FilterSelector/SortBy";
import FilterModal from "@/components/FilterSelector/FilterModal";

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
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
        />
      )}

      {/* Desktop layout */}
      <div className="container mx-auto flex flex-col items-start gap-8 px-4 py-8 md:flex-row">
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
