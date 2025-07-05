"use client";

import React from "react";
import { notFound } from "next/navigation";
import WineInfo from "@/components/WineDetails/WineInfo";
import { useParams } from "next/navigation";
import { usePreSaleWines } from "@/context/PreSaleWinesContext";
import { getWineBySlug } from "@/utils/wineUtils";
import Spinner from "@/components/UI/Spinner";
import ErrorMessage from "@/components/UI/ErrorMessage";
import MoreInfoDropdown from "@/components/WineDetails/MoreInformationDropdown";
import TasteProfile from "@/components/TasteProfile/TasteProfile";

export default function WineDetailPage() {
  const { slug } = useParams();
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

  const wine = getWineBySlug(slug, wines);

  if (!wine) {
    notFound();
  }

  return (
    <div className="px-8 py-12">
      <MoreInfoDropdown wine={wine} />
      <WineInfo wine={wine} />
      <TasteProfile wine={wine} />
    </div>
  );
}
