import createClient from "@/lib/supabase/static";
import EventDetails from "./eventDetails";
function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function generateStaticParams() {
  const supabase = await createClient()
  const [duplicateRes, defaultRes] = await Promise.all([
    supabase.from("eventchosen_duplicate").select("*"),
    supabase.from("eventchosen").select("*"),
  ]);

  const { data, error } = duplicateRes;
  const { data: eventDefault, error: eventDefaultError } = defaultRes;

  if (error || eventDefaultError) {
    console.log("Supabase fetch error:", error?.message || eventDefaultError?.message);
    return [];
  }

  return [...(data || []), ...(eventDefault || [])].map((event) => ({
    eventId: slugify(event.eventTitle),
  }));
}

export default async function EventIdPage({
  params,
}: {
  params: Promise<{ eventId: string }>
}) {
  const { eventId } = await params;

  console.log(eventId);



  return (
    <div className="md:px-[300px] py-7">
      <EventDetails />

    </div>
  );
}
