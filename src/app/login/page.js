"use client";

import LoginScreen from "@/components/LogIn/LogInScreen";
import React from "react";
import SEO from "@/components/SEO/SEO";
import { useLanguage } from "@/context/LanguageContext";

const LogIn = () => {
  const { translations } = useLanguage();
  return (
    <div>
      <SEO
        title={translations["logIn.title"]}
        description={translations["logIn.description"]}
      />
      <LoginScreen />
    </div>
  );
};

export default LogIn;
