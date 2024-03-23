import { NextResponse } from "next/server";

export function redirect(url: string) {
  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: url,
    },
  });
}
