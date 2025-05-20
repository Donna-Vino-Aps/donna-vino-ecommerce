/**
 * Sends the Google ID token to the backend for unified registration or session creation.
 *
 * This function is used during both Google sign-in and sign-up flows. It sends the
 * ID token (JWT) received from Google to the backend's `/api/register/google` endpoint.
 *
 * The backend will:
 * - Create a new user if the account does not exist.
 * - Create a new session if the user already exists.
 *
 * This eliminates the need to distinguish between login and registration on the frontend.
 *
 * @param {object} token - Token object passed by NextAuth.
 * @param {object} user - User info returned by the SSO provider.
 * @param {object} account - OAuth account object containing id_token or access_token.
 * @returns {Promise<Object>} - The backend-issued token response (e.g., { accessToken, renewToken }).
 * @throws {Error} - If the HTTP request fails or the backend response is not successful.
 */
async function exchangeGoogleToken(token, user, account) {
  const jwtToken =
    account?.id_token || account?.access_token || user?.accessToken;

  const backendUri = process.env.API_URL_LOCAL || process.env.API_URL_HEROKU;

  // Always use the registration endpoint.
  // It will handle both new user creation and existing user session generation.
  const res = await fetch(`${backendUri}/api/register/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: jwtToken }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "Unknown error");
    throw new Error(`Google token exchange failed (${res.status}): ${errText}`);
  }

  return await res.json();
}

export default exchangeGoogleToken;
