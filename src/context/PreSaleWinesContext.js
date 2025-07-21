import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { logError } from "@/utils/logging";
import { fetchPreSaleWines } from "@/lib/shopify/services";
import { useLanguage } from "@/context/LanguageContext";
import {
  extractFilters,
  normalizeWineList,
  matchesFilter,
} from "@/utils/wineUtils";

const PreSaleWinesContext = createContext();

export function PreSaleWinesProvider({ children }) {
  const [activeFilters, setActiveFilters] = useState([]);
  const [allWines, setAllWines] = useState([]);
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
          const normalizedWines = normalizeWineList(parsedWines, translations);
          setAllWines(normalizedWines);
        } else {
          setAllWines([]);
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
        setAllWines([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadWines();
  }, [language, translations]);

  const availableFilters = useMemo(() => extractFilters(allWines), [allWines]);

  const wines = useMemo(
    () =>
      allWines.filter((wine) =>
        activeFilters.every((filter) => matchesFilter(wine, filter)),
      ),
    [allWines, activeFilters],
  );

  return (
    <PreSaleWinesContext.Provider
      value={{
        wines,
        availableFilters,
        activeFilters,
        setActiveFilters,
        isLoading,
        error,
      }}
    >
      {children}
    </PreSaleWinesContext.Provider>
  );
}

PreSaleWinesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function usePreSaleWines() {
  const context = useContext(PreSaleWinesContext);
  if (!context) {
    throw new Error(
      "usePreSaleWines must be used within a PreSaleWinesProvider",
    );
  }
  return context;
}
