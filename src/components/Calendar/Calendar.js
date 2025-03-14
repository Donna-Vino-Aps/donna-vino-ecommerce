import React from "react";
import CalendarItem from "./CalendarItem";

const Calendar = () => {
  const daysOfTheMonth = Array.from({ length: 28 }, (_, i) => i + 1);
  const randomSeatsAvailable = daysOfTheMonth.map(() =>
    Math.floor(Math.random() * 20),
  );
  const randomSeatsTotal = [
    0, 0, 0, 0, 0, 20, 20, 0, 0, 20, 0, 0, 0, 0, 20, 0, 0, 0, 20, 20,
  ];

  const weekdayStyle =
    "flex bg-primary-normal h-16 justify-center items-center text-titleLarge text-tertiary2-light";

  return (
    <section className="grid grid-cols-7 gap-0 justify-center w-full max-w-[calc(7*12.5rem)] mx-auto border-tertiary1-light border-[1px]">
      <div className={weekdayStyle}>Monday</div>
      <div className={weekdayStyle}>Tuesday</div>
      <div className={weekdayStyle}>Wednesday</div>
      <div className={weekdayStyle}>Thursday</div>
      <div className={weekdayStyle}>Friday</div>
      <div className={weekdayStyle}>Saturday</div>
      <div className={weekdayStyle}>Sunday</div>
      {daysOfTheMonth.map((day) => (
        <CalendarItem
          key={day}
          dayOfMonth={day}
          icon="./icons/users-2.svg"
          seatsAvailable={randomSeatsAvailable[day - 1]}
          seatsTotal={randomSeatsTotal[day - 1]}
        />
      ))}
    </section>
  );
};

export default Calendar;
