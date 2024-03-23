import { getUser } from "@/components/auth";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

async function handler(request: NextRequest) {
  const session = await getUser();

  if (!session) {
    return new Response(null, {
      status: 401,
    });
  }

  await lucia.invalidateSession(session.session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/login",
    },
  });
}

export { handler as GET, handler as POST };
