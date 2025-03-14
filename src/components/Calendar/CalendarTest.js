import React from "react";
import CalendarItem from "./CalendarItem";

const CalendarTest = () => {
  const daysOfTheMonth = Array.from({ length: 28 }, (_, i) => i + 1);
  const randomSeatsAvailable = daysOfTheMonth.map(() =>
    Math.floor(Math.random() * 20),
  );
  const randomSeatsTotal = [
    0, 0, 0, 0, 0, 20, 20, 0, 0, 20, 0, 0, 0, 0, 20, 0, 0, 0, 20, 20,
  ];

  return (
    <section className="grid grid-cols-7 gap-0 justify-center w-full max-w-[calc(7*12.5rem)] mx-auto">
      {daysOfTheMonth.map((day) => (
        <CalendarItem
          key={day}
          dayOfMonth={day}
          seatsAvailable={randomSeatsAvailable[day - 1]}
          seatsTotal={randomSeatsTotal[day - 1]}
        />
      ))}
    </section>
  );
};

export default CalendarTest;
