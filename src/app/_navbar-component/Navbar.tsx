import { IoSearch } from "react-icons/io5";
import { DesktopLogo, MobileLogo } from "../_logo-sizes/Logo";
import { MdArrowBack, MdLocationOn } from "react-icons/md";
import Link from "next/link";
const Navbar = () => {
  return (
    <section className="flex items-center justify-between border-b border-gray-200 pb-2 p-4">
      {/* <MobileLogo /> */}

      <div>
        <DesktopLogo />
      </div>
      <div className="searching-colony flex item-center gap-5 border border-gray-300 p-1 rounded-3xl bg-gray-100">
        <div className="event-search flex items-center gap-2">
          <MdArrowBack className="text-[22px] font-bold" />
          <IoSearch className="text-[15px] font-bold hidden" />
          <input
            type="text"
            className="w-[80px] border-none outline-none placeholder:text-[14px] "
            placeholder="Search event"
          />
        </div>
        <div className="w-[1px] bg-gray-300"></div>
        <div className="location-search flex items-center">
          <MdLocationOn className="text-[20px]" />
          <input
            type="text"
            className=" w-[150px] border-none outline-none placeholder:text-[14px]"
            placeholder="choose location"
          />
        </div>
        <div className="bg-[#9f2c15] rounded-full p-2 ">
          <IoSearch className="text-[20px] text-white" />
        </div>
      </div>
      <ul className="flex gap-10 items-center font-medium text-[14px]">
        <Link href={"/"}>
          <li className="">Find Events</li>
        </Link>
        <Link href={"/"}>
          <li className="">Create Events</li>
        </Link>
        <Link href={"/"}>
          <li className="">Find my tickets</li>
        </Link>
        <Link href={"/"}>
          <li className="">Log In</li>
        </Link>
        <Link href={"/"}>
          <li className="">Sign Up</li>
        </Link>
      </ul>
    </section>
  );
};

export default Navbar;
