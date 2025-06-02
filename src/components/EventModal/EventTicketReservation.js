"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLanguage } from "@/context/LanguageContext";
import EventCheckoutButton from "@/components/Events/EventCheckoutButton";
import Button from "@/components/Button/Button";

function EventTicketReservation({ eventDetails = {}, onClose }) {
  const { translations } = useLanguage();
  const {
    availableSeats = 0,
    price = 0,
    currency = "Kr.",
    variantId,
  } = eventDetails;

  const [seats, setSeats] = useState(1);
  const [agree, setAgree] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h3 className="mb-8 text-center font-barlow text-headlineSmall font-medium sm:mb-6">
        {translations["event.reservation.title"]}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="mb-8 sm:flex-1">
            <label
              htmlFor="seats"
              className="mb-1 block text-titleSmall font-medium sm:text-titleMedium"
            >
              {translations["event.reservation.seats"]}
            </label>
            <p className="text-bodySmall font-regular text-tertiary2-hover_dark sm:text-bodyMedium">
              {translations["event.reservation.selectSeats"]}
            </p>
          </div>
          <div className="mb-8 flex items-center justify-between sm:flex-1">
            <div className="flex items-stretch text-titleLarge">
              <button
                type="button"
                onClick={() => setSeats(Math.max(1, seats - 1))}
                className="w-[2.5rem] rounded-bl rounded-tl border border-r-0 border-tertiary1-darker px-3 py-1"
              >
                –
              </button>
              <input
                type="number"
                id="seats"
                name="seats"
                min="1"
                max={availableSeats}
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                required
                className="w-[3.3rem] border border-tertiary1-darker py-1 text-center text-titleMedium"
              />
              <button
                type="button"
                onClick={() => setSeats(Math.min(availableSeats, seats + 1))}
                className="w-[2.5rem] rounded-br rounded-tr border border-l-0 border-tertiary1-darker px-3 py-1"
              >
                +
              </button>
            </div>
            <div className="flex items-center">
              <p className="text-headlineSmall font-semibold">
                {currency === "DKK" ? "Kr." : currency}{" "}
                {(Number(price) * Number(seats)).toLocaleString("da-DK", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="agree"
            name="agree"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            required
            className="mr-2 size-5 rounded accent-secondary-normal"
          />
          <label htmlFor="agree" className="text-bodyLarge">
            {translations["event.reservation.acceptTerms1"]}
            <a
              className="underline"
              href="https://shop.donnavino.dk/sales-policy"
              role="navigation"
              aria-label="Link to Sales Policy"
            >
              {translations["event.reservation.acceptTerms2"]}
            </a>
          </label>
        </div>
        <div className="mb-4 flex w-full flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 flex w-full flex-col gap-2 md:mb-0 md:flex-row">
            <div className="w-full md:flex-1">
              <Button
                text={translations["event.reservation.close"]}
                width="full"
                onClick={onClose}
                ariaLabel={translations["event.reservation.close"]}
                testId="close-reservation-button"
              />
            </div>

            {variantId ? (
              <div className="w-full md:flex-1">
                <EventCheckoutButton
                  variantId={variantId}
                  quantity={seats}
                  disabled={
                    !agree || availableSeats === 0 || seats > availableSeats
                  }
                  onError={setCheckoutError}
                />
              </div>
            ) : null}
          </div>
        </div>
      </form>
      {checkoutError && (
        <div className="mb-2 text-center text-primary-normal" role="alert">
          {checkoutError}
        </div>
      )}
    </>
  );
}

EventTicketReservation.propTypes = {
  eventDetails: PropTypes.shape({
    availableSeats: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    currency: PropTypes.string,
    variantId: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default EventTicketReservation;
