import { signIn } from "@/auth";
import { DevLoginButtons } from "@/components/dev-login-buttons";
import { GoogleLoginButton } from "@/components/google-login-button";

export default async function SignIn() {
  const isDevelopment = process.env.NODE_ENV === "development";

  if (isDevelopment) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/profiles/`,
    );
    if (!response.ok) {
      console.log("Failed to fetch profiles");
      return (
        <div className="p-4 text-red-500">
          Failed to load profiles. Please check the API connection.
        </div>
      );
    }
    const profiles = await response.json();
    return (
      <div className="space-y-6">
        <DevLoginButtons profiles={profiles} />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              또는
            </span>
          </div>
        </div>
        <GoogleLoginButton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form
        action={async (formData: FormData) => {
          "use server";
          const email = formData.get("email") as string;
          const password = formData.get("password") as string;

          await signIn("credentials", {
            email,
            password,
            redirectTo: "/",
          });
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
        </div>
        <button type="submit">Sign in</button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">또는</span>
        </div>
      </div>

      <GoogleLoginButton />
    </div>
  );
}
