import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import EventDetails from "./EventDetails";
import EventTicketReservation from "./EventTicketReservation";

function EventModal({ isOpen, onClose, event = {} }) {
  const eventDetails = event;
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      data-testid="event-registration-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50"
      role="dialog"
      aria-modal="true"
    >
      <div
        data-testid="event-registration-modal-container"
        className="flex min-h-full items-center justify-center p-4"
      >
        <div
          data-testid="event-registration-modal-content"
          ref={modalRef}
          className="relative w-full max-w-[50rem] rounded-lg bg-white shadow-lg"
        >
          <div
            data-testid="event-registration-modal-body"
            className="p-4 md:p-8"
          >
            <EventDetails eventDetails={eventDetails} />
            <EventTicketReservation
              eventDetails={eventDetails}
              onClose={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

EventModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  event: PropTypes.object,
};

export default EventModal;
