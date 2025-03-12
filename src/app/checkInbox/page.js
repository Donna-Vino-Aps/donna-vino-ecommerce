"use client";
import React from "react";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
const CheckInbox = () => {
  const { translations } = useLanguage();
  return (
    <div className="relative flex justify-center items-center h-screen bg-[#FDE8E9]">
      <img
        src="/vector.svg"
        alt="Background Vector"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="relative bg-white pt-10 pr-20 pb-10 pl-20 rounded-2xl shadow-lg w-[560px]  text-center">
        <section className="mb-8 sm:!w-[133px]">
          <img
            src="/icons/message-check.svg"
            alt="message check icon"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </section>
        <h1 className="text-headlineLarge text-left mb-4">
          {translations["checkInbox.success-heading"]}
        </h1>
        <p className="text-left mb-4 w-[400px]">
          {" "}
          {translations["checkInbox.success-text1"]}
          {translations["checkInbox.success-text2"]}
        </p>

        <div className="w-full mt-2 mb-4">
          <Button
            text={translations["forgotPassword.button"]}
            variant="redWide"
            data-testid="forgot-password-send-reset-link-button"
            aria-label="forgot password send reset link button"
          />
        </div>
        <div>
          {translations["checkInbox.resend"]}
          <Link>Resend</Link>
        </div>
      </div>{" "}
    </div>
  );
};

export default CheckInbox;
