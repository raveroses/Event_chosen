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
  return <></>;
};
export default Sidebar;
