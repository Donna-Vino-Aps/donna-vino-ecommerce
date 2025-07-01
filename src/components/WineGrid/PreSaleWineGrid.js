"use client";

import React from "react";
import { usePreSaleWines } from "@/context/PreSaleWinesContext";
import WineCardSmall from "@/components/Card/WineCardSmall";
import Spinner from "@/components/UI/Spinner";
import ErrorMessage from "@/components/UI/ErrorMessage";
import { getWineUrl } from "@/utils/wineUtils";
import Link from "next/link";

const PreSaleWineGrid = () => {
  const { wines, isLoading, error } = usePreSaleWines();

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
          No pre-sale wines available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {wines.map((wine) => {
        const price = wine.bottlePrice;
        const primaryImage = wine.imageUrl;

        return (
          <Link href={getWineUrl(wine)} key={wine.id}>
            <WineCardSmall
              key={wine.id}
              title={wine.title}
              price={price}
              imageUrl={primaryImage}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default PreSaleWineGrid;
