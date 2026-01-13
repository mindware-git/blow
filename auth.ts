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
          // 입력된 이메일에 해당하는 특정 프로필만 가져오기
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_RESTAPI_URL}/profiles/${email}/`,
          );
          if (!response.ok) {
            console.log("Failed to fetch profile for email:", email);
            return null;
          }

          const profile = await response.json();
          console.log("Profile found:", profile);

          // 프로필이 존재하면 해당 프로필의 정보를 세션에 저장
          return {
            email: profile.id,
            name: profile.name,
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
