import type { Book } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function BookCard(book: Book) {
  return (
    <div className="card p-4 bg-neutral h-fit">
      <Image
        src={book.imageUrl}
        alt={book.name}
        width={200}
        height={200}
        className="rounded-lg"
      />
      <h2 className="font-bold text-xl mt-2">{book.name}</h2>

      <Link
        href={"/book/" + book.id}
        className="btn btn-primary w-full mt-2 text-center"
      >
        {!book.bookedById ? "Check out" : "Unavailable"}
      </Link>
    </div>
  );
}
