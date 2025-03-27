"use client";
import React from "react";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter, useSearchParams } from "next/navigation";

const VerificationFailed = () => {
  const { translations } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const type = searchParams.get("type") || "error";
  const resent = searchParams.get("resent") === "true";

  const getTitle = () => {
    if (type === "expired" && resent) {
      return translations["signUp.verificationFailed.expiredResent.title"];
    }

    if (type === "not_found") {
      return translations["signUp.verificationFailed.notFound.title"];
    }

    return translations["signUp.verificationFailed.generic.title"];
  };

  const getMessage = () => {
    if (type === "expired" && resent) {
      return translations["signUp.verificationFailed.expiredResent.message"];
    }

    if (type === "not_found") {
      return translations["signUp.verificationFailed.notFound.message"];
    }

    return translations["signUp.verificationFailed.generic.message"];
  };

  const getButtonText = () => {
    if (type === "expired" && resent) {
      return translations["signUp.verificationFailed.login.button"];
    }

    return translations["signUp.verificationFailed.signup.button"];
  };

  const getButtonAction = () => {
    if (type === "expired" && resent) {
      return "/login";
    }

    return "/signup";
  };

  const handleButtonClick = () => {
    router.push(getButtonAction());
  };

  return (
    <section className="my-4 bg-primary-light sm:bg-dots-lg sm:bg-dots-size-lg bg-dots-sm bg-dots-size-sm">
      <div className="flex flex-col justify-center items-center sm:py-24 py-4 mx-2">
        <div className="bg-tertiary2-light items-center justify-center rounded-2xl shadow-lg px-5 py-8 sm:px-16 sm:py-10 max-w-[35rem] w-full">
          <h1
            id="verification-failed-title"
            className="text-titleLarge sm:text-headlineMedium text-center mb-6 sm:mb-4"
          >
            {getTitle()}
          </h1>

          <p
            className="text-bodyLarge mb-6 sm:mb-4 text-center"
            data-testid="verification-failed-message"
          >
            {getMessage()}
          </p>

          <Button
            text={getButtonText()}
            variant="redWide"
            onClick={handleButtonClick}
            testId="verification-action-button"
            ariaLabel={getButtonText()}
          />
        </div>
      </div>
    </section>
  );
};

export default VerificationFailed;
