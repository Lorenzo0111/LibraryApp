import { getUser } from "@/components/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const book = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      bookedBy: {
        select: {
          username: true,
        },
      },
    },
  });

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(book);
}

export async function DELETE(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const book = await prisma.book.delete({
    where: {
      id,
    },
  });

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, book });
}
