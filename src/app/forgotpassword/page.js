"use client";
import React from "react";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/context/LanguageContext";
const ForgotPassword = () => {
  const { translations } = useLanguage();
  return (
    <div className="relative flex justify-center items-center h-screen bg-[#FDE8E9]">
      <img
        src="/vector.svg"
        alt="Background Vector"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="relative bg-white p-6 rounded-2xl shadow-lg w-96 text-center">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Go Back
        </button>
        <h1 className="text-headlineLarge text-left mb-4">
          {translations["forgotPassword.heading"]}
        </h1>
        <p className="text-left mb-4">
          {" "}
          {translations["forgotPassword.paragraph"]}
        </p>
        <p className="text-left">Email Address</p>
        <input
          type="email"
          placeholder={translations["forgotPassword.input"]}
          className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="w-full mt-2 mb-4">
          <Button
            text={translations["forgotPassword.button"]}
            variant="redWide"
            data-testid="forgot-password-send-reset-link-button"
            aria-label="forgot password send reset link button"
          />
        </div>
      </div>{" "}
    </div>
  );
};

export default ForgotPassword;
