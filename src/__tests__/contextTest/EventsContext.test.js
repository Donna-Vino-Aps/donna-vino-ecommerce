import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { EventsProvider, useEvents } from "@/context/EventsContext";
import {
  getEventsCollection,
  transformShopifyProduct,
} from "@/lib/shopify/collection-actions";
import { logError } from "@/utils/logging";
import { useLanguage } from "@/context/LanguageContext";

// Mock dependencies
jest.mock("@/lib/shopify/collection-actions", () => ({
  getEventsCollection: jest.fn(),
  transformShopifyProduct: jest.fn((product) => ({
    ...product,
    transformed: true,
  })),
}));

jest.mock("@/utils/logging", () => ({
  logError: jest.fn(),
}));

jest.mock("@/context/LanguageContext", () => ({
  useLanguage: jest.fn(),
}));

const TestComponent = () => {
  const { events, isLoading, error } = useEvents();

  return (
    <div>
      {isLoading && <div data-testid="loading">Loading...</div>}
      {error && <div data-testid="error">{error}</div>}
      <ul>
        {events.map((event) => (
          <li key={event.id} data-testid="event-item">
            {event.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

const renderWithProvider = () =>
  render(
    <EventsProvider>
      <TestComponent />
    </EventsProvider>,
  );

describe("EventsContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useLanguage.mockReturnValue({
      language: "en",
      translations: {
        "events.error.loading": "Failed to load events",
      },
    });
  });

  it("should show loading state initially", () => {
    getEventsCollection.mockImplementation(() => new Promise(() => {}));

    renderWithProvider();

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("should fetch and transform events successfully", async () => {
    const mockEvents = {
      products: {
        edges: [
          {
            node: {
              id: "1",
              title: "Wine Tasting Event",
              handle: "wine-tasting",
            },
          },
          {
            node: {
              id: "2",
              title: "Wine Tour",
              handle: "wine-tour",
            },
          },
        ],
      },
    };

    getEventsCollection.mockResolvedValue(mockEvents);

    renderWithProvider();

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    expect(getEventsCollection).toHaveBeenCalledWith("en");
    expect(transformShopifyProduct).toHaveBeenCalledTimes(2);

    const eventItems = screen.getAllByTestId("event-item");
    expect(eventItems).toHaveLength(2);
  });

  it("should handle empty events collection", async () => {
    getEventsCollection.mockResolvedValue({});

    renderWithProvider();

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    expect(screen.queryByTestId("event-item")).not.toBeInTheDocument();
  });

  it("should handle API errors", async () => {
    const error = new Error("API Error");
    getEventsCollection.mockRejectedValue(error);

    renderWithProvider();

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    expect(logError).toHaveBeenCalledWith("Error fetching events:", error);
    expect(screen.getByTestId("error")).toHaveTextContent(
      /Failed to load events/,
    );
  });

  it("should refetch events when language changes", async () => {
    useLanguage.mockReturnValue({
      language: "en",
      translations: {
        "events.error.loading": "Failed to load events",
      },
    });

    const mockEvents = {
      products: {
        edges: [
          {
            node: {
              id: "1",
              title: "Wine Tasting Event",
              handle: "wine-tasting",
            },
          },
        ],
      },
    };

    getEventsCollection.mockResolvedValue(mockEvents);

    const { rerender } = renderWithProvider();

    await waitFor(() => {
      expect(getEventsCollection).toHaveBeenCalledWith("en");
    });

    useLanguage.mockReturnValue({
      language: "dk",
      translations: {
        "events.error.loading": "Kunne ikke indlæse begivenheder",
      },
    });

    rerender(
      <EventsProvider>
        <TestComponent />
      </EventsProvider>,
    );

    await waitFor(() => {
      expect(getEventsCollection).toHaveBeenCalledWith("dk");
    });

    expect(getEventsCollection).toHaveBeenCalledTimes(2);
  });
});
