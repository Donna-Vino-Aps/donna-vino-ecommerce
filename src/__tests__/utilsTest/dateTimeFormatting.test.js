import { getLocale, formatDate } from "@/utils/dateTimeFormatting";
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
