import React from "react";
import Spinner from "@/components/UI/Spinner";

export default function RootLoading() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <Spinner size="large" />
    </div>
  );
}
