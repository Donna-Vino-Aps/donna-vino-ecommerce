"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./globals.css";
import Footer from "../components/Footer/Footer.js";
import Navbar from "../components/NavBar/NavBar.js";
import { LanguageProvider } from "../context/LanguageContext";
import { CredentialsContext } from "../context/credentialsContext";
import { logError, logInfo } from "@/utils/logging";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const RootLayout = ({ children }) => {
  const [storedCredentials, setStoredCredentials] = useState(null);

  const checkLoginCredentials = async () => {
    try {
      // const result = localStorage.getItem("donna-vino-e-commerce");
      const result = localStorage.getItem("userCredentials");
      if (result !== null) {
        setStoredCredentials(JSON.parse(result));
      } else {
        setStoredCredentials(null);
      }
    } catch (error) {
      logError("Error retrieving stored credentials:", error);
    }
  };

  useEffect(() => {
    checkLoginCredentials();
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <html lang="en">
          <body className="flex min-h-screen w-full flex-col bg-white font-barlow">
            <CredentialsContext.Provider
              value={{ storedCredentials, setStoredCredentials }}
            >
              <LanguageProvider>
                <Navbar />
                <main
                  className="flex-grow"
                  role="main"
                  data-testid="main-content"
                >
                  {children}
                </main>

                <Footer />
              </LanguageProvider>
            </CredentialsContext.Provider>
          </body>
        </html>
      </LocalizationProvider>
    </GoogleOAuthProvider>
  );
};

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;
