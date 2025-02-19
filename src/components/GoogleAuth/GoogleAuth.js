// GoogleAuth.js
"use client";

import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { logInfo } from "@/utils/logging";

const GoogleAuth = ({ children }) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  const handleSuccess = (response) => {
    LogInfo("Google Login Success:", response);
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
