"use client";
import React from "react";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

const CheckInbox = () => {
  const { translations } = useLanguage();
  return (
    <div className="relative flex h-screen items-center justify-center bg-[#FDE8E9]">
      <img
        src="/vector.svg"
        alt="Background Vector"
        className="absolute left-0 top-0 h-full w-full object-cover"
      />
      <div className="relative w-[560px] rounded-2xl bg-white pb-10 pl-20 pr-20 pt-10 text-center  shadow-lg">
        <section className="mb-4  w-full">
          <img
            src="/icons/message-check.svg"
            alt="message check icon"
            className="m-auto h-[48px] w-[48px] object-cover"
          />
        </section>
        <h1 className="mb-4 text-left text-headlineLarge">
          {translations["forgotPassword.success-heading"]}
        </h1>
        <p className="mb-4 w-[400px] text-left">
          {translations["forgotPassword.success-text1"]}{" "}
          {<span className="font-semibold">demo@demo.com</span>}{" "}
          {translations["forgotPassword.success-text2"]}
        </p>

        <div className="mb-4 mt-2 w-full">
          <Button
            text={translations["forgotPassword.button"]}
            width="full"
            data-testid="forgot-password-send-reset-link-button"
            aria-label="forgot password send reset link button"
          />
        </div>
        <div className="text-left">
          {translations["forgotPassword.resend"]}{" "}
          {
            <Link href="" className="font-semibold underline">
              {translations["forgotPassword.resend2"]}
            </Link>
          }
        </div>
      </div>{" "}
    </div>
  );
};

export default CheckInbox;
