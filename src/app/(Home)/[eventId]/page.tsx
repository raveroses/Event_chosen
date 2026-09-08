import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
// FaHeart
export default function EventIdPage() {
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
