/* eslint-disable react/prop-types */
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import EventDetails from "@/components/EventModal/EventDetails";
import { useLanguage } from "@/context/LanguageContext";

// Mock dependencies
jest.mock("@/context/LanguageContext", () => ({
  useLanguage: jest.fn(),
}));

// Mock the InfoCard component
jest.mock("@/components/EventModal/InfoCard", () => {
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
    totalSeats: 20,
    location: "Copenhagen Wine Bar",
    formattedDate: "August 15, 2023",
    formattedDateFull: "August 15th, 2023",
    formattedTimeStart: "6:00 pm",
    formattedTimeEnd: "9:00 pm",
    price: 299,
    currency: "DKK",
    description: "Join us for a wonderful wine tasting event",
    wineDescription: "Selection of premium wines",
    menuDescription: "Gourmet dinner menu",
    seatStatus: {
      bgColor: "bg-calendar-open_light",
      textColor: "text-calendar-open_dark",
      borderColor: "border-calendar-open",
    },
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

  it("renders event details correctly with English language", () => {
    // Mock English language
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

    render(<EventDetails eventDetails={mockEventDetails} />);

    expect(screen.getByTestId("event-details-title")).toHaveTextContent(
      "Event's details",
    );

    expect(screen.getByTestId("event-details-seats")).toHaveTextContent(
      "Seats available 15/20",
    );

    expect(screen.getByTestId("event-details-location")).toHaveTextContent(
      "Copenhagen Wine Bar",
    );
    expect(screen.getByAltText("Location icon")).toBeInTheDocument();

    expect(screen.getByTestId("event-details-date")).toHaveTextContent(
      "August 15th, 2023",
    );
    expect(screen.getByAltText("Calendar icon")).toBeInTheDocument();

    expect(screen.getByTestId("event-details-time")).toHaveTextContent(
      "From 6:00 pm to 9:00 pm",
    );
    expect(screen.getByAltText("Clock icon")).toBeInTheDocument();

    expect(screen.getByTestId("event-details-price")).toHaveTextContent(
      "From 299 kr. per person",
    );
    expect(screen.getByAltText("Money icon")).toBeInTheDocument();
  });

  it("renders event details correctly with Danish language", () => {
    // Mock Danish language
    const danishEvent = {
      ...mockEventDetails,
      formattedDate: "15 august, 2023",
      formattedDateFull: "15. august 2023",
      formattedTimeStart: "18:00",
      formattedTimeEnd: "21:00",
    };

    useLanguage.mockReturnValue({
      language: "dk",
      translations: {
        "event.details.title": "Begivenhedsdetaljer",
        "event.details.seatsAvailable": "Ledige pladser",
        "event.details.from": "Fra",
        "event.details.to": "til",
        "event.details.perPerson": "per person",
        "event.details.allergies":
          "(*) Ved allergier eller særlige ønsker, kontakt os venligst efter bekræftelse af din reservation.",
        "event.details.wineCard.title": "Vores Vine",
        "event.details.menuCard.title": "Vores Middagsmenu",
      },
    });

    render(<EventDetails eventDetails={danishEvent} />);

    expect(screen.getByTestId("event-details-title")).toHaveTextContent(
      "Begivenhedsdetaljer",
    );

    expect(screen.getByTestId("event-details-seats")).toHaveTextContent(
      "Ledige pladser 15/20",
    );

    expect(screen.getByTestId("event-details-location")).toHaveTextContent(
      "Copenhagen Wine Bar",
    );

    expect(screen.getByTestId("event-details-date")).toHaveTextContent(
      "15. august 2023",
    );

    expect(screen.getByTestId("event-details-time")).toHaveTextContent(
      "Fra 18:00 til 21:00",
    );

    expect(screen.getByTestId("event-details-price")).toHaveTextContent(
      "Fra 299 kr. per person",
    );
  });

  it("renders with minimal data and default values", () => {
    render(<EventDetails />);

    expect(screen.getByTestId("event-details-title")).toBeInTheDocument();

    expect(screen.getByTestId("event-details-seats")).toHaveTextContent(
      "Seats available",
    );
    expect(screen.getByTestId("event-details-seats")).not.toHaveTextContent(
      /Seats available \d+\/\d+/,
    );

    const locationElement = screen.getByTestId("event-details-location");
    expect(locationElement.textContent.trim()).toBe("");

    const dateElement = screen.getByTestId("event-details-date");
    expect(dateElement.textContent.trim()).toBe("");

    const timeElement = screen.getByTestId("event-details-time");
    expect(timeElement.textContent.trim()).toBe("");

    expect(screen.getByTestId("event-details-price")).toHaveTextContent(
      "From per person",
    );

    expect(screen.getByTestId("event-details-wine-card")).toBeInTheDocument();
    expect(screen.getByTestId("event-details-menu-card")).toBeInTheDocument();

    expect(screen.getAllByTestId("info-card-image-url")[0]).toHaveTextContent(
      "/images/wines.svg",
    );
    expect(screen.getAllByTestId("info-card-image-url")[1]).toHaveTextContent(
      "/images/dinner.svg",
    );
  });

  it("applies the provided styling classes correctly", () => {
    const eventWithStyling = {
      ...mockEventDetails,
      seatStatus: {
        bgColor: "custom-bg-class",
        textColor: "custom-text-class",
        borderColor: "custom-border-class",
      },
    };

    render(<EventDetails eventDetails={eventWithStyling} />);

    const seatsElement = screen.getByTestId("event-details-seats");
    expect(seatsElement).toHaveClass("custom-bg-class");
    expect(seatsElement).toHaveClass("custom-text-class");
  });

  it("handles currency display correctly for DKK", () => {
    const dkkEvent = {
      ...mockEventDetails,
      price: 299,
      currency: "DKK",
    };

    render(<EventDetails eventDetails={dkkEvent} />);

    expect(screen.getByTestId("event-details-price")).toHaveTextContent(
      "From 299 kr. per person",
    );
  });

  it("handles currency display correctly for EUR", () => {
    cleanup();
    const euroEvent = {
      ...mockEventDetails,
      price: 49,
      currency: "EUR",
    };

    render(<EventDetails eventDetails={euroEvent} />);

    expect(screen.getByTestId("event-details-price")).toHaveTextContent(
      "From 49 EUR per person",
    );
  });
});
