import {
  getSeatStatus,
  filterEventsByMonth,
  sortEventsByDate,
} from "@/utils/eventUtils";

describe("getSeatStatus", () => {
  it("returns full status when no seats are available", () => {
    const fullStatusList = getSeatStatus(0, 20, "list");
    const fullStatusCalendar = getSeatStatus(0, 20, "calendar");

    expect(fullStatusList.bgColor).toBe("bg-calendar-full_light");
    expect(fullStatusList.textColor).toBe("text-calendar-full");
    expect(fullStatusList.borderColor).toBe("border-calendar-full");

    expect(fullStatusCalendar.bgColor).toBe("bg-calendar-full");
    expect(fullStatusCalendar.textColor).toBe("text-tertiary1-light");
  });

  it("returns limited status when exactly 50% of seats are available", () => {
    const limitedStatusList = getSeatStatus(10, 20, "list");
    const limitedStatusCalendar = getSeatStatus(10, 20, "calendar");

    expect(limitedStatusList.bgColor).toBe("bg-calendar-limited_light");
    expect(limitedStatusList.textColor).toBe("text-calendar-limited");
    expect(limitedStatusList.borderColor).toBe("border-calendar-limited");

    expect(limitedStatusCalendar.bgColor).toBe("bg-calendar-limited");
    expect(limitedStatusCalendar.textColor).toBe("text-tertiary1-light");
  });

  it("returns limited status when less than 50% of seats are available", () => {
    const limitedStatusList = getSeatStatus(9, 20, "list");
    const limitedStatusCalendar = getSeatStatus(9, 20, "calendar");

    expect(limitedStatusList.bgColor).toBe("bg-calendar-limited_light");
    expect(limitedStatusList.textColor).toBe("text-calendar-limited");
    expect(limitedStatusList.borderColor).toBe("border-calendar-limited");

    expect(limitedStatusCalendar.bgColor).toBe("bg-calendar-limited");
    expect(limitedStatusCalendar.textColor).toBe("text-tertiary1-light");
  });

  it("returns open status when more than 50% of seats are available", () => {
    const openStatusList = getSeatStatus(15, 20, "list");
    const openStatusCalendar = getSeatStatus(15, 20, "calendar");

    expect(openStatusList.bgColor).toBe("bg-calendar-open_light");
    expect(openStatusList.textColor).toBe("text-calendar-open_dark");
    expect(openStatusList.borderColor).toBe("border-calendar-open");

    expect(openStatusCalendar.bgColor).toBe("bg-calendar-open");
    expect(openStatusCalendar.textColor).toBe("text-tertiary1-light");
  });

  it("returns open status when all seats are available in a small event", () => {
    const openStatusList = getSeatStatus(3, 3, "list");
    const openStatusCalendar = getSeatStatus(3, 3, "calendar");

    expect(openStatusList.bgColor).toBe("bg-calendar-open_light");
    expect(openStatusList.textColor).toBe("text-calendar-open_dark");
    expect(openStatusList.borderColor).toBe("border-calendar-open");

    expect(openStatusCalendar.bgColor).toBe("bg-calendar-open");
    expect(openStatusCalendar.textColor).toBe("text-tertiary1-light");
  });

  it("uses 'list' style by default if no style is specified", () => {
    const defaultStatus = getSeatStatus(15, 20);

    expect(defaultStatus.bgColor).toBe("bg-calendar-open_light");
    expect(defaultStatus.textColor).toBe("text-calendar-open_dark");
    expect(defaultStatus.borderColor).toBe("border-calendar-open");
  });
});

describe("filterEventsByMonth", () => {
  const testEvents = [
    { date: "2023-01-15", title: "January Event" },
    { date: "2023-02-15", title: "February Event" },
    { date: "2023-02-20", title: "Another February Event" },
    { date: "2023-03-15", title: "March Event" },
    { date: "2024-02-15", title: "Next Year February Event" },
  ];

  it("filters events for the selected month and year", () => {
    const februaryEvents = filterEventsByMonth(testEvents, 2, 2023);

    expect(februaryEvents.length).toBe(2);
    expect(februaryEvents[0].title).toBe("February Event");
    expect(februaryEvents[1].title).toBe("Another February Event");
  });

  it("returns empty array if no events match the month and year", () => {
    const aprilEvents = filterEventsByMonth(testEvents, 4, 2023);
    expect(aprilEvents.length).toBe(0);
  });

  it("returns empty array if month or year is not provided", () => {
    expect(filterEventsByMonth(testEvents, null, 2023).length).toBe(0);
    expect(filterEventsByMonth(testEvents, 2, null).length).toBe(0);
    expect(filterEventsByMonth(testEvents, null, null).length).toBe(0);
  });

  it("returns empty array if events array is empty", () => {
    expect(filterEventsByMonth([], 2, 2023).length).toBe(0);
  });

  it("handles events without dates gracefully", () => {
    const mixedEvents = [
      { title: "No Date Event" },
      { date: "2023-02-15", title: "With Date Event" },
    ];

    const result = filterEventsByMonth(mixedEvents, 2, 2023);
    expect(result.length).toBe(1);
    expect(result[0].title).toBe("With Date Event");
  });
});
