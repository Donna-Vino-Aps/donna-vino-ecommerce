import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { EventsProvider, useEvents } from "@/context/EventsContext";
import {
  getEventsCollection,
  transformShopifyProduct,
} from "@/lib/shopify/collection-actions";
import { useLanguage } from "@/context/LanguageContext";

// Mock dependencies
jest.mock("@/lib/shopify/collection-actions", () => ({
  getEventsCollection: jest.fn(),
  transformShopifyProduct: jest.fn((product) => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);

    return {
      ...product,
      transformed: true,
      date: futureDate.toISOString().slice(0, 10),
      timeStart: futureDate,
      totalInventory: 10,
      availableQuantity: 5,
    };
  }),
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
          { node: { id: "1", title: "Event 1" } },
          { node: { id: "2", title: "Event 2" } },
        ],
      },
    };

    getEventsCollection.mockResolvedValue(mockEvents);

    renderWithProvider();

    expect(screen.getByTestId("loading")).toBeInTheDocument();

    await waitFor(() => {
      expect(getEventsCollection).toHaveBeenCalledWith("en");
    });

    expect(transformShopifyProduct).toHaveBeenCalledTimes(2);

    const eventItems = await screen.findAllByTestId("event-item");
    expect(eventItems).toHaveLength(2);
  });

  it("should handle empty events", async () => {
    getEventsCollection.mockResolvedValue({
      products: { edges: [] },
    });

    renderWithProvider();

    await waitFor(() => {
      expect(getEventsCollection).toHaveBeenCalledWith("en");
    });

    expect(screen.queryAllByTestId("event-item")).toHaveLength(0);
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

  it("should refetch when language changes", async () => {
    const mockEvents = {
      products: {
        edges: [
          { node: { id: "1", title: "Event 1" } },
          { node: { id: "2", title: "Event 2" } },
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
