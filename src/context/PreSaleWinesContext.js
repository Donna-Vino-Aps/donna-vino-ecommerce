import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { logError } from "@/utils/logging";
import { fetchPreSaleWines } from "@/lib/shopify/services";
import { useLanguage } from "@/context/LanguageContext";

const PreSaleWinesContext = createContext();

export function PreSaleWinesProvider({ children }) {
  const [wines, setWines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language, translations } = useLanguage();

  useEffect(() => {
    async function loadWines() {
      try {
        const winesResponse = await fetchPreSaleWines(language);
        if (winesResponse && winesResponse.products) {
          const parsedWines = winesResponse.products.map((product) => ({
            ...product,
            slug: product.handle, // Add slug based on product handle
          }));
          setWines(parsedWines);
        } else {
          setWines([]);
          logError("Pre-sale wines data is missing or malformed", {
            winesResponse,
          });
          setError(
            translations["wines.error.loading"] ||
              "Failed to load wines. Please try again later.",
          );
        }
      } catch (err) {
        logError("Error fetching pre-sale wines:", err);
        setError(
          translations["wines.error.loading"] ||
            "Failed to load wines. Please try again later.",
        );
        setWines([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadWines();
  }, [language, translations]);

  return (
    <PreSaleWinesContext.Provider value={{ wines, isLoading, error }}>
      {children}
    </PreSaleWinesContext.Provider>
  );
}

PreSaleWinesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function usePreSaleWines() {
  return useContext(PreSaleWinesContext);
}
