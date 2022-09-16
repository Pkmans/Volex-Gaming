import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
   // Configure one or more authentication providers
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
      FacebookProvider({
         clientId: process.env.FACEBOOK_CLIENT_ID,
         clientSecret: process.env.FACEBOOK_CLIENT_SECRET
      }),
      GitHubProvider({
         clientId: process.env.GITHUB_CLIENT_ID,
         clientSecret: process.env.GITHUB_CLIENT_SECRET
      }),
   ],
   pages: {
      signIn: '/login',
   },
   callbacks: {
      async redirect({ url, baseUrl }) {
         if (url.startsWith("/")) return `${baseUrl}${url}`
         return baseUrl
      }
   }
}

export default NextAuth(authOptions)