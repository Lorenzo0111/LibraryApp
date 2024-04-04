"use client";

export default function Page({
  searchParams: { error },
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="card w-2/3 xl:w-1/4 m-auto flex flex-col gap-2">
      <h1 className="text-4xl font-extrabold">Create a book</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form method="POST" action="/api/books" className="flex flex-col gap-2">
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
        <button className="btn btn-primary" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
