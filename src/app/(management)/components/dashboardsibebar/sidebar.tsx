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
  path_name: string;
};
const Sidebar = () => {
  const origin = window.location.origin
  const [SidebarListing] = useState<SidebarIcon[]>([
    { icon: <TiHomeOutline />, hoverText: "Home", path_name: "/" },
    { icon: <BsCalendarDate />, hoverText: "Events", path_name: "/events" },
    { icon: <GiStabbedNote />, hoverText: "Orders", path_name: "#" },
    { icon: <BsMegaphone />, hoverText: "Marketing", path_name: "#" },
    { icon: <GrBarChart />, hoverText: "Reporting", path_name: "#" },
    { icon: <BsBank />, hoverText: "Finance", path_name: "#" },
    { icon: <IoIosSettings />, hoverText: "Setting", path_name: "#" },
  ]);

  const pathname = usePathname();
  console.log("pathname", pathname);

  const { menuDisplay } = useAppContext();

  return (
    <section
      className={`md:flex md:flex-col md:static absolute top-[99px] gap-[40px] border-r border-gray-200 px-[10px] py-[40px] md:bg-gray-100 bg-white
       w-full h-[400px] md:h-[600px] z-20 ${menuDisplay ? "grid grid-cols-3 " : "hidden"
        }`}
    >
      {SidebarListing.map((sidebarItem, index) => {
const isPathCorrect= sidebarItem.path_name !== "/" ? sidebarItem.path_name.trim() : sidebarItem.path_name.replace("/","").trim()
        return (
          <div
            className="group relative flex md:flex-row flex-col items-center px-[6px] justify-center "
            key={index}
          >
            {/* <Link href={`/dashboard/${firstLetter.concat(restLetter)}`}> */}
            <Link href={`/dashboard${isPathCorrect}`}>
              <div
                className={`iconPalace text-[30px] text-gray-600 rounded p-[6px] cursor-pointer text-gray-300 ${pathname.trim() === `/dashboard${isPathCorrect }`
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
