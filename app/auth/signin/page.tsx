import { signIn } from "@/auth";

export default function SignIn() {
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
