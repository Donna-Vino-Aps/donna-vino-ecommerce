"use client";

import React from "react";
import SEO from "@/components/SEO/SEO";
import PreSaleWineGrid from "@/components/WineGrid/PreSaleWineGrid";

const PreSaleWinesPage = () => {
  return (
    <>
      <SEO
        title="Pre-Sale Wines"
        description="Browse our exclusive selection of pre-sale wines."
      />
      <div className="container mx-auto flex items-center justify-center px-4 py-8">
        <PreSaleWineGrid />
      </div>
    </>
  );
};

export default PreSaleWinesPage;
