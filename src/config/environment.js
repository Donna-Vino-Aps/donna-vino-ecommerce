import { logInfo } from "@/utils/logging";

const env = process.env.NODE_ENV || "development";

export const baseApiUrl =
  env === "production" || env === "staging"
    ? process.env.NEXT_PUBLIC_API_URL_HEROKU
    : process.env.NEXT_PUBLIC_API_URL_LOCAL;

logInfo(`Server URL: ${baseApiUrl} (${env} mode)`);
