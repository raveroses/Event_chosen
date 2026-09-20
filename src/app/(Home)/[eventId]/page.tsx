import createClient from "@/lib/supabase/static";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";

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
      <div className="relative w-full h-[500px] flex justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center blur-xl scale-110  "
          style={{ backgroundImage: "url(/images/conference.jpeg)" }}
        />
        <Image
          src="/images/conference.jpeg"
          alt="image"
          width={900}
          height={400}
          className="relative object-cover rounded-lg"
        />
      </div>

      <div className="flex gap-10 justify-end my-7">
        <div className="relative flex flex-col gap-5">
          <div className="shareIcon text-lg ">
            <FiUpload />
          </div>

          <div className="sharetooltips absolute -bottom-15 left-1/2 -translate-x-1/2 bg-gray-700 text-white px-4 py-1 text-sm rounded">
            Share Event
          </div>
        </div>

        <div className="loveIcon text-lg relative">
          <FaRegHeart />
          {/* <FaHeart /> */}
          <div className="likeTootip absolute left-[58%] -top-15 w-30 -translate-x-1/2 bg-gray-700 text-white px-4 py-2 text-center text-sm rounded">
            Like Event
          </div>
        </div>
      </div>
    </div>
  );
}
