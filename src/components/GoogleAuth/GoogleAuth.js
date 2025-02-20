"use client";

import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { baseApiUrl } from "@/config/environment";
import { logInfo, logError } from "../../utils/logging";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";

const GoogleAuth = ({ children }) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const { translations } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      const accessToken = response?.access_token;

      if (!accessToken) {
        logError("No access_token found in Google login response.");
        return;
      }

      // logInfo(`Google Login Success: ${JSON.stringify(accessToken)}`);

      setIsLoading(true);

      try {
        const userProfileResponse = await axios.get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`,
        );

        const { email, name, picture } = userProfileResponse.data;
        logInfo(
          `User profile data: ${JSON.stringify(userProfileResponse.data)}`,
        );

        const userData = {
          email,
          name,
          picture,
          token: accessToken,
        };

        const serverResponse = await axios.post(
          `${baseApiUrl}/api/auth/sign-in-with-google`,
          userData,
          { withCredentials: true },
        );

        if (serverResponse.data.success) {
          logInfo("Backend authenticated successfully:", serverResponse.data);
        } else {
          throw new Error(
            serverResponse.data.msg || "Backend authentication failed",
          );
        }
      } catch (error) {
        setError(error.message);
        logError("Google sign-in failed:", error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      logInfo("Google Login Error:", error);
    },
    clientId,
  });

  return (
    <div className="w-full">
      {children}

      <Button
        text={translations["logIn.signin-google"]}
        onClick={() => login()}
        variant="lightRedWide"
        icon="/icons/google-darkred.svg"
        data-testid="login-google-button"
        aria-label="Google Sign In"
        className="space-y-1"
      />
      {isLoading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default GoogleAuth;
