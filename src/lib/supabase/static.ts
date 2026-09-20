import { createClient } from "@supabase/supabase-js";

export default function createStaticClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
    );
}
