"use client";
import { FaPlus } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import EventTitle from "../event-title/event-title";
import Date from "../date-title/date";
import Overview from "../overview/overview";
import useAppContext from "@/app/_custom-hooks/useAppContext";
const ImageUploader = () => {
  const {
    handleEventDetailCreationSubmission,
    handleImageOnchange,
    handleImageTrigger,
    imageRef,
    eventDetailCreation,
  } = useAppContext();

  return (
    <section className="md:w-[800px] w-full min-width-full md:overflow-y-scroll overflow-none flex flex-col gap-[10px] md:gap-[100px]  ">
      <div
        className={`relative background 
  
    bg-[url(${eventDetailCreation.eventImage ?? "/images/herosec.jpeg"})]

      w-full md:h-[400px] h-[300px] min-w-full md:rounded-2xl`}
      >
        <div className="absolute top-[10px] md:left-[740px] left-[90%] bg-white text-[#3659e3] rounded-full text-center p-[8px] font-bold">
          <FaPlus />
        </div>
        <div
          className="upload absolute top-[100px] left-1/2 -translate-x-1/2
             md:top-[100px] md:left-[360px] md:translate-x-0
             bg-white p-[18px] rounded-2xl w-[140px] h-[130px]
             flex justify-center items-center flex-col text-center gap-[30px]"
          onClick={handleImageTrigger}
        >
          <div className="icon bg-gray-100 rounded-full p-2 text-[20px] text-[#3659e3]">
            <FiUpload />
          </div>

          <input
            type="file"
            onChange={handleImageOnchange}
            className="hidden"
            ref={imageRef}
          />

          <h3 className="text-[13px] text-[#3659e3]">
            Upload Images and Videos
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-[20px]">
        <EventTitle />
        <Date />
        <Overview />
        <div className="flex justify-end">
          <button
            className="border bg-[#9f2c15] rounded text-white w-[200px] py-[10px] text-[16px] "
            onClick={handleEventDetailCreationSubmission}
          >
            Publish
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImageUploader;
