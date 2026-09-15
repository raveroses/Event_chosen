import { NextResponse, type NextRequest } from "next/server";
import createClient from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { origin, searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const supabase = await createClient();

  if (!code) {
    return NextResponse.redirect(`${origin}/sign-up`);
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    console.log("exchange error:", error);
    return NextResponse.redirect(`${origin}/sign-up`);
  }

  const user = data.user;

  // Same supabase instance — session already active in memory here
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("onboarding_completed")
    .eq("id", user.id)
    .maybeSingle(); // maybeSingle, not single — handles brand-new users gracefully

  if (userError) {
    console.log("users table error:", userError);
    return NextResponse.redirect(`${origin}/sign-up`);
  }

  // Brand-new user — no row yet, or a row exists but onboarding not done
  if (!userData || userData.onboarding_completed === false) {
    return NextResponse.redirect(`${origin}/profile-user-setting`);
  }

  // Existing, fully onboarded user
  return NextResponse.redirect(`${origin}/`);
}
