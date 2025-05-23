import NextAuth from "next-auth";
import providers from "@/config/nextAuth/providers/index.js";
import { jwt, session } from "@/hooks/nextAuth/callbacks.js";

/**
 * NextAuth configuration:
 * - Supports multiple providers (e.g., credentials, Google).
 * - Uses JWT session strategy with custom token lifecycle.
 * - Integrates custom JWT/session callbacks for handling token renewal and decoding.
 *
 * Notes:
 * - `session.maxAge` defines how long the session is valid in the browser.
 * - `jwt.maxAge` is how often the token is re-signed by NextAuth internally.
 * - Use of `.env` for `NEXTAUTH_SECRET` is critical for production.
 */

const handler = NextAuth({
  // List of authentication providers
  providers: providers,

  // Custom pages for sign-in and error display
  pages: {
    signIn: "/login",
  },

  // Session configuration (JWT-based)
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // Session valid for 30 days
  },

  // JWT settings (internal re-signing, not real token expiration)
  jwt: {
    maxAge: 60, // JWT is re-signed every 60 seconds by NextAuth
  },

  // Custom callback handlers
  callbacks: {
    jwt,
    session,
  },

  // Secret used to sign/encrypt JWTs and sessions
  // This should come from your environment in production
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
