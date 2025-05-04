import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

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
      console.log('JWT Callback - Account:', account);
      console.log('JWT Callback - Token  :', token);
      return token;
    },
    async session({ session, token }) {
      console.log('Session Callback - Session:', session);
      console.log('Session Callback - Token  :', token);
      return session;
    },
    async signIn({ user, account, profile }) {
      console.log('SignIn Callback - User   :', user);
      console.log('SignIn Callback - Account:', account);
      console.log('SignIn Callback - Profile:', profile);
      return true;
    },
  },
});

// Export handler for API routes
export { handler as GET, handler as POST }; // Handle both GET and POST requests
