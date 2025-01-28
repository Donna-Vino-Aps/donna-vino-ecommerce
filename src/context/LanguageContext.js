"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

import enTranslations from "../translations/en.json";
import dkTranslations from "../translations/dk.json";

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState(enTranslations);
  useEffect(() => {
    const savedLanguage = localStorage.getItem("pageLanguage");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    if (language === "en") {
      setTranslations(enTranslations);
    } else if (language === "dk") {
      setTranslations(dkTranslations);
    }
  }, [language]);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("pageLanguage", newLanguage);
  };

  return (
    <LanguageContext.Provider
      value={{ language, translations, setLanguage: changeLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
