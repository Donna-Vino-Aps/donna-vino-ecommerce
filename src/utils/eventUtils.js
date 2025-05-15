export const getSeatStatus = (availableSeats, totalSeats, style = "list") => {
  const isFull = availableSeats === 0 && totalSeats > 0;
  const percentageAvailable =
    totalSeats > 0 ? (availableSeats / totalSeats) * 100 : 0;

  const statuses = {
    full: {
      list: {
        bgColor: "bg-calendar-full_light",
        textColor: "text-calendar-full",
        borderColor: "border-calendar-full",
      },
      calendar: {
        bgColor: "bg-calendar-full",
        textColor: "text-tertiary1-light",
      },
    },
    limited: {
      list: {
        bgColor: "bg-calendar-limited_light",
        textColor: "text-calendar-limited",
        borderColor: "border-calendar-limited",
      },
      calendar: {
        bgColor: "bg-calendar-limited",
        textColor: "text-tertiary1-light",
      },
    },
    open: {
      list: {
        bgColor: "bg-calendar-open_light",
        textColor: "text-calendar-open_dark",
        borderColor: "border-calendar-open",
      },
      calendar: {
        bgColor: "bg-calendar-open",
        textColor: "text-tertiary1-light",
      },
    },
  };

  if (isFull) {
    return statuses.full[style];
  } else if (percentageAvailable <= 50 && totalSeats !== 0) {
    return statuses.limited[style];
  } else {
    return statuses.open[style];
  }
};

export const filterEventsByMonth = (events, selectedMonth, selectedYear) => {
  if (!selectedMonth || !selectedYear || !events.length) {
    return [];
  }

  return events.filter((event) => {
    if (!event.date) return false;
    const eventDate = new Date(event.date);
    const eventMonth = eventDate.getMonth() + 1;
    const eventYear = eventDate.getFullYear();
    return eventMonth === selectedMonth && eventYear === selectedYear;
  });
};

export const sortEventsByDate = (events) => {
  return [...events].sort((a, b) => {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    return 0;
  });
};
