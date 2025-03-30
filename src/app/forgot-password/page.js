"use client";
import React, { useState } from "react";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import useFetch from "@/hooks/api/useFetch";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const { translations } = useLanguage();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const { isLoading, error, performFetch } = useFetch(
    "/auth/request-password-reset",
    "POST",
    { email },
    {},
    (data) => {
      if (data.success) {
        router.push(`/reset-email-sent?email=${encodeURIComponent(email)}`);
      }
    },
  );

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage(null);
    performFetch({}, "/auth/request-password-reset", { email });
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-[#FDE8E9]">
      <img
        src="/vector.svg"
        alt="Background Vector"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="relative bg-white pt-10 pr-20 pb-10 pl-20 rounded-2xl shadow-lg w-[560px] text-center">
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
          {translations["forgotPassword.paragraph"]}
        </p>

        <form onSubmit={handleForgotPassword} className="w-full">
          <p className="text-left">Email Address</p>
          <input
            type="email"
            placeholder={translations["forgotPassword.input"]}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="w-full mt-2 mb-4">
            <Button
              text={
                isLoading
                  ? translations["forgotPassword.loading"]
                  : translations["forgotPassword.button"]
              }
              variant="redWide"
              type="submit"
              data-testid="forgot-password-send-reset-link-button"
              aria-label="forgot password send reset link button"
              disabled={isLoading}
              onClick={handleForgotPassword}
            />
          </div>
        </form>

        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error.message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
