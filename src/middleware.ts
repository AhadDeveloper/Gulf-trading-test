import { type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  try {
    return await updateSession(request); // call your existing logic
  } catch (err) {
    console.error("Proxy error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
