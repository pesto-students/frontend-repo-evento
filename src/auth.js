import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { NEXT_PUBLIC_API_BASE_URL } from "./lib/config";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const res = await axios.post(
            `${NEXT_PUBLIC_API_BASE_URL}/auth/login`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );
          return res.data.data;
        } catch (error) {
          throw new InvalidLoginError();
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // If the user object is available (i.e., the user has just signed in)
      if (user) {
        token.name = user.user.name;
        token.email = user.user.email;
        token.id = user.user.id;
        token.role = user.user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpiresAt = user.accessTokenExpiresAt;
      }

      // Check if token is expired
      if (token && Date.now() > token.accessTokenExpiresAt) {
        try {
          const res = await refreshAccessToken(token.refreshToken);
          // Update token with new access token and expiration time
          token.accessToken = res.data.data.accessToken;
          token.refreshToken = res.data.data.refreshToken;
          token.accessTokenExpiresAt = res.data.data.accessTokenExpiresAt;
        } catch (error) {
          // Handle token refresh error, maybe redirect to login
          throw new Error("Failed to refresh token");
        }
      }

      return token;
    },

    async session({ session, token }) {
      // Here, the token argument contains the JWT payload
      // You can decide what to attach to the session
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpiresAt = token.accessTokenExpiresAt;

      return session;
    },
  },
});

const refreshAccessToken = async (refreshToken) => {
  return await axios.post(`${NEXT_PUBLIC_API_BASE_URL}/auth/refresh`, {
    refreshToken,
  });
};
