import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export async function createClient() {
    const url =
        process.env.NEXT_PUBLIC_SUPABASE_URL 
    const key =
        process.env.NEXT_PUBLIC_SUPABASE_API_KEY

    if (!url || !key) {
        throw new Error("Supabase URL or Key not set in environment variables");
    }

    return createSupabaseClient(url, key);
}
