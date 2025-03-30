"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/context/LanguageContext";

const ResetEmailSent = () => {
  const { translations } = useLanguage();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  return (
    <div className="relative flex justify-center items-center h-screen bg-[#FDE8E9]">
      <img
        src="/vector.svg"
        alt="Background Vector"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="relative bg-white pt-10 pr-20 pb-10 pl-20 rounded-2xl shadow-lg w-[560px] text-center">
        <h1 className="text-headlineLarge text-left mb-4">
          {translations["resetEmailSent.heading"]}
        </h1>
        <p className="text-left mb-4">
          {translations["resetEmailSent.paragraph"]} {email}
        </p>

        <div className="w-full mt-8">
          <Button
            text={translations["resetEmailSent.button"]}
            variant="redWide"
            aria-label="Return to home"
            onClick={() => router.push("/")}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetEmailSent;
