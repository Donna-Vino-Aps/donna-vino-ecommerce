"use client";

import React from "react";
import SEO from "@/components/SEO/SEO";
import TasteProfile from "@/components/TasteProfile/TasteProfile";

const Wines = () => {
  return (
    <div>
      <SEO title="Wines" description="Wines" />
      <h1 className="text-center text-displayLarge">Wines</h1>
      <TasteProfile />
    </div>
  );
};

export default Wines;
