import exchangeGoogleToken from "./google.js";
import storeApiTokens from "./accessToken.js";

const exchangeMap = {
  google: exchangeGoogleToken,
  apiToken: storeApiTokens,
  credentials: storeApiTokens,
};

export default exchangeMap;
