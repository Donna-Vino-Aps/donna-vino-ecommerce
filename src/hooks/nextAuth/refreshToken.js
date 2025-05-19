import jwt from "jsonwebtoken";

/**
 * Token used to signal session termination if renewal fails.
 * Must match the logic used in your JWT/session callbacks.
 */
const sessionTerminationToken = { id: "expired", expired: true };

/**
 * Checks whether an access token is expired or about to expire.
 *
 * - Evaluates `exp` claim in JWT.
 * - Allows a grace window (`bufferSeconds`) to preemptively refresh tokens.
 *
 * @param {Object} nextToken - The token object containing `accessToken`.
 * @param {number} bufferSeconds - Seconds before `exp` to consider token expired (default: 30).
 * @returns {boolean} - True if the token is missing, invalid, expired, or near expiration.
 */
function isAccessTokenExpires(nextToken, bufferSeconds = 30) {
  const accessToken = nextToken?.accessToken;
  if (!accessToken) return true;

  const decoded = jwt.decode(accessToken);
  if (!decoded || !decoded.exp) return true;

  const now = Math.floor(Date.now() / 1000);
  return decoded.exp <= now + bufferSeconds;
}

/**
 * Renews the access token using the backend /api/auth/refresh endpoint.
 *
 * - Only sends the request if the access token is expired or about to expire.
 * - Sends both the old access token and the refresh token in the request body.
 * - If renewal fails, returns a sentinel object to terminate the session.
 *
 * @param {Object} nextToken - Object with `accessToken` and `refreshToken`.
 * @returns {Object} - New token object or session termination signal.
 */
async function refreshToken(nextToken) {
  if (!isAccessTokenExpires(nextToken)) return nextToken;

  const res = await fetch(`${process.env.BACKEND_URI}/api/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: nextToken.refreshToken,
      accessToken: nextToken.accessToken,
    }),
  });

  if (!res.ok) return sessionTerminationToken;

  const data = await res.json();
  nextToken.accessToken = data.accessToken;
  return nextToken;
}

export default refreshToken;
