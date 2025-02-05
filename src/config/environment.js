// import { API_URL_HEROKU } from "@env";
import { API_URL_LOCAL } from "@env";
import { logInfo } from "@/utils/logging";

// export const baseApiUrl = API_URL_HEROKU;
export const baseApiUrl = API_URL_LOCAL;

logInfo(`Server url: ${baseApiUrl}`);
