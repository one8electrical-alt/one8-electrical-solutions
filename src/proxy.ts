import { NextResponse, type NextRequest } from "next/server";

export async function proxy(_request: NextRequest) {
  // Let client-side Auth Guard in /admin/layout.tsx manage auth session seamlessly via Supabase SDK
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
