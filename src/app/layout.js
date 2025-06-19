"use client";
import React from "react";
import PropTypes from "prop-types";
import "./globals.css";
import Footer from "../components/Footer/Footer.js";
import Navbar from "../components/NavBar/NavBar.js";
import { LanguageProvider } from "@/context/LanguageContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { UserContextProvider } from "@/context/UserContext";
import { SessionProvider } from "next-auth/react";
import APIProvider from "@/context/ApiProvider";
import { PreSaleWinesProvider } from "@/context/PreSaleWinesContext";

const RootLayout = ({ children }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <html lang="en">
        <body className="flex min-h-screen w-full flex-col bg-white font-barlow text-tertiary1-normal">
          <LanguageProvider>
            <SessionProvider>
              <APIProvider>
                <UserContextProvider>
                  <PreSaleWinesProvider>
                    <Navbar />
                    <main
                      className="flex-grow"
                      role="main"
                      data-testid="main-content"
                    >
                      {children}
                    </main>
                    <Footer />
                  </PreSaleWinesProvider>
                </UserContextProvider>
              </APIProvider>
            </SessionProvider>
          </LanguageProvider>

          {process.env.NEXT_PUBLIC_NODE_ENV === "production" && (
            <Script
              defer
              src="https://cloud.umami.is/script.js"
              data-website-id="2a60d0b9-2baa-48f9-88df-67e44d159e85"
            />
          )}
        </body>
      </html>
    </LocalizationProvider>
  );
};

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;
