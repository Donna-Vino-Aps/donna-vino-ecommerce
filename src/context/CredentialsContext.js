import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { logError } from "@/utils/logging";

const CredentialsContext = createContext();

export const CredentialsProvider = ({ children }) => {
  const [storedCredentials, setStoredCredentials] = useState(null);

  const checkLoginCredentials = async () => {
    try {
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
    <CredentialsContext.Provider
      value={{ storedCredentials, setStoredCredentials }}
    >
      {children}
    </CredentialsContext.Provider>
  );
};

export const useCredentials = () => useContext(CredentialsContext);

CredentialsProvider.propTypes = {
  children: PropTypes.node,
};
