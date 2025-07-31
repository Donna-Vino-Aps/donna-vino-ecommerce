import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { logError } from "@/utils/logging";
import { fetchTopWines } from "@/lib/shopify/services";
import { useLanguage } from "@/context/LanguageContext";
import { normalizeWineList } from "@/utils/wineUtils";

const TopWinesContext = createContext();

export function TopWinesProvider({ children }) {
  const [wines, setAllWines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language, translations } = useLanguage();

  useEffect(() => {
    async function loadWines() {
      try {
        const winesResponse = await fetchTopWines(language);
        if (winesResponse && winesResponse.products) {
          const parsedWines = winesResponse.products.map((product) => ({
            ...product,
            slug: product.handle, // Add slug based on product handle
          }));
          const normalizedWines = normalizeWineList(parsedWines, translations);
          setAllWines(normalizedWines);
        } else {
          setAllWines([]);
          logError("Top wines data is missing or malformed", {
            winesResponse,
          });
          setError(
            translations["wines.error.loading"] ||
              "Failed to load wines. Please try again later.",
          );
        }
      } catch (err) {
        logError("Error fetching top wines:", err);
        setError(
          translations["wines.error.loading"] ||
            "Failed to load wines. Please try again later.",
        );
        setAllWines([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadWines();
  }, [language, translations]);

  return (
    <TopWinesContext.Provider
      value={{
        wines,
        isLoading,
        error,
      }}
    >
      {children}
    </TopWinesContext.Provider>
  );
}

TopWinesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useTopWines() {
  const context = useContext(TopWinesContext);
  if (!context) {
    throw new Error("useTopWines must be used within a TopWinesProvider");
  }
  return context;
}
