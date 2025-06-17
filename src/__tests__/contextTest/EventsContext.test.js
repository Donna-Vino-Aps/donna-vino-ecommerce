import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { EventsProvider, useEvents } from "@/context/EventsContext";
import { getEventsCollection } from "@/lib/shopify/services";
import { useLanguage } from "@/context/LanguageContext";

// Mock dependencies
jest.mock("@/lib/shopify/services", () => ({
  getEventsCollection: jest.fn(),
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
    // Mock a promise that never resolves to keep it in a loading state
    getEventsCollection.mockImplementation(() => new Promise(() => {}));
    renderWithProvider();
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("should fetch events successfully", async () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const mockEventsResponse = {
      products: [
        { id: "1", title: "Event 1", timeStart: futureDate },
        { id: "2", title: "Event 2", timeStart: futureDate },
      ],
    };

    getEventsCollection.mockResolvedValue(mockEventsResponse);

    renderWithProvider();

    expect(screen.getByTestId("loading")).toBeInTheDocument();

    await waitFor(() => {
      expect(getEventsCollection).toHaveBeenCalledWith("en");
    });

    const eventItems = await screen.findAllByTestId("event-item");
    expect(eventItems).toHaveLength(2);
  });

  it("should handle empty events", async () => {
    getEventsCollection.mockResolvedValue({ products: [] });

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
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 1);

    const mockEventsResponse = {
      products: [
        { id: "future-event", title: "Future Event", timeStart: futureDate },
        { id: "past-event", title: "Past Event", timeStart: pastDate },
      ],
    };

    getEventsCollection.mockResolvedValue(mockEventsResponse);

    renderWithProvider();

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    const futureEvent = screen.getByText("Future Event");
    expect(futureEvent).toBeInTheDocument();
    expect(screen.queryByText("Past Event")).not.toBeInTheDocument();
  });

  it("should refetch when language changes", async () => {
    getEventsCollection.mockResolvedValue({ products: [] });

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
