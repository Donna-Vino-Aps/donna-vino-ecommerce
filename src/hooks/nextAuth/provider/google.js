/**
 * Exchanges a Google ID token (JWT) for access and refresh tokens from the backend.
 *
 * This function is typically used during the SSO login flow when authenticating
 * with Google's OAuth provider. The ID token received from Google is forwarded
 * to your backend, which verifies it and returns your app's own token set.
 *
 * @param {string} token - The Google ID token (JWT) received from the OAuth provider.
 * @returns {Promise<Object>} - The backend-issued token response (e.g., { accessToken, refreshToken }).
 * @throws {Error} - If the HTTP request fails or the response is not successful.
 */

async function exchangeGoogleToken(token) {
  const res = await fetch(`${process.env.BACKEND_URI}/api/auth/google/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "Unknown error");
    throw new Error(`Google token exchange failed (${res.status}): ${errText}`);
  }

  return await res.json();
}

export default exchangeGoogleToken;
