"use client";
import React from "react";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/context/LanguageContext";

import Link from "next/link";
const ForgotPassword = () => {
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
          <Button
            text={translations["button.go-back"]}
            icon="/icons/arrow-left.svg"
            variant="redLine"
            ariaLabel="Go back"
            testId="go-back-button"
            onClick={() => {
              history.go(-1);
            }}
          />
        </section>
        <h1 className="text-headlineLarge text-left mb-4">
          {translations["forgotPassword.heading"]}
        </h1>
        <p className="text-left mb-4 w-[400px]">
          {" "}
          {translations["forgotPassword.paragraph"]}
        </p>
        <p className="text-left">Email Address</p>
        <input
          type="email"
          placeholder={translations["forgotPassword.input"]}
          className="w-full p-2 mb-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="w-full mt-2 mb-4">
          <Link href="/check-in-box">
            <Button
              text={translations["forgotPassword.button"]}
              variant="redWide"
              data-testid="forgot-password-send-reset-link-button"
              aria-label="forgot password send reset link button"
            />{" "}
          </Link>
        </div>
      </div>{" "}
    </div>
  );
};

export default ForgotPassword;
