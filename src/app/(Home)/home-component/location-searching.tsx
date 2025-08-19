"use client";
import { useState } from "react";
import { MdCalendarMonth } from "react-icons/md";
import { PiCaretDownBold } from "react-icons/pi";

const LocationSearching = () => {
  const [eventSchedule] = useState<string[]>(["All", "Today", "This weekend"]);

  return (
    <section className="px-4">
      <div
        className="searching-area w-full min-w-full flex items-center gap-[50px] border-y-2
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

      <div className="eventDisplay w-full h-[300px] flex justify-center items-center">
        <div>
          <MdCalendarMonth className="text-[50px] m-auto " />

          <h2 className="py-3">No events in your area</h2>
          <p className="text-gray-600 text-[13px] text-center">
            Try a different location
          </p>
        </div>
      </div>
    </section>
  );
};

export default LocationSearching;
