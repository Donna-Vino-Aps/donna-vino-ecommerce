import { API_URL_HEROKU } from "@env";
import { logInfo } from "@/utils/logging";

export const baseApiUrl = API_URL_HEROKU;

//Logout-endpoint
export const LOGOUT_ENDPOINT = `${baseApiUrl}/api/user/log-out`;

logInfo(`Server url: ${baseApiUrl}`);
logInfo(`Logout endpoint: ${LOGOUT_ENDPOINT}`);
