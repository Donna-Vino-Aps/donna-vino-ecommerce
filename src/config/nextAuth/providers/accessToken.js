import jwt from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";

const accessTokenProvider = CredentialsProvider({
  id: "apiToken", // custom strategy ID
  name: "TokenLogin",
  credentials: {
    accessToken: { label: "Access Token", type: "text" },
    refreshToken: { label: "Refresh Token", type: "text" },
  },
  async authorize(credentials) {
    const { accessToken, refreshToken } = credentials;

    // Validate or decode the token
    const payload = jwt.decode(accessToken);

    if (!payload?.sub) return null;

    return {
      id: payload.sub,
      accessToken,
      refreshToken,
    };
  },
});

export default accessTokenProvider;
