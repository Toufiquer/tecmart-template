import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { createOrUpdateUsers } from './google-auth-controller';
import { IUsers } from './google-auth-modal';

const handler = NextAuth({
  // Configure authentication providers
  providers: [
    GoogleProvider({
      // Google OAuth credentials from environment variables
      clientId: process.env.GOOGLE_CLIENT_ID!, // Google Client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // Google Client Secret
    }),
  ],
  // Custom authentication pages
  pages: {
    signIn: '/login', // Redirect to custom login page
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // Call the function with example data
        const email = token.email as string;
        const name = token.name as string;
        console.log('');
        console.log('');
        console.log('');
        const data: IUsers = { email, name, accessToken1: process.env.ACCESS_TOKEN_KEY || '', fixedKey: process.env.ACCESS_FIXED_KEY || '' };
        console.log('data: ', data);
        createOrUpdateUsers(data);
      }
      return token;
    },
    async session({ session }) {
      return session;
    },
    async signIn() {
      return true;
    },
  },
});

// Export handler for API routes
export { handler as GET, handler as POST }; // Handle both GET and POST requests
