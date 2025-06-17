"use client";

import React from "react";
import SEO from "@/components/SEO/SEO";
import {
  PreSaleWinesProvider,
  usePreSaleWines,
} from "@/context/PreSaleWinesContext";

const WinesList = () => {
  const { wines, isLoading, error } = usePreSaleWines();

  if (isLoading) {
    return <div>Loading wines...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!wines || wines.length === 0) {
    return <div>No pre-sale wines available at the moment.</div>;
  }

  return (
    <div>
      {wines.map((wine) => (
        <div
          key={wine.id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          <pre>{JSON.stringify(wine, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};

const WinesPage = () => {
  return (
    <div>
      <SEO title="Wines" description="A selection of our finest wines." />
      <h1 className="text-center text-displayLarge">Pre-Sale Wines</h1>
      <PreSaleWinesProvider>
        <WinesList />
      </PreSaleWinesProvider>
    </div>
  );
};

export default WinesPage;
