/**
 * CredentialsProvider instance for handling login with email and password using NextAuth.js.
 *
 * This provider sends the submitted credentials to a custom backend endpoint (`/api/auth/login`)
 * and expects an accessToken and refreshToken in response. It decodes the accessToken
 * to extract the user ID (`sub`) and uses that to construct the authenticated user session.
 *
 * Environment Variable:
 * - backendUri: Base URI of your backend where the login endpoint is hosted.
 *
 * Expected backend response structure:
 * {
 *   accessToken: "<JWT>",
 *   refreshToken: "<JWT>"
 * }
 *
 * Expected JWT claims:
 * {
 *   sub: "<userId>",
 *   email: "<userEmail>",
 *   ...
 * }
 *
 * Exported as the default credentials provider for NextAuth configuration.
 */

import jwt from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";
import { logInfo } from "@/utils/logging";

const credentialsProvider = CredentialsProvider({
  id: "credentials", // Unique ID for the provider
  name: "Login/Password", // Display name shown on the login screen

  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },

  /**
   * Authorize a function called by NextAuth.js when a user submits the login form.
   *
   * @param {Object} credentials - Object containing `email` and `password`.
   * @returns {Object|null} - Authenticated user object or null if authentication fails.
   */
  async authorize(credentials) {
    logInfo(credentials); // For debugging: log submitted credentials

    const backendUri = process.env.API_URL_LOCAL || process.env.API_URL_HEROKU;

    const res = await fetch(`${backendUri}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    // If the backend rejects login, return null to indicate failure
    if (!res.ok) return null;

    const data = await res.json();
    logInfo(data); // For debugging: log the response payload

    const decoded = jwt.decode(data.accessToken);
    logInfo(decoded); // For debugging: inspect decoded JWT

    // Return user session data to NextAuth
    return {
      id: decoded.sub,
      email: decoded.email,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  },
});

export default credentialsProvider;
