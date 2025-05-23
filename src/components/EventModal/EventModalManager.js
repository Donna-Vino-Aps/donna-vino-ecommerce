"use client";

import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import EventModal from "./EventModal";

const EventModalManager = ({ children }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback((event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  }, []);

  const childrenContent = useMemo(() => {
    return children({ onEventClick: handleOpenModal });
  }, [children, handleOpenModal]);

  return (
    <>
      {childrenContent}

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

EventModalManager.propTypes = {
  children: PropTypes.func.isRequired,
};

export default EventModalManager;
