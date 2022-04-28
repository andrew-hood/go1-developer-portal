import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { postLogin, UserCredentials } from "../../../services/authService"

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize(credentials: UserCredentials, req) {
        const token = await postLogin(credentials).catch(() => null);
        return {
          email: credentials.username,
          instance: credentials.instance,
          ...token
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 12 * 60 * 60, // 12 hours
  },
  callbacks: {
    async redirect({url, baseUrl}) {
      return '/dashboard';
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('user', user);

      if (user?.instance) {
        token.instance = user.instance;
      }
      if (user?.access_token) {
        token.accessToken = user.access_token;
      }
      console.log('token', token);
      return token;
    },
    async session({ session, token }) {
      console.log('token 1', token);
      
      if (token?.instance) {
        session.portal = token.instance;
      }
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      console.log(session);
      return session;
    },
  },
});