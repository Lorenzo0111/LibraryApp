import { getUserNoCache } from "@/lib/lucia";
import { cache } from "react";

export const getUser = cache(getUserNoCache);

export async function SignedIn({ children }: { children: React.ReactNode }) {
  const session = await getUser();
  if (!session) return null;

  return <>{children}</>;
}

export async function SignedOut({ children }: { children: React.ReactNode }) {
  const session = await getUser();
  if (session) return null;

  return <>{children}</>;
}
