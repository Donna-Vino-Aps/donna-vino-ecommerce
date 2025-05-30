"use client";

import React from "react";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import PropTypes from "prop-types";
import { signIn } from "next-auth/react";

const GoogleAuth = () => {
  const { translations } = useLanguage();

  return (
    <div className="flex w-full max-w-[19.063rem] flex-col items-center justify-center space-y-2 md:max-w-[18rem] lg:max-w-[25rem]">
      <Button
        text={translations["logIn.signin-google"]}
        color="primaryActive"
        width="full"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        icon="/icons/google-darkred2.svg"
        data-testid="login-google-button"
        aria-label="Google Sign In"
      />
    </div>
  );
};

GoogleAuth.propTypes = {
  setMsg: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default GoogleAuth;
