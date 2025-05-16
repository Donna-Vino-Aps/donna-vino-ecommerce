"use client";
import React from "react";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/context/LanguageContext";

import Link from "next/link";
const ForgotPassword = () => {
  const { translations } = useLanguage();

  return (
    <div className="relative flex h-screen items-center justify-center bg-[#FDE8E9]">
      <img
        src="/vector.svg"
        alt="Background Vector"
        className="absolute left-0 top-0 h-full w-full object-cover"
      />
      <div className="relative w-[560px] rounded-2xl bg-white pb-10 pl-20 pr-20 pt-10 text-center  shadow-lg">
        <section className="mb-8 sm:!w-[133px]">
          <Button
            text={translations["button.go-back"]}
            icon="/icons/arrow-left.svg"
            variant="outlineRed"
            color="transparent"
            size={{ md: "medium", sm: "medium" }}
            ariaLabel="Go back"
            testId="go-back-button"
            onClick={() => {
              history.go(-1);
            }}
          />
        </section>
        <h1 className="mb-4 text-left text-headlineLarge">
          {translations["forgotPassword.heading"]}
        </h1>
        <p className="mb-4 w-[400px] text-left">
          {" "}
          {translations["forgotPassword.paragraph"]}
        </p>
        <p className="text-left">Email Address</p>
        <input
          type="email"
          placeholder={translations["forgotPassword.input"]}
          className="mb-4 mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mb-4 mt-2 w-full">
          <Link href="/check-in-box">
            <Button
              text={translations["forgotPassword.button"]}
              size={{ md: "wide" }}
              extraStyle="font-medium"
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
