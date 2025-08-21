"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import SEO from "@/components/SEO/SEO";
import { useAPI } from "@/context/ApiProvider";
import { useApiError } from "@/hooks/api/useApiError";
import Spinner from "@/components/UI/Spinner";

const CheckInbox = () => {
  const { translations } = useLanguage();
  const [email, setEmail] = useState("");
  const { post, error: apiError, isLoading } = useAPI();
  const errorMsg = useApiError(apiError);
  const [msg, setMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setMsg(errorMsg);
    if (typeof window !== "undefined") {
      setEmail(sessionStorage.getItem("userEmail") || "");
    }
  }, [errorMsg]);

  const resendResetPassword = async () => {
    setIsDisabled(true);
    setIsSubmitting(true);

    const responseData = await post("register/resend-password-reset", {
      payload: { email: email },
    });

    setIsSubmitting(false);
    setMsg(responseData?.message || msg);

    setTimeout(() => {
      setIsDisabled(false);
      setMsg("");
    }, 60000);
  };

  return (
    <section className="my-4 bg-primary-light bg-dots-sm bg-dots-size-sm sm:bg-dots-lg sm:bg-dots-size-lg md:py-8">
      <SEO
        title={translations["forgotPassword.check-inbox.title"]}
        description={translations["forgotPassword.check-inbox.description"]}
      />
      <div className="mx-2 flex flex-col items-center justify-center py-8 sm:py-24">
        <div className="relative mx-3 w-full max-w-[560px] rounded-2xl bg-white px-6 py-10 text-center shadow-lg sm:px-20">
          <section className="mb-4  w-full">
            <img
              src="/icons/cheerswineglass.svg"
              alt="message check icon"
              className="m-auto h-[99px] w-[102px] object-cover sm:h-[150px] sm:w-[154px]"
            />
          </section>
          <h1 className="mb-4 text-titleLarge sm:text-headlineMedium">
            {translations["forgotPassword.success-heading"]}
          </h1>
          <p className="mb-4 max-w-[400px] text-bodyMedium sm:text-bodyLarge">
            {translations["forgotPassword.success-text1"]}
            {<span className="font-semibold">{` ${email} `}</span>}
            {translations["forgotPassword.success-text2"]}
          </p>
          <div className="text-bodyLarge sm:text-left">
            {translations["forgotPassword.resend"]}
            {
              <button
                onClick={resendResetPassword}
                disabled={isDisabled}
                className={`ml-2 font-medium underline ${isDisabled ? "cursor-not-allowed text-tertiary2-dark" : ""}`}
              >
                {translations["forgotPassword.resend2"]}
              </button>
            }
          </div>
          {msg && (
            <div className="mt-5 flex justify-center">
              <p
                className={`text-center ${errorMsg ? "text-others-negative" : "text-gray-800"} text-bodyMedium sm:text-bodyLarge`}
                aria-live="polite"
                data-testid="message-status"
              >
                {msg}
              </p>
            </div>
          )}
          {isSubmitting && isLoading && (
            <div className="mt-4 flex items-center justify-center">
              <Spinner size="small" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CheckInbox;
