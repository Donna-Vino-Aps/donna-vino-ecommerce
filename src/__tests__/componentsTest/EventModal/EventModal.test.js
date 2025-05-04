import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EventModal from "@/components/EventModal/EventModal";
import EventDetails from "@/components/EventModal/EventDetails";
import EventTicketReservation from "@/components/EventModal/EventTicketReservation";

jest.mock("@/components/EventModal/EventDetails", () => {
  return jest.fn(() => (
    <div data-testid="event-details-mock">Event Details Component</div>
  ));
});

jest.mock("@/components/EventModal/EventTicketReservation", () => {
  return jest.fn(() => (
    <div data-testid="event-ticket-reservation-mock">
      Event Ticket Reservation Component
    </div>
  ));
});

describe("EventModal", () => {
  const mockEvent = {
    title: "Test Event",
    price: 50,
    currency: "DKK",
    availableSeats: 5,
    totalInventory: 10,
    location: "Copenhagen",
    date: "2023-08-15",
    timeStart: "18:00",
    timeEnd: "21:00",
    description: "A test event description",
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not render when isOpen is false", () => {
    const { container } = render(
      <EventModal isOpen={false} onClose={mockOnClose} event={mockEvent} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders when isOpen is true", () => {
    render(
      <EventModal isOpen={true} onClose={mockOnClose} event={mockEvent} />,
    );

    expect(
      screen.getByTestId("event-registration-modal-overlay"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("event-registration-modal-container"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("event-registration-modal-content"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("event-registration-modal-body"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("event-details-mock")).toBeInTheDocument();
    expect(
      screen.getByTestId("event-ticket-reservation-mock"),
    ).toBeInTheDocument();
  });

  it("passes event data to child components", () => {
    render(
      <EventModal isOpen={true} onClose={mockOnClose} event={mockEvent} />,
    );

    expect(EventDetails.mock.calls[0][0]).toEqual({
      eventDetails: mockEvent,
    });

    expect(EventTicketReservation.mock.calls[0][0]).toEqual({
      eventDetails: mockEvent,
      onClose: mockOnClose,
    });
  });

  it("calls onClose when clicking outside the modal", () => {
    render(
      <EventModal isOpen={true} onClose={mockOnClose} event={mockEvent} />,
    );

    // Click on the overlay (outside the modal content)
    fireEvent.mouseDown(screen.getByTestId("event-registration-modal-overlay"));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when clicking inside the modal", () => {
    render(
      <EventModal isOpen={true} onClose={mockOnClose} event={mockEvent} />,
    );

    // Click inside the modal content
    fireEvent.mouseDown(screen.getByTestId("event-registration-modal-content"));

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("handles empty event object gracefully", () => {
    render(
      <EventModal isOpen={true} onClose={mockOnClose} event={undefined} />,
    );

    // Check that EventDetails was called with the correct props
    expect(EventDetails.mock.calls[0][0]).toEqual({ eventDetails: {} });

    // Check that EventTicketReservation was called with the correct props
    expect(EventTicketReservation.mock.calls[0][0]).toEqual({
      eventDetails: {},
      onClose: mockOnClose,
    });
  });

  it("removes event listener when component unmounts", async () => {
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");

    const { unmount } = render(
      <EventModal isOpen={true} onClose={mockOnClose} event={mockEvent} />,
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function),
    );

    removeEventListenerSpy.mockRestore();
  });

  it("adds event listener when isOpen changes to true", () => {
    const addEventListenerSpy = jest.spyOn(document, "addEventListener");

    const { rerender } = render(
      <EventModal isOpen={false} onClose={mockOnClose} event={mockEvent} />,
    );

    expect(addEventListenerSpy).not.toHaveBeenCalled();

    rerender(
      <EventModal isOpen={true} onClose={mockOnClose} event={mockEvent} />,
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function),
    );

    addEventListenerSpy.mockRestore();
  });

  it("has proper accessibility attributes", () => {
    render(
      <EventModal isOpen={true} onClose={mockOnClose} event={mockEvent} />,
    );

    const overlay = screen.getByTestId("event-registration-modal-overlay");
    expect(overlay).toHaveAttribute("role", "dialog");
    expect(overlay).toHaveAttribute("aria-modal", "true");
  });

  it("renders with proper styling", () => {
    render(
      <EventModal isOpen={true} onClose={mockOnClose} event={mockEvent} />,
    );

    const overlay = screen.getByTestId("event-registration-modal-overlay");
    expect(overlay).toHaveClass(
      "fixed inset-0 z-50 overflow-y-auto bg-black/50",
    );

    const container = screen.getByTestId("event-registration-modal-container");
    expect(container).toHaveClass(
      "flex min-h-full items-center justify-center p-4",
    );

    const content = screen.getByTestId("event-registration-modal-content");
    expect(content).toHaveClass(
      "relative w-full max-w-[50rem] bg-white rounded-lg shadow-lg",
    );

    const body = screen.getByTestId("event-registration-modal-body");
    expect(body).toHaveClass("p-4 md:p-8");
  });
});
