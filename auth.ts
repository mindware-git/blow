import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  providers: [
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

        try {
          const response = await fetch("http://127.0.0.1:8000/profiles/");
          if (!response.ok) {
            console.log("Failed to fetch profiles");
            return null;
          }

          const profiles = await response.json();
          if (profiles.length === 0) {
            console.log("No profiles found");
            return null;
          }

          const firstProfile = profiles[0];
          console.log("First profile:", firstProfile);

          return {
            email: firstProfile.id,
            name: firstProfile.name,
          };
        } catch (error) {
          console.log("Error fetching profiles:", error);
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
