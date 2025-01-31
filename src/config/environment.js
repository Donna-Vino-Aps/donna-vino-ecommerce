import { logInfo } from "@/utils/logging";

// Determine the base API URL based on the environment
const isProduction = process.env.NODE_ENV === "production";

// If it is production, we take the production URL, otherwise we take the development URL
export const baseApiUrl = isProduction
  ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION ||
    "https://backend-donna-vino-c5c2e1c03c18.herokuapp.com"
  : process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT || "http://localhost:3000";

// Log the baseApiUrl for debugging purposes
if (process.env.NODE_ENV === "development") {
  logInfo("Using API URL: ", baseApiUrl);
}
