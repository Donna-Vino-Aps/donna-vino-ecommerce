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
    getEventsCollection.mockRejectedValue(new Error("Failed to fetch"));

    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });

    expect(screen.getByText("Failed to load events")).toBeInTheDocument();
  });

  it("should filter out past events", async () => {
    transformShopifyProduct.mockReset();

    transformShopifyProduct.mockImplementation((node) => {
      if (node.id === "1") {
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);
        return {
          id: "future-event",
          title: "Future Event",
          date: futureDate.toISOString().slice(0, 10),
          timeStart: futureDate,
          totalInventory: 10,
          availableQuantity: 5,
          transformed: true,
        };
      } else {
        const pastDate = new Date();
        pastDate.setFullYear(pastDate.getFullYear() - 1);
        return {
          id: "past-event",
          title: "Past Event",
          date: pastDate.toISOString().slice(0, 10),
          timeStart: pastDate,
          totalInventory: 10,
          availableQuantity: 5,
          transformed: true,
        };
      }
    });

    const mockEvents = {
      products: {
        edges: [
          { node: { id: "1", title: "Should be future" } },
          { node: { id: "2", title: "Should be past" } },
        ],
      },
    };

    getEventsCollection.mockResolvedValue(mockEvents);

    renderWithProvider();

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    expect(transformShopifyProduct).toHaveBeenCalledTimes(2);

    const futureEvent = screen.getByText("Future Event");
    expect(futureEvent).toBeInTheDocument();
    expect(screen.queryByText("Past Event")).not.toBeInTheDocument();
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
