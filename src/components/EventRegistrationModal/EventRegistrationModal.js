import React, { useState } from "react";
import InfoCard from "./InfoCard";
import PropTypes from "prop-types";

function EventRegistrationModal({ isOpen, onClose, eventDetails = {} }) {
  const {
    title = "🍷✨Event’s details ✨🍷",
    seatsAvailable = "20/20",
    location = "Christianshavns Vindegade 54 – 1424 København",
    date = "April 12, 2025",
    time = "From 8.00 pm to 11.00 pm",
    pricePerPerson = 50,
    description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                   Nam iaculis diam nec mollis felis. Nullam fermentum mollis vel est ac laoreet. 
                   Integer dignissim turpis sed lectus pulvinar. Quisque eu ipsum massa.`,
  } = eventDetails;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [seats, setSeats] = useState(1);
  const [agree, setAgree] = useState(false);

  // Convert seatsAvailable (e.g., "20/20") to a number
  const availableSeats =
    typeof seatsAvailable === "string"
      ? parseInt(seatsAvailable.split("/")[0], 10)
      : seatsAvailable;

  // Assign CSS classes based on available seats
  let seatBgClass = "bg-calendar-open";
  let seatTextClass = "text-white";
  if (availableSeats === 0) {
    seatBgClass = "bg-calendar-full";
    seatTextClass = "text-white";
  } else if (availableSeats < 10) {
    seatBgClass = "bg-calendar-limited";
    seatTextClass = "text-white";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate total payment cost
    const paymentCost = Number(pricePerPerson) * Number(seats);

    // Build the user confirmation email payload
    const userEmailPayload = {
      to: email,
      subject: `Reservation Confirmation - Event Date: ${date}`,
      body: `
Dear ${firstName} ${lastName},

Thank you for reserving your seats for our upcoming event. We are pleased to confirm your reservation.

Reservation Details:
- Event Date: ${date}
- Number of Seats Reserved: ${seats}
- Total Cost: ${paymentCost} kr

This is a temporary confirmation email with fictitious details.
We will update this template once the payment integration is finalized.

Thank you for choosing us!
Best regards,
The Donna Vino Team
      `,
    };

    // Call the email API to send the confirmation email to the user
    try {
      const userResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userEmailPayload),
      });
      const userResult = await userResponse.json();
    } catch (error) {
      console.error("Error sending user confirmation email:", error);
    }

    // Update available seats after reservation
    const updatedAvailableSeats = availableSeats - seats;

    // If the event is fully booked, send a notification email to the company
    if (updatedAvailableSeats <= 0) {
      const companyEmailPayload = {
        to: "info@donnavino.dk",
        subject: `Event Full Notification - ${title}`,
        body: `
Dear Donna Vino Team,

This is an automated notification that the event "${title}" is now fully booked or is scheduled for one day before the event.

Event Details:
- Event Date: ${date}
- Location: ${location}
- Time: ${time}
- Price per Person: ${pricePerPerson} kr
- Remaining Seats: ${updatedAvailableSeats}

Please review the event status and take the necessary actions.
Best regards,
Your Reservation System
        `,
      };

      try {
        const companyResponse = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(companyEmailPayload),
        });
        const companyResult = await companyResponse.json();
      } catch (error) {
        console.error("Error sending fully booked email:", error);
      }
    }

    alert("Reservation successful, confirmation email sent.");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-lg">
          <div className="p-6 md:p-8 font-roboto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h2 className="w-full text-headlineSmall md:text-headlineMedium font-semibold font-barlow text-center">
                {title}
              </h2>
            </div>
            <div className="text-bodyMedium text-tertiary1-normal space-y-1 mb-6 text-center">
              <span
                className={`inline-block ${seatBgClass} ${seatTextClass} text-bodySmall px-4 py-1 rounded-full`}
              >
                Seats available {seatsAvailable}
              </span>
              <div className="flex items-center gap-2 justify-center">
                <img
                  src="/icons/pin.svg"
                  alt="Location icon"
                  className="h-6 w-6"
                />
                <p>{location}</p>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <img
                  src="/icons/calendar1.svg"
                  alt="Calendar icon"
                  className="h-6 w-6"
                />
                <p>{date}</p>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <img
                  src="/icons/clock-alt-1.svg"
                  alt="Clock icon"
                  className="h-6 w-6"
                />
                <p>{time}</p>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <img
                  src="/icons/Money.svg"
                  alt="Money icon"
                  className="h-6 w-6"
                />
                <p>From {pricePerPerson} kr. per person</p>
              </div>
            </div>
            <p className="text-bodyMedium text-tertiary1-normal mb-6">
              {description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <InfoCard
                title="Our Wines"
                imageUrl="/images/wines.svg"
                description="From our winery in Rocca Alta, Valpolicella – Verona, we bring you a curated selection of Amarone della Valpolicella and Valpolicella Ripasso from various vintages, showcasing the finest wines Italy has to offer."
                bgClass="bg-primary-light"
              />

              <InfoCard
                title="Our Dinner Menu"
                imageUrl="/images/dinner.svg"
                description="Our wine tasting experience will be perfectly paired with the following menu:(*)"
                bulletPoints={[
                  "🍷 Aperitif: Italian cold cuts and salami",
                  "🍝 First Course: Pasta Carbonara",
                  "🥩 Main Course: Filet Mignon",
                  "🍰 Dessert: Tiramisu",
                ]}
                bgClass="bg-primary-active"
              />
            </div>
            <p className="text-bodySmall text-tertiary1-normal italic mb-6 text-center">
              (*) For allergies or special requests, please contact us after
              confirming your reservation.
            </p>
            <hr className="border-tertiary2-normal mb-6" />
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
                      Kr. {Number(pricePerPerson) * Number(seats)},00
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
          </div>
        </div>
      </div>
    </div>
  );
}

EventRegistrationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  eventDetails: PropTypes.shape({
    title: PropTypes.string,
    seatsAvailable: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    location: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    pricePerPerson: PropTypes.number,
    description: PropTypes.string,
  }),
};

export default EventRegistrationModal;
