"use client";
import React, { Suspense } from "react";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter, useSearchParams } from "next/navigation";

const VerificationFailedContent = () => {
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
    <section className="my-4 bg-primary-light bg-dots-sm bg-dots-size-sm sm:bg-dots-lg sm:bg-dots-size-lg">
      <div className="mx-2 flex flex-col items-center justify-center py-4 sm:py-24">
        <div className="w-full max-w-[35rem] items-center justify-center rounded-2xl bg-tertiary2-light px-5 py-8 shadow-lg sm:px-16 sm:py-10">
          <h1
            id="verification-failed-title"
            className="mb-6 text-center text-titleLarge sm:mb-4 sm:text-headlineMedium"
          >
            {getTitle()}
          </h1>

          <p
            className="mb-6 text-center text-bodyLarge sm:mb-4"
            data-testid="verification-failed-message"
          >
            {getMessage()}
          </p>

          <Button
            text={getButtonText()}
            size={{ md: "wide" }}
            extraStyle="font-medium"
            onClick={handleButtonClick}
            testId="verification-action-button"
            ariaLabel={getButtonText()}
          />
        </div>
      </div>
    </section>
  );
};

const VerificationFailed = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="p-4 text-center">
            <div className="animate-pulse font-medium text-secondary-normal">
              Loading...
            </div>
          </div>
        </div>
      }
    >
      <VerificationFailedContent />
    </Suspense>
  );
};

export default VerificationFailed;
