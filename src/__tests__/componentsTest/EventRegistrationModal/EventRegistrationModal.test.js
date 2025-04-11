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

    // Click on the overlay (outside the modal content)
    fireEvent.mouseDown(screen.getByTestId("event-registration-modal-overlay"));

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

    // Click inside the modal content
    fireEvent.mouseDown(screen.getByTestId("event-registration-modal-content"));

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("handles empty event object gracefully", () => {
    render(
      <EventRegistrationModal
        isOpen={true}
        onClose={mockOnClose}
        event={undefined}
      />,
    );

    // Check that EventDetails was called with the correct props
    expect(EventDetails.mock.calls[0][0]).toEqual({ eventDetails: {} });

    // Check that Registration was called with the correct props
    expect(Registration.mock.calls[0][0]).toEqual({
      eventDetails: {},
      onClose: mockOnClose,
    });
  });

  it("removes event listener when component unmounts", async () => {
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");

    const { unmount } = render(
      <EventRegistrationModal
        isOpen={true}
        onClose={mockOnClose}
        event={mockEvent}
      />,
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
      <EventRegistrationModal
        isOpen={false}
        onClose={mockOnClose}
        event={mockEvent}
      />,
    );

    expect(addEventListenerSpy).not.toHaveBeenCalled();

    rerender(
      <EventRegistrationModal
        isOpen={true}
        onClose={mockOnClose}
        event={mockEvent}
      />,
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function),
    );

    addEventListenerSpy.mockRestore();
  });

  it("has proper accessibility attributes", () => {
    render(
      <EventRegistrationModal
        isOpen={true}
        onClose={mockOnClose}
        event={mockEvent}
      />,
    );

    const overlay = screen.getByTestId("event-registration-modal-overlay");
    expect(overlay).toHaveAttribute("role", "dialog");
    expect(overlay).toHaveAttribute("aria-modal", "true");
  });

  it("renders with proper styling", () => {
    render(
      <EventRegistrationModal
        isOpen={true}
        onClose={mockOnClose}
        event={mockEvent}
      />,
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
    expect(body).toHaveClass("p-6 md:p-8");
  });
});
