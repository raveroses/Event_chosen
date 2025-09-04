"use client";
import Link from "next/link";
import { PiCaretDownBold, PiCaretLeftBold } from "react-icons/pi";
import Image from "next/image";
import { MdCalendarMonth } from "react-icons/md";
import { useState } from "react";

const DashboardFirstBody = () => {
  const [inputContent] = useState<{ heading: string; pcontent?: string }[]>([
    {
      heading: "Build event page",
      pcontent:
        "Add all of your event details and let attendees know what to expect",
    },
    {
      heading: "Add tickets",
      pcontent: "",
    },

    {
      heading: "Publish",
      pcontent: "",
    },
  ]);
  return (
    <section className="">
      <Link
        href={"/"}
        className="text-blue-600 flex gap-[6px] items-center text-[12px] border-b border-gray-300 p-[13px] "
      >
        <PiCaretLeftBold />
        <p>Back to events</p>
      </Link>

      <div className="relative bg-white rounded-xl shadow w-[275px] h-[240px] my-[35px]">
        <Image
          src={"/images/auto-create-floating-card-splatter1.png"}
          alt="image part"
          width={170}
          height={200}
          className="absolute left-[70px] z-10 "
        />
        <Image
          src={"/images/auto-create-floating-card-splatter2.png"}
          alt="image part"
          width={150}
          height={200}
          className="absolute  left-[90px] top-[0px]"
        />

        <div className="content flex flex-col gap-[15px] py-[50px] px-[15px]">
          <h3 className="text-[20px] font-bold">Event Title</h3>

          <div className="date text-gray-600 flex items-center gap-[10px]">
            <MdCalendarMonth className="text-[20px] " />
            <p className="text-[13px]">Mon, Sep 29, 2025, 10:00 AM</p>
          </div>

          <div className="draft flex items-center gap-[5px] justify-center text-[14px] border-2 border-gray-400 rounded-3xl w-[100px] p-[7px] ">
            <p>Draft</p>
            <PiCaretDownBold />
          </div>
        </div>
      </div>
      <div className="steps">
        <p className="text-[10px]">Steps</p>

        <form action="" className=" flex gap-[5px] flex-col">
          {inputContent.map((item, index) => {
            return (
              <div
                className={` flex gap-[10px] items-start p-[5px] ${
                  item.pcontent ? "bg-gray-100" : "bg-transparent"
                }`}
                key={index}
              >
                <div className=" border-2 border-[#3659e3] rounded-full p-1 flex justify-center">
                  <input type="radio" name="" id="" />
                </div>

                <div>
                  <label htmlFor="">
                    <h2 className="text-[13px] font-semibold text-gray-600">
                      {item.heading}
                    </h2>
                    <p className="text-[12px] py-2 text-gray-600">
                      {item.pcontent}
                    </p>
                  </label>
                </div>
              </div>
            );
          })}
        </form>
      </div>
    </section>
  );
};

export { DashboardFirstBody };
