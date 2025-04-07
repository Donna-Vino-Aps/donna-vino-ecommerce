import React from "react";
import PropTypes from "prop-types";
import EventDetails from "./EventDetails";
import Registration from "./Registration";

function EventRegistrationModal({ isOpen, onClose, eventDetails = {} }) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50"
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-lg">
          <div className="p-6 md:p-8 font-roboto">
            <EventDetails eventDetails={eventDetails} />
            <Registration eventDetails={eventDetails} onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}

EventRegistrationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  eventDetails: PropTypes.object,
};

export default EventRegistrationModal;
