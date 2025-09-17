import { FaTimes } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
const Overlay = () => {
  return (
    <section className="bg-[#f8f7fa] shadow md:w-[800px] w-full p-5 absolute top-[220px] md:left-[300px] left=0 hidden">
      <div className="flex justify-end">
        <FaTimes />
      </div>
      <h3 className="text-[20px] font-bold text-center py-[10px]">
        How do you want to build your event?
      </h3>

      <div className="bg-white shadow rounded flex flex-col md:w-[500px] w-full h-[200px] mx-auto p-[30px]">
        <div className="mx-auto bg-gray-200 text-[#365ee4] rounded-full text-[20px] p-[10px]">
          <FaPencil />
        </div>

        <div className="text-center pt-[30px]">
          <h3 className="text-[16px] font-bold">Start from scratch</h3>
          <p className="text-[14px] pt-1">
            Add all your event details, create new tickets, and set up recurring
            events
          </p>
        </div>
      </div>
    </section>
  );
};

export default Overlay;
