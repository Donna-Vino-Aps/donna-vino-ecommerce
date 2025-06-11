"use client";
import React from "react";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import SEO from "@/components/SEO/SEO";
import { useRouter } from "next/navigation";

const VerificationFailed = () => {
  const { translations } = useLanguage();
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/signup");
  };

  return (
    <section className="my-4 bg-primary-light bg-dots-sm bg-dots-size-sm sm:bg-dots-lg sm:bg-dots-size-lg">
      <SEO
        title={translations["signUp.verificationFailed.title"]}
        description={translations["signUp.verificationFailed.description"]}
      />
      <div className="mx-2 flex flex-col items-center justify-center py-4 sm:py-24">
        <div className="w-full max-w-[35rem] items-center justify-center rounded-2xl bg-tertiary2-light px-5 py-8 shadow-lg sm:px-16 sm:py-10">
          <h1
            id="verification-failed-title"
            className="mb-6 text-center text-titleLarge sm:mb-4 sm:text-headlineMedium"
          >
            {translations["signUp.verificationFailed.title"]}
          </h1>

          <p
            className="mb-6 text-center text-bodyLarge sm:mb-4"
            data-testid="verification-failed-message"
          >
            {translations["signUp.verificationFailed.message"]}
          </p>

          <Button
            text={translations["signUp.verificationFailed.signup.button"]}
            width="full"
            onClick={handleButtonClick}
            testId="verification-action-button"
            ariaLabel={translations["signUp.verificationFailed.signup.button"]}
          />
        </div>
      </div>
    </section>
  );
};

export default VerificationFailed;
