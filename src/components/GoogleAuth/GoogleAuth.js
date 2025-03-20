"use client";

import React, { useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { baseApiUrl } from "@/config/environment";
import { logInfo, logError } from "../../utils/logging";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import { CredentialsContext } from "@/context/credentialsContext";
import PropTypes from "prop-types"; // Import PropTypes

const GoogleAuth = ({ setMsg, setSuccess, setLoading }) => {
  // Receive setMsg, setSuccess, and setLoading as props
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const { translations } = useLanguage();
  const { setStoredCredentials } = useContext(CredentialsContext);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      const accessToken = response?.access_token;
      if (!accessToken) {
        logError("No access_token found in Google login response.");
        setMsg("No access token found");
        setSuccess(false);
        return;
      }

      // Activate global loading
      setLoading(true);
      // Clear previous messages
      setMsg("");
      setSuccess(null);

      try {
        const userProfileResponse = await axios.get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`,
        );

        const { email, name, picture } = userProfileResponse.data;
        logInfo(
          `User profile data: ${JSON.stringify(userProfileResponse.data)}`,
        );

        const userData = { email, name, picture, token: accessToken };

        const serverResponse = await axios.post(
          `${baseApiUrl}/api/auth/sign-in-with-google`,
          userData,
          { withCredentials: true },
        );

        if (serverResponse.data.success) {
          logInfo("Backend authenticated successfully:", serverResponse.data);
          await saveLoginCredentials(userData, accessToken);
          setMsg("Google login successful!");
          setSuccess(true);
        } else {
          throw new Error(
            serverResponse.data.msg || "Backend authentication failed",
          );
        }
      } catch (error) {
        setMsg(error.message);
        setSuccess(false);
        logError("Google sign-in failed:", error);
      } finally {
        // Deactivate global loading
        setLoading(false);
      }
    },
    onError: (error) => {
      logInfo("Google Login Error:", error);
      setMsg("Google login error occurred");
      setSuccess(false);
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
      setMsg("Error saving user credentials");
      setSuccess(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2 w-[17.5rem] md:w-[18rem] lg:w-[25rem]">
      <Button
        text={translations["logIn.signin-google"]}
        onClick={() => login()}
        variant="lightRedWide"
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
