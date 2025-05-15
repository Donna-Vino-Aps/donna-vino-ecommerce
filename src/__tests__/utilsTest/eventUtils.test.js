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
