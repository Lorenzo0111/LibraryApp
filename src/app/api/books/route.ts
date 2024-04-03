import { getUser } from "@/components/auth";
import prisma from "@/lib/prisma";
import { redirect } from "@/utils/backend";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const books = await prisma.book.findMany();

  return NextResponse.json(books);
}

export async function POST(req: NextRequest) {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  const form = await req.formData();

  const name = form.get("name") as string;
  const description = form.get("description") as string;
  const image = form.get("image") as string;

  if (!name || !description || !image) {
    return redirect("/create?error=Please fill out all fields");
  }

  if (name.length > 128) {
    return redirect("/create?error=Title too long");
  }

  await prisma.book.create({
    data: {
      name,
      description,
      imageUrl: image,
    },
  });

  return redirect("/");
}
