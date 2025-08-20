import Link from "next/link";
import { PiCaretDownBold, PiCaretLeftBold } from "react-icons/pi";
import Image from "next/image";
import { MdCalendarMonth } from "react-icons/md";
const DashboardFirstBody = () => {
  return (
    <section className="overflow-x-auto">
      <Link
        href={"/"}
        className="text-blue-600 flex gap-[6px] items-center text-[12px] border-b border-gray-300"
      >
        <PiCaretLeftBold />
        <p>Back to events</p>
      </Link>

      <div className="relative bg-white rounded-xl shadow w-[240px] h-[240px] ">
        <Image
          src={"/images/auto-create-floating-card-splatter1.png"}
          alt="image part"
          width={170}
          height={200}
          className="absolute left-[70px] z-10 "
        />
        <Image
          src={"/images/auto-create-floating-card-splatter2.png"}
          alt="image part"
          width={150}
          height={200}
          className="absolute left-[90px] top-[0px]"
        />

        <div className="content flex flex-col gap-[15px] py-[50px] px-[15px]">
          <h3 className="text-[20px] font-bold">Event Title</h3>

          <div className="date text-gray-600 flex ite-center justify-between">
            <MdCalendarMonth className="text-[20px] " />
            <p>Mon, Sep 29, 2025, 10:00 AM</p>
          </div>

          <div className="draft flex items-center gap-[5px] justify-center text-[14px] border-2 border-gray-400 rounded-3xl w-[100px] p-[7px] ">
            <p>Draft</p>
            <PiCaretDownBold />
          </div>
        </div>
      </div>
    </section>
  );
};

export { DashboardFirstBody };
