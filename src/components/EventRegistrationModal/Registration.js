import React, { useState } from "react";
import PropTypes from "prop-types";

function Registration({ eventDetails = {}, onClose }) {
  const { availableSeats = 0, price = 0, currency = "Kr." } = eventDetails;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [seats, setSeats] = useState(1);
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h3 className="text-headlineSmall text-center font-medium font-barlow mb-4">
        Reservation contacts details
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full border border-tertiary2-normal rounded p-2 text-bodyLarge"
              placeholder="First Name*"
            />
          </div>
          <div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full border border-tertiary2-normal rounded p-2 text-bodyLarge"
              placeholder="Last Name*"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-tertiary2-normal rounded p-2 text-bodyLarge"
              placeholder="Email Address*"
            />
          </div>
          <div>
            <input
              type="email"
              id="confirmEmail"
              name="confirmEmail"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
              className="w-full border border-tertiary2-normal rounded p-2 text-bodyLarge"
              placeholder="Confirm Email Address*"
            />
          </div>
        </div>
        <div className="mb-4">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full md:w-[49%] border border-tertiary2-normal rounded p-2 text-bodyLarge"
            placeholder="Phone Number*"
          />
        </div>
        <div className="flex flex-col sm:flex-row md:flex-row space-x-6 mb-4">
          <div>
            <label
              htmlFor="seats"
              className="block text-bodyMedium font-medium mb-1"
            >
              How many seats would you like to reserve?
            </label>
            <p className="text-bodySmall text-tertiary1-normal mb-2">
              Select your desired seats using the seat selector.
            </p>
          </div>
          <div className="flex items-center gap-9">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSeats(Math.max(1, seats - 1))}
                className="border border-tertiary2-normal px-3 py-1 rounded hover:bg-tertiary2-hover_normal"
              >
                –
              </button>
              <input
                type="number"
                id="seats"
                name="seats"
                min="1"
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                required
                className="w-16 text-center border border-tertiary2-normal rounded py-1"
              />
              <button
                type="button"
                onClick={() => setSeats(seats + 1)}
                className="border border-tertiary2-normal px-3 py-1 rounded hover:bg-tertiary2-hover_normal"
              >
                +
              </button>
            </div>
            <div className="flex items-center">
              <p className="text-bodyMedium font-semibold">
                {currency === "DKK" ? "Kr." : currency}{" "}
                {(Number(price) * Number(seats)).toLocaleString("da-DK", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="agree"
            name="agree"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            required
            className="mr-2 accent-primary-normal"
          />
          <label htmlFor="agree" className="text-bodySmall">
            I agree with terms and conditions.
          </label>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
          <div className="flex flex-col md:flex-row w-full gap-2 mb-4 md:mb-0">
            <button
              type="button"
              className="w-full md:flex-1 bg-primary-normal hover:bg-primary-hover_normal text-white px-4 py-2 rounded font-medium"
              onClick={onClose}
            >
              Close
            </button>

            <button
              type="submit"
              className="w-full md:flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium disabled:bg-blue-500 disabled:hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={!agree || availableSeats === 0}
            >
              <span>Pay with</span>
              <img
                src="/icons/brand.svg"
                alt="MobilePay Logo"
                className="!w-[7rem] h-8"
              />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

Registration.propTypes = {
  eventDetails: PropTypes.shape({
    availableSeats: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    currency: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default Registration;
