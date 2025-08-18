"use client";
import React from "react";
import SEO from "@/components/SEO/SEO";
import Event from "@/components/tasting-event/Event";
import { useParams } from "next/navigation";

const TastingEvent = () => {
  const { slug } = useParams();

  return (
    <div className="bg-primary-light">
      <SEO />
      <Event type={slug} />
    </div>
  );
};

export default TastingEvent;
