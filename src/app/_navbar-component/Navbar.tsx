"use client";
import { IoSearch } from "react-icons/io5";
import { DesktopLogo, MobileLogo } from "../_logo-sizes/Logo";
import { MdArrowBack, MdLocationOn } from "react-icons/md";
import Link from "next/link";
import { RiMenu3Fill } from "react-icons/ri";
import { ReactNode, useState } from "react";
import { LuHistory } from "react-icons/lu";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { PiVideoBold } from "react-icons/pi";
type InputCard = {
  [key: string]: ReactNode | string;
};

// searchHistory: string;
// location: string;
const Navbar = () => {
  const [inputCard] = useState<InputCard[]>([
    {
      head: "Use my current location",
      icon: <FaLocationCrosshairs />,
    },
    {
      head: "Browse online event",
      icon: <PiVideoBold />,
    },
    {
      head: "Ibadan",
      icon: <LuHistory />,
    },
  ]);

  return (
    <section className=" relative border-b border-gray-200 p-4  ">
      <div className="flex items-center justify-between">
        <div className="md:hidden">
          <MobileLogo />
        </div>

        <div className="md:block hidden">
          <DesktopLogo />
        </div>
        <div className="md:block hidden">
          <div className=" searching-colony flex item-center gap-5 border border-gray-300 p-1 rounded-3xl bg-gray-100 ">
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
        </div>
        <div className="card flex flex-col gap-[20px] absolute md:top-20 md:left-[350px] top-30 left-0 z-10 bg-white md:w-[250px] w-full h-[150px] p-5 rounded">
          {inputCard.map((item, index) => {
            return (
              <div className="flex gap-2 items-center" key={index}>
                <div className="text-[20px] text-blue-500">{item.icon}</div>
                <h3 className="text-[14px]">{item.head}</h3>
              </div>
            );
          })}
        </div>

        <div className="md:hidden">
          <RiMenu3Fill className="text-[30px]" />
        </div>
        <ul
          className="md:static absolute top-[75px] right-0 md:w-auto md:h-auto w-[200px] h-[320px] md:bg-transparent  
          bg-white md:shadow-none shadow-md z-10  flex md:flex-row flex-col gap-10 md:items-center items-left  
          justify-left font-medium text-[14px] md:p-auto p-5"
        >
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
      </div>

      <div className="mobile-search md:hidden">
        <div className="event-search flex items-center justify-between border border-gray-200 rounded-3xl p-1">
          <div className="flex items-center gap-2 pl-3">
            <MdArrowBack className="text-[22px] font-bold hidden" />
            <IoSearch className="text-[20px] text-gray-600 font-bold " />
            <input
              type="text"
              className="w-[80px] border-none outline-none placeholder:text-[12px] "
              placeholder="Search event"
            />
          </div>
          <div className="bg-[#9f2c15] rounded-full p-2 ">
            <IoSearch className="text-[20px] text-white" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
