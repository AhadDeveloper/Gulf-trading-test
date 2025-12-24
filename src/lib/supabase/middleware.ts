import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

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

  // ---------- 3️⃣ Protected routes ----------
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

  // If NOT logged in, redirect to login
  if (
    !user &&
    (userProtectedRoutes.some((p) => pathname.startsWith(p)) ||
      adminRoutes.some((p) => pathname.startsWith(p)))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // ---------- 4️⃣ Fetch user role ----------
  let role = "user";
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile) role = profile.role;
  }

  // ---------- 5️⃣ Block normal users from admin ----------
  if (role !== "admin" && adminRoutes.some((p) => pathname.startsWith(p))) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
