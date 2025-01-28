import React from "react";
import PropTypes from "prop-types";
import "./globals.css";
import Footer from "../components/Footer/Footer.js";
import Navbar from "../components/Navbar/Navbar.js";
import { LanguageProvider } from "../context/LanguageContext";
// import { logInfo } from "@/utils/logging";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <LanguageProvider>
        <body className="flex flex-col min-h-screen w-full font-barlow bg-white text-foreground-normal">
          <Navbar />

          <main className="flex-grow" role="main" data-testid="main-content">
            {children}
          </main>

          <Footer />
        </body>
      </LanguageProvider>
    </html>
  );
};

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;
