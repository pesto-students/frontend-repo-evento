import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { NEXT_PUBLIC_API_BASE_URL } from "./lib/config";

// Custom error class for invalid login
class InvalidLoginError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidLoginError";
  }
}

// Function to refresh the access token
const refreshAccessToken = async (refreshToken) => {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Failed to refresh access token:", errorData);
      throw new Error("Failed to refresh token");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Failed to refresh access token:", error.message);
    throw new Error("Failed to refresh token");
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const response = await axios.post(
            `${NEXT_PUBLIC_API_BASE_URL}/auth/login`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          if (response.data.data) {
            return response.data.data;
          }

          throw new InvalidLoginError("Invalid identifier or password");
        } catch (error) {
          console.error(
            "Login failed:",
            error.response ? error.response.data : error.message
          );
          throw new InvalidLoginError("Invalid identifier or password");
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
      // Initial sign in
      if (user) {
        token.id = user.user.id;
        token.name = user.user.name;
        token.email = user.user.email;
        token.role = user.user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpiresAt = user.accessTokenExpiresAt;
        console.log("Login", token);
        return token;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpiresAt) {
        return token;
      }

      // Access token has expired, try to refresh it
      try {
        const refreshedTokens = await refreshAccessToken(token.refreshToken);
        token.accessToken = refreshedTokens.accessToken;
        token.refreshToken = refreshedTokens.refreshToken;
        token.accessTokenExpiresAt = refreshedTokens.accessTokenExpiresAt;
        return token;
      } catch (error) {
        console.error("Token refresh error:", error);
        return null;
      }
    },

    // Here, the token argument contains the JWT payload. You can decide what to attach to the session
    async session({ session, token }) {
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
