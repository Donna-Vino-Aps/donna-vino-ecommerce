import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./globals.css";
import Footer from "../components/Footer/Footer.js";
import Navbar from "../components/NavBar/NavBar.js";
import { LanguageProvider } from "../context/LanguageContext";
import { CredentialsContext } from "../context/credentialsContext";
import { logError } from "@/utils/logging";

const RootLayout = ({ children }) => {
  const [storedCredentials, setStoredCredentials] = useState(null);

  const checkLoginCredentials = async () => {
    try {
      const result = localStorage.getItem("donna-vino-e-commerce");
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
    <html lang="en">
      <body className="flex flex-col min-h-screen w-full font-barlow bg-white text-foreground-normal">
        <CredentialsContext.Provider
          value={{ storedCredentials, setStoredCredentials }}
        >
          <LanguageProvider>
            <Navbar />
            <main className="flex-grow" role="main" data-testid="main-content">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </CredentialsContext.Provider>
      </body>
    </html>
  );
};

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;
