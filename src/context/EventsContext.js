import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { logError } from "@/utils/logging";
import {
  getEventsCollection,
  transformShopifyProduct,
} from "@/lib/shopify/collection-actions";
import { useLanguage } from "@/context/LanguageContext";

const EventsContext = createContext();

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language, translations } = useLanguage();

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true);
        const collection = await getEventsCollection(language);

        if (!collection || !collection.products || !collection.products.edges) {
          setEvents([]);
          return;
        }

        const formattedEvents = collection.products.edges.map(({ node }) =>
          transformShopifyProduct(node),
        );

        setEvents(formattedEvents);
      } catch (err) {
        logError("Error fetching events:", err);
        setError(
          translations["events.error.loading"] ||
            "Failed to load events. Please try again later.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, [language, translations]);

  return (
    <EventsContext.Provider value={{ events, isLoading, error }}>
      {children}
    </EventsContext.Provider>
  );
}

EventsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useEvents() {
  return useContext(EventsContext);
}
