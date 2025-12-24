import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookiesToSet) => {
            // Only set cookies on response, not request
            // We'll attach them to the NextResponse later
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const pathname = request.nextUrl.pathname;

    // Prevent logged-in users from visiting login/signup
    if (
      user &&
      (pathname.startsWith("/login") || pathname.startsWith("/signup"))
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    const userProtectedRoutes = [
      "/dashboard",
      "/deposit",
      "/withdraw",
      "/profile",
      "/referral",
      "/referral-bonus",
      "/transaction",
      "/fund-history",
      "/invest-history",
      "/payout-history",
    ];
    const adminRoutes = ["/admin", "/admin/dashboard"];

    if (
      !user &&
      (userProtectedRoutes.some((p) => pathname.startsWith(p)) ||
        adminRoutes.some((p) => pathname.startsWith(p)))
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    // Fetch user role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user?.id)
      .single();

    const role = profile?.role ?? "user";

    if (role !== "admin" && adminRoutes.some((p) => pathname.startsWith(p))) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    // Return final response
    return NextResponse.next();
  } catch (err) {
    console.error("updateSession error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
