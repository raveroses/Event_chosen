"use client";
import { ReactNode, useState } from "react";
import { BsBank, BsCalendarDate, BsMegaphone } from "react-icons/bs";
import { GiStabbedNote } from "react-icons/gi";
import { GrBarChart } from "react-icons/gr";
import { IoIosSettings } from "react-icons/io";
import { TiHomeOutline } from "react-icons/ti";

type SidebarIcon = {
  icon: ReactNode;
  hoverText: string;
};
const Sidebar = () => {
  const [SidebarListing] = useState<SidebarIcon[]>([
    { icon: <TiHomeOutline />, hoverText: "Home" },
    { icon: <BsCalendarDate />, hoverText: "Events" },
    { icon: <GiStabbedNote />, hoverText: "Orders" },
    { icon: <BsMegaphone />, hoverText: "Marketing" },
    { icon: <GrBarChart />, hoverText: "Reporting" },
    { icon: <BsBank />, hoverText: "Finance" },
    { icon: <IoIosSettings />, hoverText: "Setting" },
  ]);
  return (
    <section className="flex flex-col gap-[40px] border-r border-gray-200 pr-[15px] py-[40px]">
      {SidebarListing.map((sidebarItem, index) => {
        return (
          <div className="group relative flex items-center " key={index}>
            <div className="iconPalace text-[25px] text-gray-600 md:text-white bg-[#3659e3] rounded p-1 cursor-pointer">
              {sidebarItem.icon}
            </div>

            <div
              className="hoverplace absolute left-full ml-[20px] text-[12px] text-gray-600 bg-white shadow p-2 rounded 
               opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-10"
            >
              {sidebarItem.hoverText}
            </div>
          </div>
        );
      })}

      <div className="steps">
        <p>Steps</p>
      </div>
    </section>
  );
};
export default Sidebar;
