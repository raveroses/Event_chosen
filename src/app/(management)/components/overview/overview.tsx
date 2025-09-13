"use client";

import useAppContext from "@/app/_custom-hooks/useAppContext";
import { FaPlus } from "react-icons/fa6";

const Overview = () => {
  const { handleEventCreationOnchange, eventDetailCreation } = useAppContext();

  return (
    <section className=" border-2 border-gray-200 hover:border-[#3659e3] md:p-[30px] p-[15px] md:rounded-xl transition-all duration-200 md:bg-transparent bg-white">
      <div className="flex items-start justify-between hidde">
        <div className="flex flex-col gap-[15px]">
          <h3 className="font-bold text-[20px] "> Overview</h3>
          <p className="text-[13px]">
            Use this section to provide more details about your event. You can
            include things to know, venue information, accessibility
            options—anything that will help people know what to expect.
          </p>

          <div className="hidd">
            <div className="text-[14px] flex gap-[15px] flex-col">
              <p>
                Add more details about your event and include what people can
                expect if they attend.
              </p>
              <p>
                Use arrow keys to navigate between modules. Use the up and down
                buttons to reorder modules
              </p>
            </div>
            <div>
              <textarea
                name="eventOverview"
                value={eventDetailCreation.eventOverview}
                className="border rounded w-full h-[100px] focus:outline-[#3659e3] resize-none"
                onChange={handleEventCreationOnchange}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 text-[#3659e3] rounded-full text-[17px] text-center p-[8px] font-bold">
          <FaPlus />
        </div>
      </div>
    </section>
  );
};

export default Overview;
