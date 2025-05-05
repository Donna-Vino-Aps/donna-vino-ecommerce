import { logInfo } from "@/utils/logging";

const env = process.env.NODE_ENV || "development";

// define a local backend URL with a fallback to old ENV name, otherwise use default URL
const localBaseUrl =
  process.env.NEXT_PUBLIC_API_URL_LOCAL ||
  process.env.API_URL_LOCAL ||
  "http://127.0.0.1:5001";
// define a local backend URL with a fallback to old ENV name
const deployedBaseUrl =
  process.env.NEXT_PUBLIC_API_URL_HEROKU || process.env.API_URL_HEROKU;

export const baseApiUrl =
  // enforcing backend environment selection by 2 criteria: env key and API URL provided
  (env === "production" || env === "staging") && !!deployedBaseUrl
    ? deployedBaseUrl
    : localBaseUrl;

logInfo(`Server URL: ${baseApiUrl} (${env} mode)`);
