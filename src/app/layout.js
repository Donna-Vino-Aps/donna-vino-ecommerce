"use client";
import React from "react";
import PropTypes from "prop-types";
import "./globals.css";
import Footer from "../components/Footer/Footer.js";
import Navbar from "../components/NavBar/NavBar.js";
import { LanguageProvider } from "@/context/LanguageContext";
import { CredentialsProvider } from "@/context/CredentialsContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserContextProvider } from "@/context/UserContex";

const RootLayout = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <html lang="en">
          <body className="flex min-h-screen w-full flex-col bg-white font-barlow text-tertiary1-normal">
            <CredentialsProvider>
              <LanguageProvider>
                <UserContextProvider>
                  <Navbar />

                  <main
                    className="flex-grow"
                    role="main"
                    data-testid="main-content"
                  >
                    {children}
                  </main>
                  <Footer />
                </UserContextProvider>
              </LanguageProvider>
            </CredentialsProvider>
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
