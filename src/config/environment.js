import { API_URL_PRODUCTION, API_URL_DEVELOPMENT, WEB_CLIENT_ID } from "@env";
import { logInfo } from "../../util/logging";

export const baseApiUrl = API_URL_PRODUCTION;
// export const baseApiUrl = API_URL_DEVELOPMENT;

export const webClientId = WEB_CLIENT_ID;

// logInfo(`Server url: ${baseApiUrl}`);
