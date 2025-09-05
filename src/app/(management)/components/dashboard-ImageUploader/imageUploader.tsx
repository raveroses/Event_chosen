"use client";
import { ReactNode, useState } from "react";
import { FaCalendar, FaPlus } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import { ImLocation } from "react-icons/im";
import { MdOutlineLocationOn, MdOutlineOndemandVideo } from "react-icons/md";
import useAppContext from "@/app/_custom-hooks/useAppContext";
const EventTitle = () => {
  const { handleEventCreationOnchange, eventDetailCreation } = useAppContext();
  console.log(eventDetailCreation);
  return (
    <section className="w-full border-2 border-gray-200 hover:border-[#3659e3] md:p-[30px] p-[15px] md:rounded-xl transition-all duration-200 md:bg-transparent bg-white">
      <div className="flex items-start justify-between ">
        <div className="flex flex-col gap-[15px]">
          <h3 className="font-bold text-[25px] ">Event Title</h3>
          <p className="text-[13px]">
            A short and sweet sentence about your event.
          </p>
        </div>

        <div className="bg-gray-100 text-[#3659e3] rounded-full text-[17px] text-center p-[8px] font-bold">
          <FaPlus />
        </div>
      </div>
      <div className="flex gap-[30px] flex-col ">
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
      </div>
    </section>
  );
};

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
const ImageUploader = () => {
  // const { handleEventCreationOnchange, eventDetailCreation } = useAppContext();

  return (
    <section className="md:w-[800px] w-full min-width-full md:overflow-y-scroll overflow-none flex flex-col gap-[10px] md:gap-[100px]  ">
      <div className="relative background w-full md:h-[400px] h-[300px] min-w-full md:rounded-2xl">
        <div className="absolute top-[10px] md:left-[740px] left-[90%] bg-white text-[#3659e3] rounded-full text-center p-[8px] font-bold">
          <FaPlus />
        </div>
        <div
          className="upload absolute top-[100px] left-1/2 -translate-x-1/2
             md:top-[100px] md:left-[360px] md:translate-x-0
             bg-white p-[18px] rounded-2xl w-[140px] h-[130px]
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
        <Overview />
      </div>
    </section>
  );
};

export default ImageUploader;
