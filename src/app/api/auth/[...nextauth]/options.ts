import axios from "axios";
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
    async jwt({ token, account }: any) {
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
            const a = response.data;
          } catch (error) {
            console.error("Error fetching custom JWT:", error);
          }
        }
      
        return token;
      }
      
  },
};
