"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        axios.delete(`/api/books/${id}`).then(() => {
          router.push("/");
        });
      }}
      className="button block w-full mt-2 text-center"
    >
      Delete
    </button>
  );
}
