"use client";

import useAppContext from "@/app/_custom-hooks/useAppContext";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
const EventTitle = () => {
  const [isEventOpen, setEventOpen] = useState<boolean>(false);

  const handleEventOpen = () => {
    setEventOpen((prev) => !prev);
  };

  const { handleEventCreationOnchange, eventDetailCreation } = useAppContext();
  return (
    <section className="w-full border-2 border-gray-200 hover:border-[#3659e3] md:p-[30px] p-[15px] md:rounded-xl transition-all duration-200 md:bg-transparent bg-white">
      <div className="flex items-start justify-between ">
        <div className="flex flex-col gap-[15px]">
          <h3 className="font-bold text-[25px] ">Event Title</h3>
          <p className="text-[13px]">
            A short and sweet sentence about your event.
          </p>
        </div>

        <div
          className="bg-gray-100 text-[#3659e3] rounded-full text-[17px] text-center p-[8px] font-bold"
          onClick={handleEventOpen}
        >
          <FaPlus />
        </div>
      </div>
      <div
        className={`flex gap-[30px] flex-col ${
          isEventOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-[20px]">Event Overview</h2>
          <h3 className="text-[15px]">Event title</h3>
          <p className="text-[13px]  text-gray-400">
            Be clear and descriptive with a title that tells people what your
            event is about.
          </p>

          <input
            type="text"
            className="border-2 w-full p-3 rounded"
            name="eventTitle"
            value={eventDetailCreation.eventTitle}
            onChange={handleEventCreationOnchange}
          />
        </div>

        <div className="summary flex gap-[30px] flex-col ">
          <h3 className=" text-[15px]">Summary</h3>
          <p className="text-[13px]  text-gray-400">
            Grab peoples attention with a short description about your event.
            Attendees will see this at the top of your event page. (140
            characters max) See examples
          </p>

          <textarea
            className="border-2 w-full p-3 rounded"
            name="eventSummary"
            value={eventDetailCreation.eventSummary}
            onChange={handleEventCreationOnchange}
          ></textarea>
        </div>
      </div>
    </section>
  );
};

export default EventTitle;
