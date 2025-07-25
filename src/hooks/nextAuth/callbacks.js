/**
 * NextAuth.js JWT and session callback implementations.
 *
 * This setup handles multiple authentication flows:
 * - Local credentials login via backend
 * - OAuth SSO login (e.g., Google) with backend token exchange
 * - Access token renewal with refresh tokens
 *
 * Ensures the frontend always has access/refresh tokens in the session.
 */

import { default as jwtLib } from "jsonwebtoken";
import exchangeMap from "@/hooks/nextAuth/provider/index"; // Provider name → token exchange function
import refreshToken from "@/hooks/nextAuth/refreshToken"; // Token refresh function

// Special token indicating an expired or invalid session
const sessionTerminationToken = { id: "expired", expired: true };

/**
 * Handle credentials-based login.
 *
 * @param {object} token - Current NextAuth token.
 * @param {object} user - User object from credentials login (includes id, accessToken, refreshToken).
 * @returns {object} Updated token.
 */
function handleCredentialsRoutine(token, user) {
  token.id = user.id;
  token.accessToken = user.accessToken;
  token.refreshToken = user.refreshToken;
  return token;
}

/**
 * Handle OAuth SSO login by exchanging provider token with backend.
 *
 * @param {object} token - Current NextAuth token.
 * @param {object} user - User info from the OAuth provider.
 * @param {object} account - OAuth account details (id_token, access_token, etc.).
 * @returns {object} Updated token after backend token exchange.
 */
async function handleSSORoutine(token, user, account) {
  const method = exchangeMap[account.provider]; // Resolve exchange function
  const apiToken = await method(token, user, account); // Exchange with backend

  const decoded = jwtLib.decode(apiToken.accessToken); // Decode to get user id
  token.id = decoded.sub;
  token.accessToken = apiToken.accessToken;
  token.refreshToken = apiToken.refreshToken;

  return token;
}

/**
 * JWT callback in NextAuth.
 * Called during login, token renewal, and session checks.
 *
 * @param {object} param0 - Destructured { token, user, account } from NextAuth.
 * @returns {object} Updated token.
 */
export async function jwt({ token, user, account }) {
  // Case 1: First-time login using credentials
  if (!token && user?.accessToken && user?.refreshToken && user?.id) {
    return handleCredentialsRoutine(token, user);
  }

  // Case 2: First-time login using OAuth SSO (Google, etc.)
  if (!token?.accessToken && !token?.refreshToken && account?.provider) {
    return await handleSSORoutine(token, user, account);
  }

  // Case 3: Already authenticated — try refreshing the access token if possible
  if (token?.accessToken && token?.refreshToken) {
    return await refreshToken(token);
  }

  // Fallback — if everything else fails, terminate session
  return sessionTerminationToken;
}

/**
 * Session callback in NextAuth.
 * Maps token information into a session object accessible to the frontend.
 *
 * @param {object} param0 - Destructured { session, token } from NextAuth.
 * @returns {object|null} Updated session or null if session expired.
 */
export async function session({ session, token }) {
  if (token.expired) {
    return {}; // Session invalidated
  }

  session.user.id = token.id;
  session.accessToken = token.accessToken;
  session.refreshToken = token.refreshToken;
  return session;
}
