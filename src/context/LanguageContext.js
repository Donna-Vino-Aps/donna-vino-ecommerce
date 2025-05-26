"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

import enTranslations from "../translations/en.json";
import dkTranslations from "../translations/dk.json";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("dk");
  const [translations, setTranslations] = useState(dkTranslations);

  // respond reading actual language when we are sure that it's a browser environment
  // but not at server side pre-rendering time
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("pageLanguage");
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
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

export const useLanguage = () => {
  return useContext(LanguageContext);
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
