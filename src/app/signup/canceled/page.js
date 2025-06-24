"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import StatusPage from "@/components/StatusPage/StatusPage";

const Canceled = () => {
  const { translations } = useLanguage();

  return (
    <StatusPage
      title={translations["signUp.canceled.title"]}
      message={translations["signUp.canceled.message"]}
      titleId="email-verification-canceled-title"
      dataTestId="email-verification-canceled-message"
      button={{
        text: translations["common.button.backToHome"],
        linkUrl: "/",
        testId: "back-to-home-button",
        ariaLabel: translations["common.button.backToHome"],
      }}
    />
  );
};

export default Canceled;
