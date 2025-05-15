import { getLocale, formatDate, formatTime } from "@/utils/dateTimeFormatting";
import { enUS, da } from "date-fns/locale";

const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe("getLocale", () => {
  it("returns Danish locale for 'dk' language", () => {
    expect(getLocale("dk")).toBe(da);
  });

  it("returns English locale for 'en' language", () => {
    expect(getLocale("en")).toBe(enUS);
  });

  it("returns English locale as default for any other language", () => {
    expect(getLocale("fr")).toBe(enUS);
    expect(getLocale(null)).toBe(enUS);
    expect(getLocale(undefined)).toBe(enUS);
  });
});

describe("formatDate", () => {
  const testDate = "2023-05-15";

  it("formats dates correctly in English", () => {
    const formattedDate = formatDate(testDate, "en");
    expect(formattedDate).toBe("May 15th, 2023");
  });

  it("formats dates correctly in Danish", () => {
    const formattedDate = formatDate(testDate, "dk");
    expect(formattedDate).toBe("15. maj 2023");
  });

  it("accepts custom format strings", () => {
    const formattedDate = formatDate(testDate, "en", "yyyy/MM/dd");
    expect(formattedDate).toBe("2023/05/15");
  });

  it("handles Date objects as input", () => {
    const dateObj = new Date(2023, 4, 15);
    const formattedDate = formatDate(dateObj, "en");
    expect(formattedDate).toBe("May 15th, 2023");
  });

  it("returns empty string for null or undefined input", () => {
    expect(formatDate(null, "en")).toBe("");
    expect(formatDate(undefined, "en")).toBe("");
  });

  it("handles invalid date strings gracefully", () => {
    const invalidDate = "not-a-date";
    const result = formatDate(invalidDate, "en");

    expect(console.error).toHaveBeenCalled();
    expect(result).toBe("not-a-date");
  });

  it("uses short date format when requested", () => {
    const shortFormat = formatDate(testDate, "en", "dd/MM");
    expect(shortFormat).toBe("15/05");
  });
});

describe("formatTime", () => {
  const testTime = new Date(2023, 4, 15, 14, 30);

  it("formats time correctly in English (12-hour format)", () => {
    const formattedTime = formatTime(testTime, "en");
    expect(formattedTime).toBe("2:30 pm");
  });

  it("formats time correctly in Danish (24-hour format)", () => {
    const formattedTime = formatTime(testTime, "dk");
    expect(formattedTime).toBe("14:30");
  });

  it("handles string time inputs", () => {
    const timeString = "2023-05-15T14:30:00";

    const formattedTimeEn = formatTime(timeString, "en");
    const formattedTimeDk = formatTime(timeString, "dk");

    expect(formattedTimeEn).toBe("2:30 pm");
    expect(formattedTimeDk).toBe("14:30");
  });

  it("returns empty string for null or undefined input", () => {
    expect(formatTime(null, "en")).toBe("");
    expect(formatTime(undefined, "en")).toBe("");
  });

  it("handles invalid time inputs gracefully", () => {
    const invalidTime = "not-a-time";
    const result = formatTime(invalidTime, "en");

    expect(console.error).toHaveBeenCalled();
    expect(result).toBe("not-a-time");
  });

  it("handles edge cases for time values", () => {
    const midnight = new Date(2023, 4, 15, 0, 0);
    expect(formatTime(midnight, "en")).toBe("12:00 am");
    expect(formatTime(midnight, "dk")).toBe("00:00");
    const noon = new Date(2023, 4, 15, 12, 0);
    expect(formatTime(noon, "en")).toBe("12:00 pm");
    expect(formatTime(noon, "dk")).toBe("12:00");
  });
});
