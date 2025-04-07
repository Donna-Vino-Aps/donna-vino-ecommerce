import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import EventDetails from "./EventDetails";
import Registration from "./Registration";

function EventRegistrationModal({ isOpen, onClose, eventDetails = {} }) {
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
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={modalRef}
          className="relative w-full max-w-3xl bg-white rounded-lg shadow-lg"
        >
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
