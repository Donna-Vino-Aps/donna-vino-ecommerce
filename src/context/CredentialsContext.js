import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { logError } from "@/utils/logging";
import useFetch from "@/hooks/api/useFetch";
import { useRouter } from "next/navigation";

const CredentialsContext = createContext();

export const CredentialsProvider = ({ children }) => {
  const [storedCredentials, setStoredCredentials] = useState(null);

  const router = useRouter();

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

  const handleLogout = async () => {
    setStoredCredentials(null);
    await localStorage.removeItem("userCredentials");
    await localStorage.removeItem("userCredentialsToken");
    router.push("/"); // Redirect to start page
  };

  const { performFetch } = useFetch(
    "/user/log-out",
    "POST",
    { withCredentials: true },
    {},
    handleLogout,
  );

  useEffect(() => {
    checkLoginCredentials();
  }, []);

  return (
    <CredentialsContext.Provider
      value={{ storedCredentials, setStoredCredentials, logout: performFetch }}
    >
      {children}
    </CredentialsContext.Provider>
  );
};

export const useCredentials = () => useContext(CredentialsContext);

CredentialsProvider.propTypes = {
  children: PropTypes.node,
};
