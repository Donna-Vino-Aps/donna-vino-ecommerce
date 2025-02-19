import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { logInfo, logError } from "@/utils/logging";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        logInfo("Attempting to sign in with Google", { user, account });

        logInfo("User successfully signed in through Google", { user });
        return true;
      } catch (error) {
        logError("Error in signIn callback:", error.message);
        return false;
      }
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
        logInfo("JWT token updated", { token });
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      logInfo("Session updated", { session });
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
