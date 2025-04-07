import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EventRegistrationModal from "@/components/EventRegistrationModal/EventRegistrationModal";

describe("EventRegistrationModal", () => {
  const eventDetails = {
    title: "Test Event Title",
    availableSeats: 2,
    totalInventory: 20,
    location: "Test Location",
    date: "April 12, 2025",
    timeStart: "2025-04-12T20:00:00.000",
    timeEnd: "2025-04-12T23:00:00.000",
    price: 50,
    currency: "DKK",
    description: "Test event description.",
    wineDescription: "Test wine description",
    menuDescription: "Test menu description",
  };

  it("does not render if isOpen is false", () => {
    const { container } = render(
      <EventRegistrationModal
        isOpen={false}
        onClose={jest.fn()}
        eventDetails={eventDetails}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders event details when isOpen is true", () => {
    render(
      <EventRegistrationModal
        isOpen={true}
        onClose={jest.fn()}
        eventDetails={eventDetails}
      />,
    );
    // Check for the fixed title instead of the event title
    expect(screen.getByText("🍷✨Event's details ✨🍷")).toBeInTheDocument();
    expect(screen.getByText("Test Location")).toBeInTheDocument();
    expect(screen.getByText("April 12, 2025")).toBeInTheDocument();
    expect(screen.getByText("From 8:00 PM to 11:00 PM")).toBeInTheDocument();
    expect(screen.getByText("From 50 DKK per person")).toBeInTheDocument();
  });

  it("calls onClose when Close button is clicked", () => {
    const onCloseMock = jest.fn();
    render(
      <EventRegistrationModal
        isOpen={true}
        onClose={onCloseMock}
        eventDetails={eventDetails}
      />,
    );
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("disables the Pay with MobilePay button when availableSeats is 0", () => {
    const eventDetailsNoSeats = { ...eventDetails, availableSeats: 0 };
    render(
      <EventRegistrationModal
        isOpen={true}
        onClose={jest.fn()}
        eventDetails={eventDetailsNoSeats}
      />,
    );
    const payButton = screen.getByRole("button", { name: /pay with/i });
    expect(payButton).toBeDisabled();
  });
});
