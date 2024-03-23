import { getUser } from "@/components/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const book = await prisma.book.findUnique({
    where: { id },
    select: {
      bookedById: true,
    },
  });

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  if (book.bookedById) {
    return NextResponse.json({ error: "Book already booked" }, { status: 400 });
  }

  await prisma.book.update({
    where: { id },
    data: {
      bookedById: user.user.id,
    },
  });

  return NextResponse.json({ success: true });
}
