import { API_URL_PRODUCTION, API_URL_DEVELOPMENT } from "@env";
import { logInfo } from "@/utils/logging";

const isProduction = process.env.NODE_ENV === "production";

export const baseApiUrl = isProduction
  ? API_URL_PRODUCTION
  : API_URL_DEVELOPMENT;

logInfo(`Server url: ${baseApiUrl}`);
