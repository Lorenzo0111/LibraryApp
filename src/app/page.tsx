"use client";

import BookCard from "@/components/book";
import { useFetcher } from "@/utils/fetcher";
import type { Book } from "@prisma/client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: books, isLoading, error } = useFetcher<Book[]>("/api/books");

  useEffect(() => {
    if (error?.response?.status === 401) {
      redirect("/login");
    }
  }, [error]);

  return (
    <main className="flex h-full gap-8 flex-wrap p-12">
      {isLoading && (
        <span className="m-auto loading loading-spinner loading-lg"></span>
      )}
      {error && (
        <div className="alert alert-error" role="alert">
          {error.message}
        </div>
      )}
      {books?.map((book) => (
        <BookCard {...book} key={book.id} />
      ))}
    </main>
  );
}
