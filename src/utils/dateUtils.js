import { format } from "date-fns";

export const formatDate = (date) => {
  if (!date) return null;
  return format(date, "EEE MMM dd yyyy");
};
