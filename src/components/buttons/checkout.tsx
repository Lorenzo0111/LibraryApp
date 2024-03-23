"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function CheckoutButton({ id }: { id: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        axios.post(`/api/books/${id}/checkout`).then(() => {
          router.refresh();
        });
      }}
      className="button block w-full mt-2 text-center"
    >
      Checkout
    </button>
  );
}
