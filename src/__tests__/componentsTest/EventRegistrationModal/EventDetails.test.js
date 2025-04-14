/* eslint-disable react/prop-types */
import React from "react";
import { render, screen } from "@testing-library/react";
import EventDetails from "@/components/EventRegistrationModal/EventDetails";
import { logError } from "@/utils/logging";
import { useLanguage } from "@/context/LanguageContext";

// Mock dependencies
jest.mock("@/utils/logging", () => ({
  logError: jest.fn(),
}));

jest.mock("@/context/LanguageContext", () => ({
  useLanguage: jest.fn(),
}));

// Mock the InfoCard component
jest.mock("@/components/EventRegistrationModal/InfoCard", () => {
  return function MockInfoCard({
    title,
    imageUrl,
    imageAlt,
    description,
    bgClass,
    "data-testid": testId,
  }) {
    return (
      <div data-testid={testId || "info-card"} className={bgClass}>
        <h3 data-testid="info-card-title">{title}</h3>
        <div data-testid="info-card-image-url">{imageUrl}</div>
        <div data-testid="info-card-image-alt">{imageAlt}</div>
        <div data-testid="info-card-description">{description}</div>
      </div>
    );
  };
});

describe("EventDetails Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the useLanguage hook to return English translations
    useLanguage.mockReturnValue({
      language: "en",
      translations: {
        "event.details.title": "Event's details",
        "event.details.seatsAvailable": "Seats available",
        "event.details.from": "From",
        "event.details.to": "to",
        "event.details.perPerson": "per person",
        "event.details.allergies":
          "(*) For allergies or special requests, please contact us after confirming your reservation.",
        "event.details.wineCard.title": "Our Wines",
        "event.details.menuCard.title": "Our Dinner Menu",
      },
    });
  });

  const mockEventDetails = {
    availableSeats: 15,
    totalInventory: 20,
    location: "Copenhagen Wine Bar",
    date: "2023-08-15",
    timeStart: new Date("2023-08-15T18:00:00"),
    timeEnd: new Date("2023-08-15T21:00:00"),
    price: 299,
    currency: "DKK",
    description: "Join us for a wonderful wine tasting event",
    wineDescription: "Selection of premium wines",
    menuDescription: "Gourmet dinner menu",
    images: [
      {
        id: "img1",
        url: "https://example.com/wine.jpg",
        altText: "Wine Image",
      },
      {
        id: "img2",
        url: "https://example.com/dinner.jpg",
        altText: "Dinner Image",
      },
    ],
  };

  it("renders event details correctly with complete data", () => {
    render(<EventDetails eventDetails={mockEventDetails} />);

    // Check heading
    expect(screen.getByTestId("event-details-title")).toHaveTextContent(
      "Event's details",
    );

    // Check seats availability
    const seatsElement = screen.getByTestId("event-details-seats");
    expect(seatsElement).toHaveTextContent("Seats available 15/20");
    expect(seatsElement).toHaveClass("bg-calendar-open_light");
    expect(seatsElement).toHaveClass("text-calendar-open_dark");

    // Check location
    expect(screen.getByTestId("event-details-location")).toHaveTextContent(
      "Copenhagen Wine Bar",
    );
    expect(screen.getByAltText("Location icon")).toBeInTheDocument();

    // Check date
    expect(screen.getByTestId("event-details-date")).toHaveTextContent(
      "August, 15th, 2023",
    );
    expect(screen.getByAltText("Calendar icon")).toBeInTheDocument();

    // Check time
    expect(screen.getByTestId("event-details-time")).toHaveTextContent(
      "From 6:00 pm to 9:00 pm",
    );
    expect(screen.getByAltText("Clock icon")).toBeInTheDocument();

    // Check price
    expect(screen.getByTestId("event-details-price")).toHaveTextContent(
      "From 299 kr. per person",
    );
    expect(screen.getByAltText("Money icon")).toBeInTheDocument();

    // Check description
    expect(screen.getByTestId("event-details-description")).toHaveTextContent(
      "Join us for a wonderful wine tasting event",
    );

    // Check InfoCards
    expect(screen.getByTestId("event-details-cards")).toBeInTheDocument();

    // Check wine card
    expect(screen.getByTestId("event-details-wine-card")).toBeInTheDocument();
    expect(screen.getAllByTestId("info-card-title")[0]).toHaveTextContent(
      "Our Wines",
    );
    expect(screen.getAllByTestId("info-card-image-url")[0]).toHaveTextContent(
      "https://example.com/wine.jpg",
    );
    expect(screen.getAllByTestId("info-card-image-alt")[0]).toHaveTextContent(
      "Wine Image",
    );
    expect(screen.getAllByTestId("info-card-description")[0]).toHaveTextContent(
      "Selection of premium wines",
    );

    // Check dinner card
    expect(screen.getByTestId("event-details-menu-card")).toBeInTheDocument();
    expect(screen.getAllByTestId("info-card-title")[1]).toHaveTextContent(
      "Our Dinner Menu",
    );
    expect(screen.getAllByTestId("info-card-image-url")[1]).toHaveTextContent(
      "https://example.com/dinner.jpg",
    );
    expect(screen.getAllByTestId("info-card-image-alt")[1]).toHaveTextContent(
      "Dinner Image",
    );
    expect(screen.getAllByTestId("info-card-description")[1]).toHaveTextContent(
      "Gourmet dinner menu",
    );

    // Check footer note
    expect(screen.getByTestId("event-details-footer")).toHaveTextContent(
      "For allergies or special requests",
    );
  });

  it("renders with minimal data and default values", () => {
    render(<EventDetails />);

    // Check heading is still there
    expect(screen.getByTestId("event-details-title")).toBeInTheDocument();

    // Check seats availability with empty value
    expect(screen.getByTestId("event-details-seats")).toHaveTextContent(
      "Seats available",
    );
    expect(screen.getByTestId("event-details-seats")).not.toHaveTextContent(
      /Seats available \d+\/\d+/,
    );

    // Check location with empty value
    const locationElement = screen.getByTestId("event-details-location");
    expect(locationElement.textContent.trim()).toBe("");

    // Check date with empty value
    const dateElement = screen.getByTestId("event-details-date");
    expect(dateElement.textContent.trim()).toBe("");

    // Check time with empty value
    const timeElement = screen.getByTestId("event-details-time");
    expect(timeElement.textContent.trim()).toBe("");

    // Check price with empty value
    expect(screen.getByTestId("event-details-price")).toHaveTextContent(
      "From per person",
    );

    // InfoCards should still be rendered with default images
    expect(screen.getByTestId("event-details-wine-card")).toBeInTheDocument();
    expect(screen.getByTestId("event-details-menu-card")).toBeInTheDocument();

    // Check default image URLs
    expect(screen.getAllByTestId("info-card-image-url")[0]).toHaveTextContent(
      "/images/wines.svg",
    );
    expect(screen.getAllByTestId("info-card-image-url")[1]).toHaveTextContent(
      "/images/dinner.svg",
    );
  });

  it("applies correct styling for full events (0 seats available)", () => {
    const fullEvent = {
      ...mockEventDetails,
      availableSeats: 0,
      totalInventory: 20,
    };

    render(<EventDetails eventDetails={fullEvent} />);

    const seatsElement = screen.getByTestId("event-details-seats");
    expect(seatsElement).toHaveClass("bg-calendar-full_light");
    expect(seatsElement).toHaveClass("text-calendar-full");
  });

  it("applies correct styling for limited availability (exactly 50%)", () => {
    const limitedEvent = {
      ...mockEventDetails,
      availableSeats: 10,
      totalInventory: 20,
    };

    render(<EventDetails eventDetails={limitedEvent} />);

    const seatsElement = screen.getByTestId("event-details-seats");
    expect(seatsElement).toHaveClass("bg-calendar-limited_light");
    expect(seatsElement).toHaveClass("text-calendar-limited");
  });

  it("applies correct styling for limited availability (less than 50%)", () => {
    const limitedEvent = {
      ...mockEventDetails,
      availableSeats: 8,
      totalInventory: 20,
    };

    render(<EventDetails eventDetails={limitedEvent} />);

    const seatsElement = screen.getByTestId("event-details-seats");
    expect(seatsElement).toHaveClass("bg-calendar-limited_light");
    expect(seatsElement).toHaveClass("text-calendar-limited");
  });

  it("applies correct styling for open availability (more than 50%)", () => {
    const openEvent = {
      ...mockEventDetails,
      availableSeats: 15,
      totalInventory: 20,
    };

    render(<EventDetails eventDetails={openEvent} />);

    const seatsElement = screen.getByTestId("event-details-seats");
    expect(seatsElement).toHaveClass("bg-calendar-open_light");
    expect(seatsElement).toHaveClass("text-calendar-open_dark");
  });

  it("applies correct styling for small events with all seats available", () => {
    const smallEvent = {
      ...mockEventDetails,
      availableSeats: 8,
      totalInventory: 8,
    };

    render(<EventDetails eventDetails={smallEvent} />);

    const seatsElement = screen.getByTestId("event-details-seats");
    expect(seatsElement).toHaveClass("bg-calendar-open_light");
    expect(seatsElement).toHaveClass("text-calendar-open_dark");
  });

  it("handles date formatting errors gracefully", () => {
    const invalidDateEvent = {
      ...mockEventDetails,
      date: "invalid-date",
    };

    render(<EventDetails eventDetails={invalidDateEvent} />);

    expect(logError).toHaveBeenCalledWith(
      "Error formatting date:",
      expect.any(String),
    );

    const dateElement = screen.getByTestId("event-details-date");
    expect(dateElement).toHaveTextContent("invalid-date");
  });

  it("handles time formatting errors gracefully", () => {
    const invalidDate1 = new Date("invalid");
    const invalidDate2 = new Date("also-invalid");

    const eventWithInvalidTime = {
      ...mockEventDetails,
      timeStart: invalidDate1,
      timeEnd: invalidDate2,
    };

    render(<EventDetails eventDetails={eventWithInvalidTime} />);

    expect(screen.getByTestId("event-details-time")).toBeInTheDocument();
    expect(logError).toHaveBeenCalledWith(
      "Error formatting time:",
      expect.any(String),
    );
  });

  it("handles currency display correctly", () => {
    const dkkEvent = {
      ...mockEventDetails,
      price: 299,
      currency: "DKK",
    };

    const { rerender } = render(<EventDetails eventDetails={dkkEvent} />);

    expect(screen.getByTestId("event-details-price")).toHaveTextContent(
      "From 299 kr. per person",
    );

    const usdEvent = {
      ...mockEventDetails,
      price: 49,
      currency: "USD",
    };

    rerender(<EventDetails eventDetails={usdEvent} />);

    expect(screen.getByTestId("event-details-price")).toHaveTextContent(
      "From 49 USD per person",
    );
  });
});
