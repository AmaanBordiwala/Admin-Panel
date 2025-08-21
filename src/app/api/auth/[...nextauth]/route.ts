import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
        domain: { label: "Domain", type: "text", placeholder: "example.com" },
      },
      async authorize(credentials, req) {
        console.log("Received credentials:", credentials);
        // Add your own logic here to validate credentials
        // This is a placeholder for demonstration purposes
        if (
          credentials?.email === "user@example.com" &&
          credentials?.password === "password" &&
          credentials?.domain === "example.com"
        ) {
          return { id: "1", name: "J Smith", email: "user@example.com" };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) { // Add check for session.user
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };