import Link from "next/link";
import { getUser } from "./auth";

export default async function Navbar() {
  const user = await getUser();
  if (!user) {
    return null;
  }

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          Library APP
        </Link>
      </div>

      <div className="navbar-end gap-2">
        <Link href="/create" className="btn btn-primary">
          Add book
        </Link>
        <Link href="/logout" className="btn" prefetch={false}>
          Logout
        </Link>
      </div>
    </div>
  );
}
