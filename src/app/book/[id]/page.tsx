import { getUser } from "@/components/auth";
import CheckoutButton from "@/components/buttons/checkout";
import DeleteButton from "@/components/buttons/delete";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

async function getBook(id: string) {
  return await prisma.book.findUnique({
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
}

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const user = await getUser();
  if (!user) redirect("/login");

  const book = await getBook(id);
  if (!book) return notFound();

  return (
    <div className="flex gap-4 p-12">
      <Image
        src={book.imageUrl}
        alt={book.name}
        width={200}
        height={200}
        className="rounded-lg"
      />
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold">{book.name}</h1>
        <p>{book.description}</p>
        <p>
          Status:{" "}
          {book.bookedBy ? "Booked by " + book.bookedBy.username : "Available"}
        </p>
        <div className="flex gap-2">
          {!book.bookedBy && <CheckoutButton id={id} />}
          <DeleteButton id={id} />
        </div>
      </div>
    </div>
  );
}
