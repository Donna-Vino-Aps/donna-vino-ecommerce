"use client";

import CalendarFrame from "@/components/Calendar/CalendarFrame";
import EventsHeader from "@/components/Events/EventsHeader";
import React from "react";

const Events = () => {
  return (
    <div>
      <EventsHeader />
      <CalendarFrame />
    </div>
  );
};

export default Events;
