"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import StatusPage from "@/components/StatusPage/StatusPage";

const DeclineError = () => {
  const { translations } = useLanguage();

  return (
    <StatusPage
      title={translations["signUp.declineError.title"]}
      message={translations["signUp.declineError.message"]}
      titleId="decline-error-title"
      dataTestId="decline-error-message"
      button={{
        text: translations["common.button.backToHome"],
        linkUrl: "/",
        testId: "back-to-home-button",
        ariaLabel: translations["common.button.backToHome"],
      }}
    />
  );
};

export default DeclineError;
