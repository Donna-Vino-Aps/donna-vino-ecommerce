import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLanguage } from "@/context/LanguageContext";
import ShopifyBuyButton from "@/components/Button/ShopifyBuyButton";
import ShopifyCartButton from "@/components/Button/ShopifyCartButton";

function Registration({ eventDetails = {}, onClose }) {
  const { translations } = useLanguage();
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
      <h3 className="mb-4 text-center font-barlow text-headlineSmall font-medium">
        {translations["event.registration.title"]}
      </h3>
      {/* <form onSubmit={handleSubmit}> */}
      {/* <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">  */}
      {/* <div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full rounded border border-tertiary2-normal p-2 text-bodyLarge"
              placeholder={translations["event.registration.form.firstName"]}
            />
          </div> */}
      {/* <div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full rounded border border-tertiary2-normal p-2 text-bodyLarge"
              placeholder={translations["event.registration.form.lastName"]}
            />
          </div> 
        </div>
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">*/}
      {/* <div>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded border border-tertiary2-normal p-2 text-bodyLarge"
              placeholder={translations["event.registration.form.email"]}
            />
          </div> */}
      {/* <div>
            <input
              type="email"
              id="confirmEmail"
              name="confirmEmail"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
              className="w-full rounded border border-tertiary2-normal p-2 text-bodyLarge"
              placeholder={translations["event.registration.form.confirmEmail"]}
            />
          </div>
        </div> */}
      {/* <div className="mb-4">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full rounded border border-tertiary2-normal p-2 text-bodyLarge md:w-[49%]"
            placeholder={translations["event.registration.form.phone"]}
          />
        </div> */}
      {/* <div className="mb-4 flex flex-col space-x-6 sm:flex-row md:flex-row"> */}
      {/* <div>
            <label
              htmlFor="seats"
              className="mb-1 block text-bodyMedium font-medium"
            >
              {translations["event.registration.form.seats"]}
            </label>
            <p className="mb-2 text-bodySmall text-tertiary1-normal">
              {translations["event.registration.form.selectSeats"]}
            </p>
          </div> */}
      {/* <div className="flex items-center gap-9">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSeats(Math.max(1, seats - 1))}
                className="rounded border border-tertiary2-normal px-3 py-1 hover:bg-tertiary2-hover_normal"
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
                className="w-16 rounded border border-tertiary2-normal py-1 text-center"
              />
              <button
                type="button"
                onClick={() => setSeats(seats + 1)}
                className="rounded border border-tertiary2-normal px-3 py-1 hover:bg-tertiary2-hover_normal"
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
        </div> */}
      <div className="mb-6 flex items-center">
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
          {translations["event.registration.form.acceptTerms"]}
        </label>
      </div>
      <div className="flex w-full flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 flex w-full flex-col gap-2 md:mb-0 md:flex-row">
          <button
            type="button"
            className="relative top-5 max-h-[2.625rem] w-full rounded bg-primary-normal px-4 py-2 font-medium text-white hover:bg-primary-hover_normal md:flex-1"
            onClick={onClose}
          >
            {translations["event.registration.form.close"]}
          </button>

          {/* <ShopifyBuyButton /> */}
          <ShopifyCartButton />
        </div>
      </div>
      {/* </form> */}
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
