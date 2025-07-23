"use client";
import React from "react";
import TasteCard from "@/components/TasteCard/TasteCard";
export default function TasteProfileCards({ wine }) {
  return (
    <div className="flex flex-wrap gap-6">
      <TasteCard title="Fruit" />
    </div>
  );
}
