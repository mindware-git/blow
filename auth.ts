import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  providers: [
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize function called with credentials:", credentials);
        console.log("AUTH_SECRET exists:", !!process.env.AUTH_SECRET);
        console.log("NEXTAUTH_SECRET exists:", !!process.env.NEXTAUTH_SECRET);

        // 테스트용 인증 로직
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        console.log("Extracted email:", email);
        console.log("Extracted password:", password);

        if (email === "test@example.com" && password === "password123") {
          console.log("Authentication successful for test user");
          return {
            id: "test-user-id",
            email: email,
            name: "TestUser",
          };
        }

        console.log("Authentication failed - returning null");
        return null; // Return null for failed authentication
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
});
