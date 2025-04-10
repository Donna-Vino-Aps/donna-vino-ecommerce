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

describe("EventsContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useLanguage.mockReturnValue({
      translations: {
        "events.error.loading": "Failed to load events",
      },
    });
  });

  it("should show loading state initially", () => {
    getEventsCollection.mockImplementation(() => new Promise(() => {}));

    render(
      <EventsProvider>
        <TestComponent />
      </EventsProvider>,
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("should fetch and transform events successfully", async () => {
    const mockEvents = {
      products: {
        edges: [
          {
            node: {
              id: "1",
              title: "Wine Tasting Event 1",
              handle: "wine-tasting-1",
            },
          },
          {
            node: {
              id: "2",
              title: "Wine Tasting Event 2",
              handle: "wine-tasting-2",
            },
          },
        ],
      },
    };

    getEventsCollection.mockResolvedValue(mockEvents);

    render(
      <EventsProvider>
        <TestComponent />
      </EventsProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    expect(transformShopifyProduct).toHaveBeenCalledTimes(2);

    const eventItems = screen.getAllByTestId("event-item");
    expect(eventItems).toHaveLength(2);
  });

  it("should handle empty events collection", async () => {
    getEventsCollection.mockResolvedValue({});

    render(
      <EventsProvider>
        <TestComponent />
      </EventsProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    expect(screen.queryByTestId("event-item")).not.toBeInTheDocument();
  });
});
