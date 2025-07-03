"use client";

import React from "react";
import SEO from "@/components/SEO/SEO";
import PreSaleWineGrid from "@/components/WineGrid/PreSaleWineGrid";
import { usePreSaleWines } from "@/context/PreSaleWinesContext";
import WineCard from "@/components/Card/WineCard";
import Spinner from "@/components/UI/Spinner";
import ErrorMessage from "@/components/UI/ErrorMessage";
import { getWineUrl } from "@/utils/wineUtils";
import Link from "next/link";

const PreSaleWinesPage = () => {
  return (
    <>
      <SEO
        title="Pre-Sale Wines"
        description="Browse our exclusive selection of pre-sale wines."
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <PreSaleWineGrid />
        </div>
      </div>
    </>
  );
};

export default PreSaleWinesPage;
