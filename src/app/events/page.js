"use client";

import CalendarFrame from "@/components/Calendar/CalendarFrame";
import EventsHeader from "@/components/Events/EventsHeader";
import { EventsProvider } from "@/context/EventsContext";
import React from "react";

const Events = () => {
  return (
    <EventsProvider>
      <>
        <EventsHeader />
        <CalendarFrame />
      </>
    </EventsProvider>
  );
};

export default Events;
