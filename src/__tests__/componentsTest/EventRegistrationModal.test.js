import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EventRegistrationModal from "@/components/EventRegistrationModal/EventRegistrationModal";
import EventDetails from "@/components/EventRegistrationModal/EventDetails";
import Registration from "@/components/EventRegistrationModal/Registration";

jest.mock("@/components/EventRegistrationModal/EventDetails", () => {
  return jest.fn(() => (
    <div data-testid="event-details-mock">Event Details Component</div>
  ));
});

jest.mock("@/components/EventRegistrationModal/Registration", () => {
  return jest.fn(() => (
    <div data-testid="registration-mock">Registration Component</div>
  ));
});

describe("EventRegistrationModal", () => {
  const mockEvent = {
    title: "Test Event",
    price: 50,
    currency: "DKK",
    availableSeats: 5,
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not render when isOpen is false", () => {
    const { container } = render(
      <EventRegistrationModal
        isOpen={false}
        onClose={mockOnClose}
        event={mockEvent}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders when isOpen is true", () => {
    render(
      <EventRegistrationModal
        isOpen={true}
        onClose={mockOnClose}
        event={mockEvent}
      />,
    );

    expect(screen.getByTestId("event-details-mock")).toBeInTheDocument();
    expect(screen.getByTestId("registration-mock")).toBeInTheDocument();
  });

  it("passes event data to child components", () => {
    render(
      <EventRegistrationModal
        isOpen={true}
        onClose={mockOnClose}
        event={mockEvent}
      />,
    );

    expect(EventDetails.mock.calls[0][0]).toEqual({
      eventDetails: mockEvent,
    });

    expect(Registration.mock.calls[0][0]).toEqual({
      eventDetails: mockEvent,
      onClose: mockOnClose,
    });
  });

  it("calls onClose when clicking outside the modal", () => {
    render(
      <EventRegistrationModal
        isOpen={true}
        onClose={mockOnClose}
        event={mockEvent}
      />,
    );
    fireEvent.mouseDown(document.body);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when clicking inside the modal", () => {
    render(
      <EventRegistrationModal
        isOpen={true}
        onClose={mockOnClose}
        event={mockEvent}
      />,
    );

    const modalContent = screen.getByTestId("event-details-mock");
    fireEvent.mouseDown(modalContent);

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
