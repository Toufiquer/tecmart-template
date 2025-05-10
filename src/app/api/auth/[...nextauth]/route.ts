import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { manageIGAuth } from './google-auth-controller';

const convertUnixTimestampToISO = (unixTimestamp: string | number): string => {
  const timestampInMilliseconds = Number(unixTimestamp) * 1000;

  if (isNaN(timestampInMilliseconds)) {
    return 'Invalid Date';
  }

  const dateObject = new Date(timestampInMilliseconds);
  return dateObject.toISOString();
};

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
        const expires = convertUnixTimestampToISO(account.expires_at as number);
        manageIGAuth(email, name, expires);
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
