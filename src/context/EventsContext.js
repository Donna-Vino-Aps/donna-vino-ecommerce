import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { logError } from "@/utils/logging";
import {
  getEventsCollection,
  transformShopifyProduct,
} from "@/lib/shopify/collection-actions";
import { useLanguage } from "@/context/LanguageContext";

const EventsContext = createContext();

export function EventsProvider({ children }) {
  const [formattedEvents, setFormattedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language, translations } = useLanguage();

  const isEventInFuture = useCallback((event) => {
    if (!event || !event.timeStart) return false;
    const now = new Date();
    return event.timeStart instanceof Date && event.timeStart > now;
  }, []);

  const upcomingEvents = useMemo(
    () => formattedEvents.filter(isEventInFuture),
    [formattedEvents, isEventInFuture],
  );

  useEffect(() => {
    async function fetchEvents() {
      try {
        const collection = await getEventsCollection(language);

        if (!collection || !collection.products || !collection.products.edges) {
          setFormattedEvents([]);
          return;
        }

        const events = collection.products.edges.map(({ node }) =>
          transformShopifyProduct(node),
        );

        setFormattedEvents(events);
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
    <EventsContext.Provider
      value={{ events: upcomingEvents, isLoading, error }}
    >
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
