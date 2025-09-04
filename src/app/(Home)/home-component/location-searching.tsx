"use client";
import { MdCalendarMonth } from "react-icons/md";
import { PiCaretDownBold } from "react-icons/pi";

import Image from "next/image";
import { useState } from "react";
import useAppContext from "@/app/_custom-hooks/useAppContext";

const LocationSearching = () => {
  const [eventSchedule] = useState<string[]>(["All", "Today", "This weekend"]);
  const {
    eventData,
    // eventLocation,
    // handleEventLocation,
    // handleClear,
    // handleSearchEventEnter,
    // handleSeachFocus,
    // searchFocus,
    eventFilter,
    eventInputSearch,
  } = useAppContext();
  //   const eventFilter= eventData.filter((event)=>{
  // return event.venue === ""
  //   })

  console.log(eventInputSearch);
  return (
    <section className="   ">
      <div
        className="searching-area flex items-center gap-[50px] border-y-2
       border-gray-100 py-[25px]"
      >
        <h3 className="text-lg text-[14px] font-semibold">
          Browsing events in{" "}
        </h3>
        <form className="flex items-center gap-2 ">
          <PiCaretDownBold className="text-[25px] text-blue-600 font-bold" />
          <input
            type="text"
            placeholder="Ibadan"
            className="placeholder:text-[18px] placeholder:font-bold 
            placeholder:text-blue-600 focus:placeholder:text-gray-600 outline-none border-none 
            text-[18px] font-bold w-[200px]"
          />
        </form>
      </div>

      <div className="schedule-day flex items-center gap-[30px] mb-10">
        {eventSchedule.map((eventDay, index) => {
          return (
            <div className="border-b-3 text-[14px] border-blue-600" key={index}>
              {eventDay}
            </div>
          );
        })}
      </div>

      <div className="eventDisplay w-full h-full">
        <div className="hidden">
          <MdCalendarMonth className="text-[50px] m-auto " />

          <h2 className="py-3 text-center">No events in your area</h2>
          <p className="text-gray-600 text-[13px] text-center">
            Try a different location
          </p>
        </div>

        <div className=" grid grid-cols-4 gap-[30px]">
          {(eventInputSearch.length > 0 ? eventInputSearch : eventFilter).map(
            (event, index) => {
              return (
                <div
                  className={`card-cover hover:shadow-lg transition-all duration-200 cursor-pointer w-[300px] h-[350px] rounded-xl ${
                    eventData.length > 0 ? "block" : "hidden"
                  }`}
                  key={index}
                >
                  <div className="relative w-[300px] h-[180px] rounded">
                    <Image
                      alt="card-image"
                      fill={true}
                      src={`${event.image}`}
                      className=" object-cover object-center"
                    />
                  </div>

                  <div className="text-gray-600 px-5">
                    <h3 className="py-1 text-[18px] ">{event.eventTitle}</h3>
                    <div className="timeandDate text-[14px]">
                      <span className="day"> {event.day}</span>
                      <span> {event.date}</span>
                      <span> {event.startTime} AMs</span>
                    </div>

                    <h3>{event.category}</h3>
                    <p>{event.content}</p>
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
