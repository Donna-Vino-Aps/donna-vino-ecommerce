"use client";

import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { baseApiUrl } from "@/config/environment";
import { logInfo, logError } from "@/utils/logging";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import { useCredentials } from "@/context/CredentialsContext";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";

const GoogleAuth = ({ setMsg, setSuccess, setLoading }) => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const { translations } = useLanguage();
  const { setStoredCredentials } = useCredentials();
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      const accessToken = response?.access_token;
      if (!accessToken) {
        logError("Google login succeeded, but no access token was received.");
        setMsg(translations["logIn.no-token"] || "No access token retrieved");
        setSuccess(false);
        return;
      }

      setLoading(true);
      setMsg("");
      setSuccess(null);

      try {
        const userProfileResponse = await axios.get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`,
        );

        const { email, name, picture } = userProfileResponse.data;
        logInfo("Google user profile retrieved.");

        const userData = { email, name, picture, token: accessToken };

        // Send authentication request to backend
        const serverResponse = await axios.post(
          `${baseApiUrl}/api/auth/sign-in-with-google`,
          userData,
          { withCredentials: true },
        );

        if (serverResponse.data.success) {
          logInfo("Backend authentication succeeded.");
          saveLoginCredentials(userData, accessToken);
          setMsg(translations["logIn.success"]);
          setSuccess(true);
          router.push("/");
        } else {
          throw new Error(
            serverResponse.data.msg || "Backend authentication failed",
          );
        }
      } catch (error) {
        logError("Error during Google sign-in process", error);
        setMsg(error.message);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => {
      logError("Google login error occurred", error);
      setMsg(
        translations["logIn.error"] || "An error occurred during Google login",
      );
      setSuccess(false);
    },
    clientId,
  });

  const saveLoginCredentials = (user, token) => {
    try {
      localStorage.setItem("userCredentials", JSON.stringify(user));
      localStorage.setItem("userCredentialsToken", token);
      setStoredCredentials(user);
      logInfo("User credentials have been saved.");
    } catch (error) {
      logError("Error saving user credentials", error);
      setMsg(translations["logIn.save-error"] || "Error saving credentials");
      setSuccess(false);
    }
  };

  return (
    <div className="flex w-[17.5rem] flex-col items-center justify-center space-y-2 md:w-[18rem] lg:w-[25rem]">
      <Button
        text={translations["logIn.signin-google"]}
        onClick={() => login()}
        color="primaryActive"
        size={{md:"wide"}}
        icon="/icons/google-darkred.svg"
        data-testid="login-google-button"
        aria-label="Google Sign In"
        className="w-full"
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
