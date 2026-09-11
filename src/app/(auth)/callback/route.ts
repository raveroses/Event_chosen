// src/app/auth/callback/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { origin } = new URL(request.url);

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(`${origin}/sign-up`);
  }

  const { data: userData, error } = await supabase
    .from("users")
    .select("onboarding_completed")
    .eq("id", user?.id)
    .single();

  if (error) {
    console.error("Server Error",error);
    return NextResponse.redirect(`${origin}/sign-up`);
  }
console.log("server Result",userData);

  if (userData.onboarding_completed === false) {
    return NextResponse.redirect(`${origin}/profile-user-setting`);
  }

  return NextResponse.redirect(`${origin}/`);
}