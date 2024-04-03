"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function DeleteButton({
  id,
  setLoading,
}: {
  id: string;
  setLoading: (loading: boolean) => void;
}) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        setLoading(true);
        axios.delete(`/api/books/${id}`).then(() => {
          router.push("/");
        });
      }}
      className="btn btn-primary block w-full mt-2 text-center"
    >
      Delete
    </button>
  );
}
