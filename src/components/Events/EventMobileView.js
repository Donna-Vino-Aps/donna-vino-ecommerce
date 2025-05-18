"use client";

import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";

const EventMobileView = ({
  event,
  showModal,
  activeView = "date",
  dateTabId,
  detailsTabId,
  dateContentId,
  detailsContentId,
}) => {
  const {
    wine,
    winery,
    availableSeats,
    totalSeats,
    formattedDate,
    formattedTimeStart,
    formattedTimeEnd,
    seatStatus,
  } = event;

  const isFull = availableSeats === 0 && totalSeats > 0;
  const { translations } = useLanguage();

  return (
    <div
      className={`min-h-[8rem] border-l-4 bg-tertiary2-active shadow-sm sm:min-h-[7.9rem] ${seatStatus.borderColor}`}
    >
      {activeView === "date" && (
        <div
          id={dateContentId}
          role="tabpanel"
          aria-labelledby={dateTabId}
          className="p-4"
        >
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="text-labelMedium font-medium sm:text-labelLarge">
                {formattedDate}
              </p>
              <p className="text-labelMedium sm:text-labelLarge">
                {formattedTimeStart} - {formattedTimeEnd}
              </p>
            </div>

            <div className="text-right">
              <p className="mb-1 text-labelMedium font-medium sm:text-labelLarge">
                {translations["event.details.seatsAvailable"]}
              </p>
              <div
                className={`inline-block rounded-full px-3 py-1 text-center text-labelMedium font-regular sm:text-labelLarge ${seatStatus.bgColor} ${seatStatus.textColor}`}
                aria-label={`${availableSeats} ${translations["events.of"]} ${totalSeats} ${translations["event.details.seatsAvailable"]}`}
              >
                {availableSeats} {translations["events.of"]} {totalSeats}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              text={translations["events.bookSeats"]}
              variant="redSmall"
              onClick={() => showModal(event)}
              disabled={isFull}
              ariaLabel={translations["events.bookSeats"]}
              testId="book-seats-mobile"
            />
          </div>
        </div>
      )}

      {activeView === "details" && (
        <div
          id={detailsContentId}
          role="tabpanel"
          aria-labelledby={detailsTabId}
          className="p-4"
        >
          <div className="mb-3">
            <p className="text-labelMedium sm:text-labelLarge">
              <span className="font-medium">
                {translations["events.wines"]}
              </span>
              <span dangerouslySetInnerHTML={{ __html: wine }} />
            </p>
          </div>

          <div>
            <p className="text-labelMedium sm:text-labelLarge">
              <span className="font-medium">
                {translations["events.winery"]}
              </span>
              <span dangerouslySetInnerHTML={{ __html: winery }} />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

EventMobileView.propTypes = {
  event: PropTypes.shape({
    wine: PropTypes.string,
    winery: PropTypes.string,
    availableSeats: PropTypes.number,
    totalSeats: PropTypes.number,
    formattedDate: PropTypes.string,
    formattedTimeStart: PropTypes.string,
    formattedTimeEnd: PropTypes.string,
    seatStatus: PropTypes.shape({
      bgColor: PropTypes.string,
      textColor: PropTypes.string,
      borderColor: PropTypes.string,
    }).isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  showModal: PropTypes.func.isRequired,
  activeView: PropTypes.oneOf(["date", "details"]),
  // ARIA-related props
  dateTabId: PropTypes.string,
  detailsTabId: PropTypes.string,
  dateContentId: PropTypes.string,
  detailsContentId: PropTypes.string,
};

export default EventMobileView;
