import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";

const EventRow = ({
  event,
  formattedDate,
  formattedTimeStart,
  formattedTimeEnd,
  seatStatus,
  showModal,
}) => {
  const { wine, winery, availableSeats, totalInventory } = event;
  const isFull = availableSeats === 0 && totalInventory > 0;

  const borderColorClass = isFull
    ? "border-calendar-full"
    : seatStatus.bgColor === "bg-calendar-limited_light"
      ? "border-calendar-limited"
      : "border-calendar-open";

  return (
    <div
      className={`mb-4 border-l-4 ${borderColorClass} bg-white rounded shadow-sm`}
    >
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
          <div className="font-medium text-titleMedium">{formattedDate}</div>
          <div className="text-sm text-tertiary2-dark mt-1 md:mt-0">
            {formattedTimeStart} - {formattedTimeEnd}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-tertiary1-darker">
            <span className="font-medium">Wines:</span> {wine}
          </div>
          <div className="text-sm text-tertiary1-darker">
            <span className="font-medium">Winery:</span> {winery}
          </div>
          <div className="mt-2">
            {availableSeats} of {totalInventory}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            text="Book seats"
            variant="redSubmit"
            onClick={() => showModal(event)}
            disabled={isFull}
          />
        </div>
      </div>
    </div>
  );
};

EventRow.propTypes = {
  event: PropTypes.shape({
    wine: PropTypes.string,
    winery: PropTypes.string,
    availableSeats: PropTypes.number,
    totalInventory: PropTypes.number,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  formattedDate: PropTypes.string.isRequired,
  formattedTimeStart: PropTypes.string,
  formattedTimeEnd: PropTypes.string,
  seatStatus: PropTypes.shape({
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  showModal: PropTypes.func.isRequired,
};

export default EventRow;
