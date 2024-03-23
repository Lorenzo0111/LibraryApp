import { getUser } from "@/components/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams: { error },
}: {
  searchParams: { error?: string };
}) {
  const user = await getUser();
  if (!user) redirect("/login");

  return (
    <div className="card w-1/3 m-auto flex flex-col gap-2">
      <h1 className="text-4xl font-extrabold">Create a book</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form
        action={async (form) => {
          "use server";

          const name = form.get("name") as string;
          const description = form.get("description") as string;
          const image = form.get("image") as string;

          if (!name || !description || !image) {
            redirect("/create?error=Please fill out all fields");
            return;
          }

          if (name.length > 128) {
            redirect("/create?error=Title too long");
            return;
          }

          await prisma.book.create({
            data: {
              name,
              description,
              imageUrl: image,
            },
          });

          redirect("/");
        }}
        className="flex flex-col gap-2"
      >
        <input
          className="bg-[#1A1F20] rounded-lg p-2"
          required
          name="name"
          id="name"
          placeholder="Title"
          max={128}
        />
        <input
          className="bg-[#1A1F20] rounded-lg p-2"
          required
          name="description"
          id="description"
          placeholder="Description"
        />
        <input
          className="bg-[#1A1F20] rounded-lg p-2"
          required
          name="image"
          id="image"
          placeholder="Image URL"
          type="url"
        />
        <button className="button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
