"use client";

import React, { useState } from "react";
import { usePreSaleWines } from "@/context/PreSaleWinesContext";
import WineCard from "@/components/Card/WineCard";
import Spinner from "@/components/UI/Spinner";
import ErrorMessage from "@/components/UI/ErrorMessage";
import { getWineUrl } from "@/utils/wineUtils";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import WineAddedPopup from "../Cart/WineAddedPopup";

const PreSaleWineGrid = () => {
  const { wines, isLoading, error, activeFilters } = usePreSaleWines();
  const { translations } = useLanguage();
  const [showPopup, setShowPopup] = useState(false);

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
        return (
          <Link href={getWineUrl(wine)} key={wine.id}>
            <WineCard
              key={wine.id}
              wine={wine}
              context={"pre-sale"}
              setShowPopup={setShowPopup}
            />
          </Link>
        );
      })}
      {showPopup && (
        <WineAddedPopup
          isOpen={showPopup}
          wine={{
            imageUrl: showPopup.imageUrl,
            title: showPopup.title,
            vintage: showPopup.vintage,
            size: "bottle",
            quantity: 1,
            totalPrice: showPopup.variantMap.bottle.price.amount,
          }}
        />
      )}
    </>
  );
};

export default PreSaleWineGrid;
