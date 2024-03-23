import { getUser } from "@/components/auth";
import BookCard from "@/components/book";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

async function getBooks() {
  const books = await prisma.book.findMany();
  return books;
}

export default async function Home() {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  const books = await getBooks();

  return (
    <main className="flex min-h-screen gap-8 flex-wrap p-12">
      {books.map((book) => (
        <BookCard {...book} key={book.id} />
      ))}
    </main>
  );
}
