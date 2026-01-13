import { signIn } from "@/auth";
import { DevLoginButtons } from "@/components/dev-login-buttons";

export default async function SignIn() {
  const isDevelopment = process.env.NODE_ENV === "development";

  if (isDevelopment) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/profiles/`);
    if (!response.ok) {
      console.log("Failed to fetch profiles");
      return (
        <div className="p-4 text-red-500">
          Failed to load profiles. Please check the API connection.
        </div>
      );
    }
    const profiles = await response.json();
    return <DevLoginButtons profiles={profiles} />;
  }

  return (
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
  );
}
