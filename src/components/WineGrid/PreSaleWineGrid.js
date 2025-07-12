"use client";

import React from "react";
import { usePreSaleWines } from "@/context/PreSaleWinesContext";
import WineCard from "@/components/Card/WineCard";
import Spinner from "@/components/UI/Spinner";
import ErrorMessage from "@/components/UI/ErrorMessage";
import { getWineUrl } from "@/utils/wineUtils";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const PreSaleWineGrid = () => {
  const { wines, isLoading, error, activeFilters } = usePreSaleWines();
  const { translations } = useLanguage();

  if (isLoading) {
    return (
      <div className="flex min-h-[25rem] items-center justify-center">
        <Spinner size="medium" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[25rem] items-center justify-center">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!wines || wines.length === 0) {
    return (
      <div className="flex min-h-[25rem] items-center justify-center">
        <p className="text-bodyLarge font-medium text-tertiary1-normal">
          {activeFilters.length == 0
            ? translations["presale.no-wine"]
            : translations["presale.no-wine-matches-filter"]}
        </p>
      </div>
    );
  }

  return (
    <>
      {wines.map((wine) => {
        const price = wine.bottlePrice;
        const primaryImage = wine.imageUrl;

        return (
          <Link href={getWineUrl(wine)} key={wine.id}>
            <WineCard
              key={wine.id}
              title={wine.title}
              price={price}
              imageUrl={primaryImage}
              variant={"pre-sale"}
            />
          </Link>
        );
      })}
    </>
  );
};

export default PreSaleWineGrid;
