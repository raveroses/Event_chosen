"use client";
import { IoSearch } from "react-icons/io5";
import { DesktopLogo, MobileLogo } from "../_logo-sizes/Logo";
import {
  MdArrowBack,
  MdHistory,
  MdLocationOn,
  MdOutlineTrendingUp,
} from "react-icons/md";
import Link from "next/link";
import { RiMenu3Fill } from "react-icons/ri";
import { LuHistory } from "react-icons/lu";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { PiVideoBold } from "react-icons/pi";

import { InputCard } from "../_types/types";
import useAppContext from "../_custom-hooks/useAppContext";
import { useState } from "react";
const Navbar = () => {
  const {
    eventLocation,
    handleEventLocation,
    handleClear,
    handleSearchEventEnter,
    handleSeachFocus,
    searchFocus,
    handleBlur,
    handleFocus,
    handleEventBlur,
    handleEventFocus,
  } = useAppContext();

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

  const [trendingSearches] = useState<string[]>([
    "Tech events",
    "Music concerts",
    "Conferences 2025",
    "UK prayer conferences 2025",
    "Tech conferences 2025",
  ]);

  const trendingSearchingMap = trendingSearches.map((item, index) => {
    return (
      <li
        className="flex items-center gap-[20px] text-gray-500 p-1 transition-all duration-200 cursor-pointer hover:bg-gray-300"
        key={index}
      >
        <span className="text-[20px] font-bold">
          <MdOutlineTrendingUp />
        </span>
        <span className="text-[13px] font-medium">{item}</span>
      </li>
    );
  });

  const searchHistoryMap = searchFocus.searchHistory.map((item, index) => {
    return (
      <div className="flex items-center gap-[20px]" key={index}>
        <span>
          <MdHistory />
        </span>
        <span>{item}</span>
      </div>
    );
  });

  return (
    <section className="relative">
      <div className="fixed top-0 flex items-center justify-between z-30 border-b border-gray-200 w-full md:p-4 px-4 pt-4 pb-[45px] bg-white ">
        <div className="md:hidden">
          <MobileLogo />
        </div>

        <div className="md:block hidden">
          <DesktopLogo />
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="md:block hidden">
          <div className=" searching-colony w-[700px] flex item-center justify-between border border-gray-300 p-1 rounded-3xl bg-gray-100 ">
            <div className="event-search flex items-center gap-2">
              <MdArrowBack className="text-[22px] font-bold" />
              <IoSearch className="text-[15px] font-bold hidden" />
              <input
                type="text"
                className={`w-[300px] border-none outline-none placeholder:text-[14px] text-[14px] `}
                placeholder="Search event"
                name="searchValue"
                onFocus={handleEventFocus}
                onBlur={handleEventBlur}
                onKeyDown={handleSearchEventEnter}
                value={searchFocus.searchValue}
                onChange={handleSeachFocus}
              />
            </div>
            <div
              className={`absolute top-20  bg-white w-[340px] p-5 z-30 rounded-xl ${
                searchFocus.isFocus ? "block" : "hidden"
              }`}
            >
              {searchFocus.searchHistory.length < 1 && (
                <h3 className=" text-[16px] text-gray-500">
                  Trending Searches
                </h3>
              )}
              {searchFocus.searchHistory.length > 0 && (
                <div className="flex items-center justify-between">
                  <h3 className=" text-[16px] text-gray-500">
                    Recent Trenches{" "}
                  </h3>
                  <div
                    className="text-[#3659e3] cursor-pointer"
                    onClick={handleClear}
                  >
                    Clear
                  </div>
                </div>
              )}

              <ul className="flex flex-col gap-[15px] mt-5 z-10">
                {searchFocus.searchHistory.length < 1 && (
                  <div>{trendingSearchingMap}</div>
                )}

                {searchFocus.searchHistory.length > 0 && (
                  <div className="flex flex-col gap-[20px] ">
                    {searchHistoryMap}
                  </div>
                )}
              </ul>
            </div>
            <div className="w-[1px] bg-gray-300"></div>
            <div className="location-search flex items-center ">
              <MdLocationOn className="text-[20px]" />
              <input
                type="text"
                className=" w-[300px] border-none outline-none text-[14px] placeholder:text-[14px]"
                value={eventLocation}
                name="locationSearch"
                placeholder="choose location"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleSeachFocus}
              />

              <button className="bg-[#9f2c15] rounded-full p-2 ">
                <IoSearch className="text-[20px] text-white" />
              </button>
            </div>
          </div>
        </form>
        <div
          className={`card flex flex-col gap-[20px] absolute md:top-20 md:left-[530px] top-30 left-0 z-30 bg-white md:w-[350px]
           w-full h-[150px] p-5 rounded ${
             searchFocus.isEventFocus ? "block" : "hidden"
           }`}
        >
          {inputCard.map((item, index) => {
            return (
              <div
                className="flex gap-2 items-center cursor-pointer"
                key={index}
                onClick={() => handleEventLocation(item.head as string)}
              >
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
          justify-left font-medium text-[14px] md:p-auto p-5 "
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

      <div className="mobile-search md:hidden w-full fixed top-[70px] z-40 ">
        <div className="event-search flex items-center justify-between border border-gray-200 rounded-3xl p-1">
          <div className="flex items-center gap-2 pl-3">
            <MdArrowBack className="text-[22px] font-bold hidden" />
            <IoSearch className="text-[20px] text-gray-600 font-bold " />
            <input
              type="text"
              className="w-[80px] border-none outline-none placeholder:text-[12px] "
              placeholder="Search event"
              onFocus={handleEventFocus}
              onBlur={handleEventBlur}
              onKeyDown={handleSearchEventEnter}
              value={searchFocus.searchValue}
              onChange={handleSeachFocus}
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
