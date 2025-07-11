"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import RootLoading from "./loading";
import SEO from "@/components/SEO/SEO";
import { useLanguage } from "@/context/LanguageContext";
import TopWinesSection from "@/components/Slider/TopWinesSection";
import { PreSaleWinesProvider } from "@/context/PreSaleWinesContext";

const TastingSession = dynamic(
  () => import("@/components/HeroSlider/HeroSlider"),
);
const ServicesBanner = dynamic(
  () => import("@/components/ServicesBanner/ServicesBanner"),
);
const SalesCards = dynamic(
  () => import("@/components/SalesCards/SalesCards"),
  {},
);

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const { translations } = useLanguage();

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <RootLoading />;
  }

  return (
    <div className="flex w-[100%]" data-testid="home-container">
      <SEO
        title={translations["home.title"]}
        description={translations["home.description"]}
      />
      <main
        className="flex w-full flex-col gap-4 bg-white"
        data-testid="main-heading"
      >
        <TastingSession />
        <ServicesBanner />
        <PreSaleWinesProvider>
          <TopWinesSection />
        </PreSaleWinesProvider>
        <SalesCards />
      </main>
    </div>
  );
}
