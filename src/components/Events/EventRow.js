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

  return (
    <div className={`mb-4 border-l-4 ${seatStatus.borderColor}`}>
      <div className="p-4">
        <div className="flex flex-col justify-between items-start mb-2">
          <div className="text-bodyMedium">{formattedDate}</div>
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
            variant="eventButton"
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
    borderColor: PropTypes.string,
  }).isRequired,
  showModal: PropTypes.func.isRequired,
};

export default EventRow;
