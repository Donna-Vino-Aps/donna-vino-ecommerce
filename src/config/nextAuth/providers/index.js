import credentialsProvider from "./credentials.js";
import googleProvider from "./google.js";
import accessTokenProvider from "./accessToken.js";

const providers = [credentialsProvider, googleProvider, accessTokenProvider];

export default providers;
