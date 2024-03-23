import { lucia } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { redirect } from "@/utils/backend";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Argon2id } from "oslo/password";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  if (typeof username !== "string" || typeof password !== "string") {
    return NextResponse.json(
      {
        error: "Missing required fields",
      },
      {
        status: 400,
      }
    );
  }

  if (
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return redirect("/login?error=Incorrect username or password.");
  }

  if (password.length < 6 || password.length > 255) {
    return redirect("/login?error=Incorrect username or password.");
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username.toLowerCase(),
      },
      select: {
        id: true,
        hashed_password: true,
      },
    });

    if (!user) {
      return redirect("/login?error=Incorrect username or password.");
    }

    const validPassword = await new Argon2id().verify(
      user.hashed_password,
      password
    );

    if (!validPassword) {
      return redirect("/login?error=Incorrect username or password.");
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect("/");
  } catch (e) {
    console.log(e);
    return redirect("/login?error=Incorrect username or password.");
  }
};
