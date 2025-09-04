"use client";
import { ReactNode, useState } from "react";
import { FaCalendar, FaPlus } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import { ImLocation } from "react-icons/im";
import { MdOutlineLocationOn, MdOutlineOndemandVideo } from "react-icons/md";

const EventTitle = () => {
  return (
    <section className=" border-2 border-gray-200 hover:border-[#3659e3] p-[30px] rounded-xl transition-all duration-200">
      <div className="flex items-start justify-between hidde">
        <div className="flex flex-col gap-[15px]">
          <h3 className="font-bold text-[25px] ">Event Title</h3>
          <p>A short and sweet sentence about your event.</p>
        </div>

        <div className="bg-gray-100 text-[#3659e3] rounded-full text-[17px] text-center p-[8px] font-bold">
          <FaPlus />
        </div>
      </div>
      <div className="flex gap-[30px] flex-col hidden">
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-[20px]">Event Overview</h2>
          <h3 className="text-[15px]">Event title</h3>
          <p className="text-[13px]  text-gray-400">
            Be clear and descriptive with a title that tells people what your
            event is about.
          </p>

          <input type="text" className="border-2 w-full p-3 rounded" />
        </div>

        <div className="summary flex gap-[30px] flex-col ">
          <h3 className=" text-[15px]">Summary</h3>
          <p className="text-[13px]  text-gray-400">
            Grab peoples attention with a short description about your event.
            Attendees will see this at the top of your event page. (140
            characters max) See examples
          </p>

          <textarea
            name=""
            id=""
            className="border-2 w-full p-3 rounded"
          ></textarea>
        </div>
      </div>
    </section>
  );
};

const Date = () => {
  const [DateInput] = useState<
    {
      icon: ReactNode;
      heading: string;
      pcontent: string;
    }[]
  >([
    {
      icon: <FaCalendar />,
      heading: "  Single Event",
      pcontent: " For events that happen once",
    },
    {
      icon: <FaCalendar />,
      heading: "Reccurring Event",
      pcontent: "For timed entry and multiple days ",
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

  return (
    <section className=" border-2 border-gray-200 hover:border-[#3659e3] p-[30px] rounded-xl transition-all duration-200">
      <div className="flex  items-center justify-between">
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

      <div className="flex flex-col gap-[25px] hidden">
        <h2 className="text-[18px] font-bold">Date and location</h2>

        <h2 className="text-[15px] text-gray-600">Type of Event</h2>

        <div className="flex items-center justify-between ">
          {DateInput.map((item, index) => {
            return (
              <div
                className="flex items-center gap-[20px] border border-gray-300 p-2 rounded w-[350px]"
                key={index}
              >
                <div className="text-[20px] text-gray-600">
                  <FaCalendar />
                </div>
                <label className="flex items-center gap-[20px] ">
                  <div>
                    <h1 className="font-semibold text-[15px] text-gray-600">
                      {item.heading}
                    </h1>
                    <p className="text-[14px] text-gray-600">{item.pcontent}</p>
                  </div>
                  <input type="radio" name="" id="" />
                </label>
              </div>
            );
          })}
        </div>

        <p className="bg-gray-300 w-[370px] text-gray-600 rounded text-[13px] p-2">
          You’ll be able to add dates and times in the next step.
        </p>

        <h2>Location</h2>

        <div className="flex items-center bg-gray-100 w-[400px] rounded-xl">
          {locations.map((item, index) => {
            return (
              <div
                className={`flex items-center gap-[5px] ${
                  item.locationType === "Venue" &&
                  "bg-[#3659e3] text-white hover:bg-blue-400"
                } p-2 hover:bg-gray-300 cursor-pointer`}
                key={index}
              >
                <div className="text-[18px]">{item.icon}</div>
                <div className="text-[13px] font-semibold">
                  {item.locationType}
                </div>
              </div>
            );
          })}
        </div>

        <input type="text" className="w-full border-2 p-2 rounded " />
      </div>
    </section>
  );
};

const ImageUploader = () => {
  return (
    <section className=" w-[800px] overflow-y-scroll flex flex-col  ">
      <div className="relative background w-full h-[400px] min-w-full rounded-2xl">
        <div className="absolute top-[10px] left-[740px] bg-white text-[#3659e3] rounded-full text-center p-[8px] font-bold">
          <FaPlus />
        </div>
        <div
          className="upload absolute top-[100px] left-[360px] bg-white p-[18px] rounded-2xl w-[140px] h-[130px] 
        flex justify-center items-center flex-col text-center gap-[30px]"
        >
          <div className="icon bg-gray-100 rounded-full p-2 text-[20px] text-[#3659e3]">
            <FiUpload />
          </div>
          <h3 className="text-[13px] text-[#3659e3]">
            Upload Images and Videos
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-[20px]">
        <EventTitle />
        <Date />
      </div>
    </section>
  );
};

export default ImageUploader;
