import { format, parseISO } from "date-fns";
import { enUS, da } from "date-fns/locale";

export const getLocale = (language) => {
  return language === "dk" ? da : enUS;
};

export const formatDate = (dateString, language, formatStr) => {
  if (!dateString) return "";
  try {
    const date = dateString instanceof Date ? dateString : parseISO(dateString);
    const defaultFormat = language === "dk" ? "d. MMMM yyyy" : "MMMM d, yyyy";
    return format(date, formatStr || defaultFormat, {
      locale: getLocale(language),
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return String(dateString);
  }
};

export const formatTime = (timeString, language) => {
  if (!timeString) return "";
  try {
    const time = timeString instanceof Date ? timeString : new Date(timeString);
    const formatString = language === "dk" ? "HH:mm" : "h:mm aaa";
    return format(time, formatString, { locale: getLocale(language) });
  } catch (error) {
    console.error("Error formatting time:", error);
    return String(timeString);
  }
};
