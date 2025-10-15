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
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const {
    eventLocation,
    handleEventLocation,
    handleClear,
    handleSearchEventEnter,
    handleSeachFocus,
    searchFocus,
    handleSearchEventFocus,
    handleSearchEventBlur,
    handleSearchLocationFocus,
    handleSearchLocationBlur,
    displayBecomeAuser,
    isBecomingOrganizer,
    handleBecomeOrganizerOnchange,
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

  const [mobile, setMobile] = useState<Record<string, boolean>>({
    mobileEvent: false,
    mobileFocus: false,
  });
  const eventRef = useRef<HTMLDivElement | null>(null);
  // const dropDownRef = useRef<HTMLDivElement | null>(null);
  // const focusRef=
  useEffect(() => {
    const handleOnMobileSearchEventFocus = (e: MouseEvent) => {
      if (eventRef.current && !eventRef.current.contains(e.target as Node)) {
        setMobile((prev) => ({
          ...prev,
          mobileEvent: false,
          mobileFocus: false,
        }));
      }
    };

    document.addEventListener("mousedown", handleOnMobileSearchEventFocus);
    return () =>
      document.removeEventListener("mousedown", handleOnMobileSearchEventFocus);
  }, []);

  const navLinks = [
    { href: "/", label: "Find Events" },
    { href: "/dashboard/events", label: "Create Events" },
    { href: "/", label: "Find my tickets" },
    { href: "/login", label: "Log In" },
    { href: "/sign-up", label: "Sign Up" },
  ];

  const navLinkMap = navLinks.map((navLink, index) => {
    return (
      <Link href={navLink.href} key={index}>
        <li className="">{navLink.label}</li>
      </Link>
    );
  });
  return (
    <section className="relative">
      <div className="fixed top-0 flex items-center justify-between z-30 border-b border-gray-200 w-full md:p-4 pt-0 md:pb-0 pb-[50px] bg-white ">
        <div className="md:hidden">
          <MobileLogo />
        </div>

        <div className="md:block hidden">
          <DesktopLogo />
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className=" searching-colony md:w-[700px] flex item-center justify-between md:border md:border-gray-300 md:p-1  rounded-3xl md:bg-gray-100  ">
            <div className="md:block hidden m-auto ">
              <div className="event-search flex items-center gap-2  ">
                <MdArrowBack className="text-[22px] font-bold" />
                <IoSearch className="text-[15px] font-bold hidden" />
                <input
                  type="text"
                  className={`w-[300px] border-none outline-none placeholder:text-[14px] text-[14px] `}
                  placeholder="Search event"
                  name="searchValue"
                  onFocus={handleSearchEventFocus}
                  onBlur={handleSearchEventBlur}
                  onKeyDown={handleSearchEventEnter}
                  value={searchFocus.searchValue}
                  onChange={handleSeachFocus}
                />
              </div>
            </div>

            <div
              className={`absolute top-20  ${
                displayBecomeAuser ? "left:[350px]" : "left-[390px]"
              }
                 w-[340px] p-5  rounded-xl z-30 bg-white       
               ${searchFocus.isSearchEventFocus ? "md:block hidden" : "hidden"}
                 `}
            >
              {/* TRENDING */}
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
            <div className="w-[1px] bg-gray-300 md:block hidden"></div>
            <div className="md:block hidden">
              <div
                className="location-search flex items-center justify-between 
             w-full bg-transparent border-none "
              >
                <MdLocationOn className="text-[20px]" />
                <input
                  type="text"
                  className=" w-[300px]  border-none outline-none text-[14px] placeholder:text-[14px]"
                  value={eventLocation}
                  name="locationSearch"
                  placeholder="choose location"
                  onFocus={handleSearchLocationFocus}
                  onBlur={handleSearchLocationBlur}
                  onChange={handleSeachFocus}
                />

                <button className="bg-[#9f2c15] rounded-full p-2 block ">
                  <IoSearch className="text-[20px] text-white" />
                </button>
              </div>
            </div>
          </div>
        </form>
        <div
          className={`${
            searchFocus.isSearchLocationFocus ? "md:block hidden" : "hidden"
          }  absolute top-20 ${
            displayBecomeAuser ? "left-[580px]" : "left-[727px]"
          }  bg-white w-[350px]
           h-[150px] p-5 rounded shadow`}
        >
          <div className={`card flex flex-col gap-[20px]  `}>
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
        </div>

        <div className="md:hidden">
          <RiMenu3Fill className="text-[30px]" />
        </div>
        <ul
          className="md:static absolute top-[75px] right-0 md:w-auto md:h-auto w-[200px] h-[320px] md:bg-transparent  
          bg-white md:shadow-none shadow-md z-10  flex md:flex-row flex-col gap-10 md:items-center items-left  
          justify-left font-medium text-[14px] md:p-auto p-5 md:visible invisible"
        >
          {navLinkMap}
        </ul>

        {displayBecomeAuser && (
          <form className="flex gap-2">
            <input
              type="checkbox"
              value="organizer"
              onChange={handleBecomeOrganizerOnchange}
              checked={isBecomingOrganizer}
            />
            <label htmlFor="organizer">Become an organizer</label>
          </form>
        )}
      </div>

      <div
        className="mobile-search md:hidden w-full fixed top-[45px] z-40 p-[10px]"
        ref={eventRef}
      >
        <div className="event-search flex items-center justify-between border border-gray-200 rounded-3xl p-1">
          <div className="flex items-center gap-2 pl-3">
            <MdArrowBack className="text-[22px] font-bold hidden" />
            <IoSearch className="text-[20px] text-gray-600 font-bold " />
          </div>
          <input
            type="text"
            className="w-full border-none outline-none placeholder:text-[12px] "
            placeholder="Search event"
            name="searchValue"
            onFocus={() =>
              setMobile((prev) => ({
                ...prev,
                mobileEvent: true,
                moboileFocus: false,
              }))
            }
            onKeyDown={handleSearchEventEnter}
            value={searchFocus.searchValue}
            onChange={handleSeachFocus}
            // STOPPage
          />
          <div className="bg-[#9f2c15] rounded-full p-2 ">
            <IoSearch className="text-[20px] text-white" />
          </div>
        </div>
      </div>

      {/*  MOBILE TRENDING */}
      <div
        className={`absolute top-[100px] z-30 md:hidden block bg-white w-full p-4 ${
          mobile.mobileEvent || mobile.mobileFocus ? "block" : "hidden"
        }`}
        ref={eventRef}
      >
        <div
          className={`block w-full bg-transparent border border-gray-200 rounded-3xl p-2 
               ${
                 mobile.mobileEvent || mobile.mobileFocus
                   ? "md:hidden block"
                   : "hidden"
               } 
           `}
        >
          <div
            className="location-search flex items-center justify-between p-1
             "
          >
            <MdLocationOn className="text-[20px] ml-2" />
            <input
              type="text"
              className=" w-full border-none outline-none text-[14px] placeholder:text-[14px]"
              value={eventLocation}
              name="locationSearch"
              placeholder="choose location"
              onFocus={() => {
                setMobile((prev) => ({
                  ...prev,
                  mobileFocus: true,
                  mobileEvent: false,
                  // mobileEvent: !prev.mobileEvent,
                }));
              }}
              onChange={handleSeachFocus}
            />

            <button className="bg-[#9f2c15] rounded-full p-2 hidden ">
              <IoSearch className="text-[20px] text-white" />
            </button>
          </div>
        </div>
        <div
          className={`
                w-full p-5  z-30           
               ${mobile.mobileEvent ? "md:hidden block" : "hidden"} }
                 `}
          ref={eventRef}
        >
          {/* TRENDING */}
          {searchFocus.searchHistory.length < 1 && (
            <h3 className=" text-[16px] text-gray-500">Trending Searches</h3>
          )}
          {searchFocus.searchHistory.length > 0 && (
            <div className="flex items-center justify-between">
              <h3 className=" text-[16px] text-gray-500">Recent Trenches </h3>
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

        <div
          className={`${mobile.mobileFocus ? " block" : "hidden"} ${
            mobile.mobileEvent ? "hidden" : "block"
          } w-full
           h-[150px] p-5 md:hidden`}
          ref={eventRef}
        >
          <div className={`card flex flex-col gap-[20px]  `}>
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
        </div>
      </div>

      {/* <div className="" ref={eventRef}></div> */}
    </section>
  );
};

export default Navbar;
