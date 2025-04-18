"use client";

import React, { useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { baseApiUrl } from "@/config/environment";
import { logInfo, logError } from "../../utils/logging";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import { CredentialsContext } from "@/context/credentialsContext";
import PropTypes from "prop-types";

const GoogleAuth = ({ setMsg, setSuccess, setLoading }) => {
  // Receive setMsg, setSuccess, and setLoading as props
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const { translations } = useLanguage();
  const { setStoredCredentials } = useContext(CredentialsContext);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      // 1. The access token returned by Google
      const accessToken = response?.access_token;
      console.warn("Google access token:", accessToken);

      if (!accessToken) {
        logError("No access_token found in Google login response.");
        setMsg("No access token found");
        setSuccess(false);
        return;
      }

      // Activate global loading and clear previous messages
      setLoading(true);
      setMsg("");
      setSuccess(null);

      try {
        // 2. First, retrieve the user information provided by Google
        const userProfileResponse = await axios.get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`,
        );

        const { email, name, picture } = userProfileResponse.data;
        console.warn("Google user profile data:", { email, name, picture });

        // Removed token from userData to separate session management (handled via cookie)
        const userData = { email, name, picture };

        // 3. Send a request to the backend
        const serverResponse = await axios.post(
          `${baseApiUrl}/api/auth/sign-in-with-google`,
          { ...userData, token: accessToken }, // backend may need token
          { withCredentials: true }, // ensures cookies are sent
        );

        console.warn("Backend sign-in response:", serverResponse.data);

        if (serverResponse.data.success) {
          logInfo("Backend authenticated successfully:", serverResponse.data);
          // 4. Save to localStorage
          saveLoginCredentials(userData, accessToken);
          setMsg("Google login successful!");
          setSuccess(true);

          // 5. (Optional) Check the current cookies
          console.warn("document.cookie after login:", document.cookie);
        } else {
          throw new Error(
            serverResponse.data.msg || "Backend authentication failed",
          );
        }
      } catch (error) {
        console.error("Google sign-in failed:", error);
        setMsg(error.message);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => {
      console.warn("Google Login Error:", error);
      setMsg("Google login error occurred");
      setSuccess(false);
    },
    clientId,
  });

  // Save login credentials to localStorage
  const saveLoginCredentials = (user, token) => {
    try {
      localStorage.setItem("userCredentials", JSON.stringify(user));
      localStorage.setItem("userCredentialsToken", token);
      setStoredCredentials(user);

      // Add a debug log here to check if it is stored successfully
      console.warn(
        "Token in localStorage:",
        localStorage.getItem("userCredentialsToken"),
      );
      console.warn(
        "User in localStorage:",
        localStorage.getItem("userCredentials"),
      );

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
