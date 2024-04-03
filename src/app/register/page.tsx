import { getUser } from "@/components/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams: { error },
}: {
  searchParams: { error?: string };
}) {
  const session = await getUser();
  if (session) redirect("/");

  return (
    <div className="card w-1/3 m-auto flex flex-col gap-2">
      <h1 className="text-4xl font-extrabold">Register</h1>
      <p className="text-xl">Start using our platform now</p>
      {error && <p className="text-red-500">{error}</p>}
      <form
        action="/api/auth/register"
        method="POST"
        className="flex flex-col gap-2"
      >
        <input
          className="bg-[#1A1F20] rounded-lg p-2"
          required
          name="username"
          id="username"
          placeholder="Username"
        />
        <input
          className="bg-[#1A1F20] rounded-lg p-2"
          required
          name="password"
          id="password"
          type="password"
          placeholder="Password"
        />
        <input
          className="bg-[#1A1F20] rounded-lg p-2"
          required
          name="confirm_password"
          id="confirm_password"
          type="password"
          placeholder="Confirm Password"
        />
        <div>
          <Link href="/login">
            Already have an account? <span className="text-primary">Login</span>
          </Link>
        </div>
        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
