"use client";

import SignUpScreen from "@/components/SignUpScreen/SignUpScreen";
import React from "react";
import SEO from "@/components/SEO/SEO";
import { useLanguage } from "@/context/LanguageContext";

const SignUp = () => {
  const { translations } = useLanguage();
  return (
    <div>
      <SEO
        title={translations["signUp.title"]}
        description={translations["signUp.description"]}
      />
      <SignUpScreen />;
    </div>
  );
};

export default SignUp;
