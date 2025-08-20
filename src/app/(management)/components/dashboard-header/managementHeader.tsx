import { MobileLogo } from "@/app/_logo-sizes/Logo";
import { DesktopLogo } from "@/app/_logo-sizes/Logo";
import { CgMenuGridR } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineNotifications } from "react-icons/md";
import { PiCaretDownBold } from "react-icons/pi";
const ManagmentHeader = () => {
  return (
    <header className="flex justify-between items-center border-b border-gray-200 pb-[8px]">
      <div className="md:hidden">
        <MobileLogo />
      </div>
      <div className="md:block hidden">
        <DesktopLogo />
      </div>

      <div className="md:hidden text-[25px]">
        <CgMenuGridR />
      </div>

      <div className="other-content flex gap-[40px] items-center cursor-pointer">
        <div className="create md:border-2 border border-[#d4441f] hover:border-[#3659e3] transition-all duration-200 text-[#d4441f] rounded-full flex items-center gap-[3px] p-2">
          <div className="text-[14px]">
            <FaPlus />
          </div>
          <h3 className="text-[13px] md:block hidden ">Create</h3>
        </div>
        <div className="notification-icon text-[25px] cursor-pointer hover:bg-gray-200 p-1">
          <MdOutlineNotifications />
        </div>
        <div
          className="account flex justify-between items-center md:gap-2 gap-4 p-1 rounded-4xl
         md:border-2 md:border-transparent md:hover:border-[#3659e3] md:bg-transparent hover:bg-gray-200 cursor-pointer transition-all duration-200"
        >
          <div className="profileImage bg-[#3659e3] rounded-full text-white text-center p-[6px] text-[10px]">
            OW
          </div>
          <div className="profileName text-[14px] font-medium md:block hidden">
            Odekunle Waris
          </div>
          <div className="profileIcon text-[12px] font-bold">
            <PiCaretDownBold />
          </div>
        </div>
      </div>
    </header>
  );
};

export default ManagmentHeader;
