"use client";

import CheckoutButton from "@/components/buttons/checkout";
import DeleteButton from "@/components/buttons/delete";
import { useFetcher } from "@/utils/fetcher";
import { Book } from "@prisma/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const {
    data: book,
    isLoading,
    error,
    mutate,
  } = useFetcher<
    Book & {
      bookedBy: {
        username: string;
      } | null;
    }
  >(`/api/books/${encodeURIComponent(id)}`);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  if (loading) {
    return <span className="m-auto loading loading-spinner loading-lg"></span>;
  }

  if (error || !book) {
    return notFound();
  }

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
          {!book.bookedBy && (
            <CheckoutButton id={id} mutate={mutate} setLoading={setLoading} />
          )}
          <DeleteButton id={id} setLoading={setLoading} />
        </div>
      </div>
    </div>
  );
}
