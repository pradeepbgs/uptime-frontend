import axios from "axios";
import { Account } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret",

  callbacks: {
    async jwt({ token, account }: { token: JWT; account?: Account | null }) {
      if (account?.id_token) {
        token.idToken = account.id_token;
        token.googleId = account.providerAccountId;

        try {
          const response = await axios.post(
            `${process.env.BACKEND_URL}/api/v1/auth/google`,
            {
              access_token: token.idToken,
              google_id: token.googleId
            },
            { withCredentials: true }
          );
          const data  = response.data;
          // console.log("response", response)
          // console.log("data", data)
          token.accessToken = data.accessToken;
          token.refreshToken = data.refreshToken;
        } catch (error) {
          console.error("Error fetching custom JWT:", error);
        }
      }

      return token;
    },
    async session({ session, token }:{ session: any; token: JWT }) {
      session.idToken = token.idToken;
      session.googleId = token.googleId;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    }
  },
};
