"use client";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { BsBank, BsCalendarDate, BsMegaphone } from "react-icons/bs";
import { GiStabbedNote } from "react-icons/gi";
import { GrBarChart } from "react-icons/gr";
import { IoIosSettings } from "react-icons/io";
import { TiHomeOutline } from "react-icons/ti";
import Link from "next/link";
import useAppContext from "@/app/_custom-hooks/useAppContext";
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
  const { menuDisplay } = useAppContext();

  return (
    <section
      className={`md:flex md:flex-col md:static absolute top-[99px] gap-[40px] border-r border-gray-200 px-[10px] py-[40px] md:bg-gray-100 bg-white
       w-full h-[400px] md:h-[600px] z-20 ${
         menuDisplay ? "grid grid-cols-3 " : "hidden"
       }`}
    >
      {SidebarListing.map((sidebarItem, index) => {
        const firstLetter = sidebarItem.hoverText[0].toLowerCase();
        const restLetter = sidebarItem.hoverText.slice(1);
        return (
          <div
            className="group relative flex md:flex-row flex-col items-center px-[6px] justify-center "
            key={index}
          >
            <Link href={`/dashboard/${firstLetter.concat(restLetter)}`}>
              <div
                className={`iconPalace text-[30px] text-gray-600 rounded p-[6px] cursor-pointer text-gray-300 ${
                  pathname === `/dashboard/${firstLetter.concat(restLetter)}`
                    ? "bg-[#3659e3] text-white "
                    : "bg-transparent"
                }   `}
              >
                {sidebarItem.icon}
              </div>
            </Link>

            <div
              className="hoverplace md:absolute static left-full md:ml-[20px] text-[12px] text-gray-600 md:bg-white md:shadow p-2 rounded 
               md:opacity-0 md:group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-10 "
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
