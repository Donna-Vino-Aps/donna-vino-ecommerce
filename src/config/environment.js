import { logInfo } from "@/utils/logging";

const API_URL_LOCAL = process.env.NEXT_PUBLIC_API_URL_LOCAL;
const API_URL_HEROKU = process.env.NEXT_PUBLIC_API_URL_HEROKU;

const isProduction = process.env.NODE_ENV === "production";
export const baseApiUrl = isProduction ? API_URL_HEROKU : API_URL_LOCAL;

logInfo(
  `Server URL: ${baseApiUrl} (${isProduction ? "production" : "development"} mode)`,
);
