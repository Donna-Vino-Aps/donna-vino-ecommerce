// import { API_URL_HEROKU, GOOGLE_CLIENT_ID_WEB } from "@env";
import { API_URL_LOCAL, GOOGLE_CLIENT_ID_WEB } from "@env";
import { logInfo } from "@/utils/logging";

export const googleClientId = GOOGLE_CLIENT_ID_WEB;
// export const baseApiUrl = API_URL_HEROKU;
export const baseApiUrl = API_URL_LOCAL;

logInfo(`Server url: ${baseApiUrl}`);
