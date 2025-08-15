import { PiCaretDownBold } from "react-icons/pi";

const LocationSearching = () => {
  return (
    <section className="px-4">
      <div className="searching-area flex items-center gap-[50px] border-y-2 border-gray-100 py-[25px]">
        <h3 className="text-lg font-semibold">Browsing events in </h3>
        <form className="flex items-center gap-2 ">
          <PiCaretDownBold className="text-[25px] text-blue-600 font-bold" />
          <input
            type="text"
            placeholder="Ibadan"
            className="placeholder:text-[18px] placeholder:font-bold 
            placeholder:text-blue-600 focus:placeholder:text-gray-600 outline-none border-none text-[18px] font-bold "
          />
        </form>
      </div>

      <div className="schedule-day flex items-center gap-[30px] mb-10">
        <div className="border-b-3 text-[13px] font-bold border-blue-600">
          All
        </div>
        <div>Today</div>
        <div>This weekend</div>
      </div>
    </section>
  );
};

export default LocationSearching;
