"use client";

import React, { useState, useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { baseApiUrl } from "@/config/environment";
import { logInfo, logError } from "../../utils/logging";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import { CredentialsContext } from "@/context/credentialsContext";

const GoogleAuth = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const { translations } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { setStoredCredentials } = useContext(CredentialsContext);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      const accessToken = response?.access_token;

      if (!accessToken) {
        logError("No access_token found in Google login response.");
        return;
      }

      setIsLoading(true);

      // Clear previous messages when a new attempt starts
      setError(null);
      setSuccessMessage(null);

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
          saveLoginCredentials(
            userData,
            accessToken,
            "Google login successful",
          );
          setSuccessMessage("Google login successful!");
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

  const saveLoginCredentials = async (user, token) => {
    try {
      await localStorage.setItem("userCredentials", JSON.stringify(user));
      await localStorage.setItem("userCredentialsToken", token);
      setStoredCredentials(user);
      logInfo("User saved in localStorage");
    } catch (error) {
      logError("Error saving user credentials", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4">
      <Button
        text={translations["logIn.signin-google"]}
        onClick={() => login()}
        variant="lightRedWide"
        icon="/icons/google-darkred.svg"
        data-testid="login-google-button"
        aria-label="Google Sign In"
        className="space-y-1"
      />

      {isLoading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {successMessage && (
        <div className="text-center text-green-500">{successMessage}</div>
      )}
    </div>
  );
};

export default GoogleAuth;
