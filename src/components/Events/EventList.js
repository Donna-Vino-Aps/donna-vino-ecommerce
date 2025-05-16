"use client";

import React from "react";
import PropTypes from "prop-types";
import { useLanguage } from "@/context/LanguageContext";
import { useCalendar } from "@/context/CalendarContext";
import { format } from "date-fns";
import { getLocale } from "@/utils/dateTimeFormatting";
import EventRow from "./EventRow";

const EventList = ({ events, onEventClick }) => {
  const { language, translations } = useLanguage();
  const { selectedMonth, selectedYear } = useCalendar();

  const renderMonthHeader = () => (
    <h2 className="mb-4 flex w-full items-baseline gap-1 rounded-[0.5rem] bg-tertiary2-normal px-4 py-2 text-titleMedium font-medium">
      <span>{translations["events.upcomingTitle"]}</span>
      <span className="font-semibold">
        {format(new Date(selectedYear, selectedMonth - 1, 1), "MMMM", {
          locale: getLocale(language),
        })}
      </span>
    </h2>
  );

  const renderEmptyState = () => (
    <>
      {renderMonthHeader()}
      <p className="py-8 text-center">
        {translations["events.noEventsForMonth"]}
      </p>
    </>
  );

  const renderEventList = () => (
    <>
      {renderMonthHeader()}

      <div className="flex flex-row gap-2 rounded-t bg-tertiary2-active p-3 pb-7 text-titleMedium font-medium text-tertiary1-active_dark">
        <p className="w-[22%] text-center">
          {translations["events.dateHeader"]}
        </p>
        <p className="w-[56%] text-center">
          {translations["events.detailsHeader"]}
        </p>
        <p className="w-[22%] text-center">
          {translations["events.availableSeatsHeader"]}
        </p>
      </div>

      <div className="w-full overflow-y-auto rounded-b bg-tertiary2-active p-2 text-tertiary1-active_dark ">
        {events.map((event) => (
          <EventRow
            key={event.id}
            event={event}
            showModal={() => onEventClick(event)}
          />
        ))}
      </div>
    </>
  );

  return (
    <div className="mx-auto mb-12 flex flex-col overflow-hidden sm:min-w-[37rem] xl:mx-0 xl:h-[31rem]">
      {events.length === 0 ? renderEmptyState() : renderEventList()}
    </div>
  );
};

EventList.propTypes = {
  events: PropTypes.array.isRequired,
  onEventClick: PropTypes.func.isRequired,
};

export default EventList;
