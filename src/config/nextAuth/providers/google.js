/**
 * GoogleProvider configuration for NextAuth.js.
 *
 * This provider enables OAuth authentication using Google accounts.
 * It uses the `clientId` and `clientSecret` from environment variables
 * to authorize users via Google's OAuth2 flow.
 *
 * Environment Variables:
 * - GOOGLE_CLIENT_ID: The OAuth2 client ID from Google Cloud Console.
 * - GOOGLE_CLIENT_SECRET: The OAuth2 client secret from Google Cloud Console.
 *
 * Exported as the default Google OAuth provider to be included in NextAuth's providers array.
 */

import GoogleProvider from "next-auth/providers/google";

const googleProvider = GoogleProvider({
  id: "google", // Unique identifier for the provider
  name: "Google", // Display name shown on the login screen
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

export default googleProvider;
