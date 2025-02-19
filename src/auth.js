import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
export const { handlers, singIn, signOut, auth } = NextAuth({
  providers: [Google],
});
