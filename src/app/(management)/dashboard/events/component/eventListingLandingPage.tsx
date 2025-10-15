"use client";
import { ReactNode, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaList, FaPlus, FaRegCalendar } from "react-icons/fa6";
import { PiCaretDownBold } from "react-icons/pi";
import { BiCalendarAlt } from "react-icons/bi";
import Overlay from "./Overlay";
import useAppContext from "@/app/_custom-hooks/useAppContext";
import Image from "next/image";

const supabaseLoader = ({ src }: { src: string }) => {
  return src;
};

const EventListingLandingPage = () => {
  const [createList] = useState<
    {
      icon: ReactNode;
      list: string;
    }[]
  >([
    {
      icon: <FaList />,
      list: "List",
    },
    {
      icon: <FaRegCalendar />,
      list: "Calendar",
    },
    {
      icon: <PiCaretDownBold />,
      list: "All events",
    },
  ]);

  const { handleEventCreationPlus, eachUserEventCreationList } =
    useAppContext();
  return (
    <>
      <h1 className="text-[40px] font-bold">Events</h1>
      <p className="text-[#365ee4] font-bold pt-5">Events</p>

      <div className=" flex md:flex-row flex-col md:justify-between  md:items-center mt-[50px]">
        <div className="flex md:flex-row flex-col md:items-center gap-[30px]">
          <div className="eventSearch flex gap-[10px] w-full mx-auto md:rounded-none rounded-3xl border-2 border-gray-300 p-[10px]">
            <div className="text-[20px] font-semibold">
              <CiSearch />
            </div>
            <input
              type="text"
              placeholder="Search Events"
              className="md:w-[150px] w-full placeholder:text-[12px] outline-none border-none"
            />
          </div>

          <div className="flex gap-[30px]">
            {createList.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`bg-[#365ee4] md:w-[120px] w-[250px] md:gap-[10px] md:justify-center justify-between px-[10px] text-white rounded-3xl  py-[10px] items-center ${
                    item.list !== "All events" ? "hidden md:flex" : "flex"
                  }`}
                >
                  <div className="text-[14px] font-semibold"> {item.icon}</div>
                  <div className="text-[12px]">{item.list}</div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          className="create bg-[#9f2c15] text-center text-white  rounded py-[15px] px-[30px] text-[14px] md:block hidden"
          onClick={handleEventCreationPlus}
        >
          Create events
        </button>
      </div>

      {eachUserEventCreationList.length > 0 ? (
        <div className=" grid md:grid-cols-4 grid-col-1 md:gap-[90px] gap-[30px] py-[50px]">
          {eachUserEventCreationList.map((event, index) => {
            return (
              <div
                className={`card-cover hover:shadow-lg transition-all duration-200 cursor-pointer md:w-[300px] w-full h-auto pb-[10px] rounded-xl ${
                  eachUserEventCreationList.length > 0 ? "block" : "hidden"
                }`}
                key={index}
              >
                <div className="relative md:w-[300px] md:h-[180px] w-full h-[200px] min-w-full">
                  <Image
                    loader={supabaseLoader}
                    alt="card-image"
                    fill={true}
                    src={`${event.eventImage}`}
                    unoptimized
                    className=" object-cover object-center rounded-t-2xl"
                  />
                </div>

                <div className="text-gray-600 flex flex-col gap-[4px] px-2 py-1">
                  <h3 className="py-1 md:text-[15px] text-[18px] font-semibold ">
                    {event.eventTitle}
                  </h3>
                  <div className="timeandDate md:text-[12px] text-[16px] md:font-semibold font-medium">
                    <span className="day"> {event.eventDate}</span>
                    <span> {event.eventDate}</span>
                    <span> {event.eventStartTime} AMs</span>
                  </div>
                  <p className="text-[14px]">{event.eventOverview}</p>

                  <h3 className="md:text-[13px] text-[14px] font-semibold">
                    {event.eventCategory}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[300px]">
          <div className="text-[80px] text-gray-400 bg-gray-300 rounded-full p-5">
            <BiCalendarAlt />
          </div>
          <h3 className="pt-[20px] text-gray-400">No events to show</h3>
        </div>
      )}
      <div
        className="plusCreate absolute bg-[#9f2c15] rounded-full p-5 shadow shadow-[#9f2c15] text-semibold text-white inline right-0 bottom-0 md:hidden"
        onClick={handleEventCreationPlus}
      >
        <FaPlus />
      </div>

      <Overlay />
    </>
  );
};

export default EventListingLandingPage;
