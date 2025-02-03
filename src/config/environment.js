import { API_URL_PRODUCTION, API_URL_DEVELOPMENT } from "@env";
import { logInfo } from "../utils/logging";

export const baseApiUrl = API_URL_PRODUCTION;
// export const baseApiUrl = API_URL_DEVELOPMENT;

logInfo(`Server url: ${baseApiUrl}`);
console.log(`Server url: ${baseApiUrl}`);
console.log(API_URL_PRODUCTION, API_URL_DEVELOPMENT);
