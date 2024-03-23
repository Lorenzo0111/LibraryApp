import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { cache } from "react";

export const getUser = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return null;
  const { user, session } = await lucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }

  if (user && session) {
    return { user, session };
  }
  return null;
});

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
