"use client";

import React from "react";
import { useState } from "react";
import axios from "axios";
import { baseApiUrl } from "@/config/environment";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { logInfo, logError } from "../../utils/logging";
import { jwtDecode } from "jwt-decode";

const GoogleAuth = ({ children }) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSuccess = async (response) => {
    const credential = response.credential;
    const idToken = response.credential;

    logInfo(`Google Login Success:", ${JSON.stringify(credential)}`);
    logInfo(`idToken:", ${JSON.stringify(idToken)}`);
    setIsLoading(true);

    try {
      // Decode the token to get user data
      const decoded = jwtDecode(credential);
      logInfo(`Decoded JWT, ${JSON.stringify(decoded)}`);

      // Prepare user data
      const userData = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        token: idToken,
      };

      // Authenticate user with backend
      const serverResponse = await axios.post(
        `${baseApiUrl}/api/auth/sign-in-with-google`,
        userData,
        { withCredentials: true },
      );

      if (serverResponse.data.success) {
        logInfo("Backend authenticated successfully:", serverResponse.data);
        // Do something with server response, e.g., set user data in context
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
  };

  const handleError = (error) => {
    logInfo("Google Login Error:", error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        {children}

        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap
          theme="outline"
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
