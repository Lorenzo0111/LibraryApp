import { lucia } from "@/lib/lucia";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Argon2id } from "oslo/password";

import prisma from "@/lib/prisma";
import type { NextRequest } from "next/server";
import { redirect } from "@/utils/backend";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();

  const username = formData.get("username");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm_password");

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof confirmPassword !== "string"
  ) {
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
    return redirect("/register?error=Invalid username.");
  }

  if (password.length < 6 || password.length > 255) {
    return redirect("/register?error=Invalid password.");
  }

  if (password !== confirmPassword) {
    return redirect("/register?error=Passwords do not match.");
  }

  try {
    const hashedPassword = await new Argon2id().hash(password);
    const userId = generateId(15);

    await prisma.user.create({
      data: {
        id: userId,
        username: username.toLowerCase(),
        hashed_password: hashedPassword,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect("/");
  } catch (e) {
    console.error(e);
    return redirect("/register?error=Username already taken.");
  }
};
