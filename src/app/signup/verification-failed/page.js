"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import SEO from "@/components/SEO/SEO";
import StatusPage from "@/components/StatusPage/StatusPage";

const VerificationFailed = () => {
  const { translations } = useLanguage();

  return (
    <div>
      <SEO
        title={translations["signUp.verificationFailed.title"]}
        description={translations["signUp.verificationFailed.message"]}
      />
      <StatusPage
        title={translations["signUp.verificationFailed.title"]}
        message={translations["signUp.verificationFailed.message"]}
        titleId="verification-failed-title"
        dataTestId="verification-failed-message"
        button={{
          text: translations["signUp.verificationFailed.signup.button"],
          linkUrl: "/signup",
          testId: "verification-action-button",
          ariaLabel: translations["signUp.verificationFailed.signup.button"],
        }}
      />
    </div>
  );
};

export default VerificationFailed;
