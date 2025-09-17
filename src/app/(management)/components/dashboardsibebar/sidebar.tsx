"use client";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { BsBank, BsCalendarDate, BsMegaphone } from "react-icons/bs";
import { GiStabbedNote } from "react-icons/gi";
import { GrBarChart } from "react-icons/gr";
import { IoIosSettings } from "react-icons/io";
import { TiHomeOutline } from "react-icons/ti";
import Link from "next/link";
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

  const pathname = usePathname();

  return (
    <section className="flex flex-col gap-[40px] border-r border-gray-200 px-[10px] py-[40px] bg-gray-100 h-[600px]">
      {SidebarListing.map((sidebarItem, index) => {
        const firstLetter = sidebarItem.hoverText[0].toLowerCase();
        const restLetter = sidebarItem.hoverText.slice(1);
        return (
          <div
            className="group relative flex items-center px-[6px] justify-center "
            key={index}
          >
            <Link href={`/${firstLetter.concat(restLetter)}`}>
              <div
                className={`iconPalace text-[30px] text-gray-600 rounded p-1 cursor-pointer ${
                  pathname === `/dashboard/${firstLetter.concat(restLetter)}`
                    ? "bg-[#3659e3] md:text-white"
                    : "bg-transparent"
                }   `}
              >
                {sidebarItem.icon}
              </div>
            </Link>

            <div
              className="hoverplace absolute left-full ml-[20px] text-[12px] text-gray-600 bg-white shadow p-2 rounded 
               opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-10"
            >
              {sidebarItem.hoverText}
            </div>
          </div>
        );
      })}
    </section>
  );
};
export default Sidebar;
