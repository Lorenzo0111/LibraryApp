"use client";

import axios from "axios";
import type { KeyedMutator } from "swr";

export default function CheckoutButton({
  id,
  mutate,
  setLoading,
}: {
  id: string;
  setLoading: (loading: boolean) => void;
  mutate: KeyedMutator<any>;
}) {
  return (
    <button
      onClick={() => {
        setLoading(true);
        axios.post(`/api/books/${id}/checkout`).then(() => {
          mutate().then(() => {
            setLoading(false);
          });
        });
      }}
      className="btn btn-primary block w-full mt-2 text-center"
    >
      Checkout
    </button>
  );
}
