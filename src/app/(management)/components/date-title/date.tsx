"use client";
import { CiSearch } from "react-icons/ci";
import useAppContext from "@/app/_custom-hooks/useAppContext";
import { ImLocation } from "react-icons/im";
import { MdOutlineLocationOn, MdOutlineOndemandVideo } from "react-icons/md";
import { ReactNode, useState } from "react";
import { FaCalendar, FaPlus } from "react-icons/fa6";
import DatePicker from "../date-picker/datePicker";
import SelectDemo from "../selector/selectorPicker";
const Date = () => {
  const {
    handleEventCreationOnchange,
    eventDetailCreation,
    handleEventLocationChoosen,
    locationCreationChoosen,
  } = useAppContext();

  const [DateInput] = useState<
    {
      icon: ReactNode;
      heading: string;
      pcontent: string;
      values: string;
    }[]
  >([
    {
      icon: <FaCalendar />,
      heading: "  Single Event",
      pcontent: " For events that happen once",
      values: "single",
    },
    {
      icon: <FaCalendar />,
      heading: "Reccurring Event",
      pcontent: "For timed entry and multiple days ",
      values: "reoccuring",
    },
  ]);

  const [locations] = useState<
    {
      icon: ReactNode;
      locationType: string;
    }[]
  >([
    { icon: <ImLocation />, locationType: "Venue" },

    { icon: <MdOutlineOndemandVideo />, locationType: "Online event" },

    { icon: <FaCalendar />, locationType: "To be announced" },
  ]);

  const [isLocationFocus, setIsLocationFocus] = useState<boolean>(false);
  //   const handleIsLocationFocus = () => {
  //     setIsLocationFocus(true);
  //   };

  return (
    <section className="border-2 border-gray-200 hover:border-[#3659e3] md:p-[30px] p-[15px] md:rounded-xl transition-all duration-200 md:bg-transparent bg-white">
      <div className="flex md:flex-row flex-col md:items-center md:justify-between md:gap-0 gap-[20px]">
        <div>
          <h2 className="text-[20px] font-bold">Date and time</h2>

          <div className="flex items-center gap-2 font-semibold">
            <FaCalendar />
            <p className=" text-[12px]">
              Tuesday, September 30 · 10am - 12pm WAT
            </p>
          </div>
        </div>
        <div className="text-[20px] font-bold">
          <h2>Location</h2>
          <div className="flex items-center ">
            <MdOutlineLocationOn />
            <input
              type="text"
              className="border-none outline-none placeholder:text-[10px]"
              placeholder="Enter location"
            />
          </div>
        </div>
        <div className="bg-gray-100 text-[#3659e3] rounded-full text-[17px] text-center p-[8px] font-bold">
          <FaPlus />
        </div>
      </div>

      <div className="flex flex-col gap-[25px] ">
        <h2 className="text-[18px] font-bold">Date and location</h2>

        <h2 className="text-[15px] text-gray-600">Type of Event</h2>

        <div className="flex md:flex-row flex-col items-center md:justify-between gap-0 gap-[20px] ">
          {DateInput.map((item, index) => {
            return (
              <div
                className="flex items-center justify-between border border-gray-300 md:p-2 p-5 rounded md:w-[350px] w-full"
                key={index}
              >
                <label className="flex items-center gap-[20px] ">
                  <div className="text-[20px] text-gray-600">
                    <FaCalendar />
                  </div>
                  <div>
                    <h1 className="font-semibold text-[15px] text-gray-600">
                      {item.heading}
                    </h1>
                    <p className="text-[14px] text-gray-600">{item.pcontent}</p>
                  </div>
                </label>
                <input
                  type="radio"
                  name="eventStatus"
                  value={item.values}
                  onChange={handleEventCreationOnchange}
                  checked={eventDetailCreation.eventStatus === item.values}
                />
              </div>
            );
          })}
        </div>

        <p className="bg-gray-300 md:w-[370px] w-full text-gray-600 rounded text-[13px] p-2">
          You’ll be able to add dates and times in the next step.
        </p>

        <div>
          <DatePicker />
        </div>

        <div>
          <SelectDemo />
        </div>
        <h2>Location</h2>

        <div className="flex items-center space-x-2 bg-gray-100 md:w-[500px] w-full md:overflow-hidden overflow-x-auto rounded-xl p-2 scrollbar-hide">
          {locations.map((item, index) => (
            <div
              key={index}
              className={`flex-shrink-0 flex items-center gap-[5px] px-3 py-2 rounded-md text-sm font-semibold cursor-pointer transition-colors duration-200
        ${
          item.locationType === locationCreationChoosen
            ? "bg-[#3659e3] text-white hover:bg-blue-400"
            : "hover:bg-gray-300"
        }`}
              onClick={() => handleEventLocationChoosen(item.locationType)}
            >
              <div className="text-[18px]">{item.icon}</div>
              <div>{item.locationType}</div>
            </div>
          ))}
        </div>

        {locationCreationChoosen === "Venue" && (
          <div className="venuDiv relative">
            <input
              type="text"
              name="eventLocationsCreate"
              onChange={handleEventCreationOnchange}
              value={eventDetailCreation.eventLocationsCreate}
              className="w-full border rounded py-[14px] placeholder:px-[40px]  p-5 placeholder:text-[20px]"
              placeholder="location"
              onFocus={() => setIsLocationFocus(true)}
              onBlur={() => setIsLocationFocus(false)}
            />
            <div
              className={`absolute top-[13px] text-[25px] left-[10px] ${
                !isLocationFocus ? "block" : "hidden"
              }`}
            >
              <CiSearch />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Date;
