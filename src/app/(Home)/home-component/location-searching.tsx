"use client";
import { MdCalendarMonth } from "react-icons/md";

import Image from "next/image";
import { useState } from "react";
import useAppContext from "@/app/_custom-hooks/useAppContext";
const supabaseLoader = ({ src }: { src: string }) => {
  return src;
};

const LocationSearching = () => {
  const [eventSchedule] = useState<string[]>(["All", "Today", "This weekend"]);
  const {
    eventDays,
    eventFilter,
    eventInputSearch,
    eventLocation,
    handleAllClick,
    allEvents,
  } = useAppContext();

  return (
    <section className="md:p-0 px-3">
      <div
        className="searching-area flex items-center gap-[50px] border-y-2
       border-gray-100 py-[25px]"
      >
        <h3 className="text-lg text-[14px] font-semibold">
          Browsing events in {eventLocation}
        </h3>
      </div>

      <div className="schedule-day flex items-center gap-[30px] mb-10">
        {eventSchedule.map((eventDay, index) => {
          return (
            <div
              className={` text-[14px] pt-5 cursor-pointer ${
                eventDay === eventDays
                  ? "border-b-2 border-[#3659e3]"
                  : "border-none"
              }`}
              key={index}
              onClick={() => handleAllClick(eventDay)}
            >
              {eventDay}
            </div>
          );
        })}
      </div>

      <div className="eventDisplay w-full h-full">
        <div
          className={`${
            eventFilter.length > 0 || eventInputSearch.length > 0
              ? "hidden"
              : "block"
          }`}
        >
          <MdCalendarMonth className="text-[50px] m-auto " />

          <h2 className="py-3 text-center">No events in your area</h2>
          <p className="text-gray-600 text-[13px] text-center">
            Try a different location
          </p>
        </div>

        <div className=" grid md:grid-cols-4 grid-col-1 md:gap-[90px] gap-[30px] py-[50px]">
          {(eventInputSearch.length > 0 ? eventInputSearch : eventFilter).map(
            (event, index) => {
              return (
                <div
                  className={`card-cover hover:shadow-lg transition-all duration-200 cursor-pointer md:w-[300px] w-full h-auto pb-[10px] rounded-xl ${
                    allEvents.length > 0 ? "block" : "hidden"
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
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default LocationSearching;
