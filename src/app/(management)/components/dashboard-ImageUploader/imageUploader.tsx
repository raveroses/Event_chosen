"use client";
import { FaArrowRightLong, FaPlus } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import EventTitle from "../event-title/event-title";
import Date from "../date-title/date";
import Overview from "../overview/overview";
import useAppContext from "@/app/_custom-hooks/useAppContext";
import { useEffect, useRef, useState } from "react";
import { BsStars } from "react-icons/bs";
import { GrGallery } from "react-icons/gr";
import Image from "next/image";
import { Saved } from "@/app/_types/types";
const ImageUploader = () => {
  const {
    handleEventDetailCreationSubmission,
    handleImageOnchange,
    handleImageTrigger,
    imageRef,
    selectImageFile,
    getAllImageRecords,
    previewImage,
    imageSetter
  } = useAppContext();

  const fallbackImages = ["/yoga.jpeg", "/set.jpeg", "/herosec.jpeg"];

  const [currentImage, setCurrentImage] = useState<File | string | null>(
    imageSetter.length > 0 ? imageSetter[0]?.image ?? null : fallbackImages[0],
  );

  console.log("Length checker", imageSetter.length);

  const isImageFetchAvailable = imageSetter.length > 0

  const imageCount = useRef<number>(0);
  useEffect(() => {

    if (imageSetter.length > 0 && !currentImage) {
      setCurrentImage(imageSetter[0]?.image);
    } else if (!currentImage) {
      setCurrentImage(fallbackImages[0]);
    }

    const handleImageSwipping = () => {
      const activeList = isImageFetchAvailable ? imageSetter.map(i => i.image) : fallbackImages;

      if (imageCount.current < activeList.length - 1) {
        const next = imageCount.current + 1;
        imageCount.current = next;
        setCurrentImage(activeList[next]);
      } else {
        imageCount.current = 0;
        setCurrentImage(activeList[0]);
      }
    };

    const intervalId = setInterval(handleImageSwipping, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [imageSetter]);


  const getBackgroundImageUrl = () => {
    if (previewImage) return previewImage;
    if (!currentImage) return '';

    if (currentImage instanceof File) {
      return URL.createObjectURL(currentImage);
    }

    // If it's already a string path (from database or fallback)
    return currentImage.startsWith('/') ? currentImage : `/images/${currentImage}`;
  };



  return (
    <section className="md:w-[800px] w-full min-width-full md:overflow-y-scroll overflow-none flex flex-col gap-[10px] md:gap-[100px] relativ ">
      <div
        className={`relative background w-full md:h-[400px] h-[300px] min-w-full md:rounded-2xl`}
        style={{
          backgroundImage: `url(${getBackgroundImageUrl()})`,
        }}
      >
        <div className="absolute top-[10px] md:left-[740px] left-[90%] bg-white text-[#3659e3] rounded-full text-center p-[8px] font-bold z-30" >
          <FaPlus />
        </div>
        <div
          className="upload absolute top-[100px] left-1/2 -translate-x-1/2
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

        <div className="pagination absolute bottom-5 flex gap-3 px-5">
          {Array(isImageFetchAvailable ? imageSetter.length : fallbackImages.length).fill(null).map((_, index: number) => {
            const isNumberAlignWithCurrentImage = index === imageCount.current
            return (
              <div className={`${isNumberAlignWithCurrentImage ? "bg-white" : "opacity-50"}  border-3  w-[240px]`} key={index}></div>

            )
          })}
        </div>
      </div>
      <div className="border border-gray-300 px-6 py-10">
        <h1 className="text-2xl font-extrabold">
          Add images and video
        </h1>
        <h5 className="text-[16px] font-bold py-5">
          Images
        </h5>

        <div className="flex gap-2 items-center">
          <div className="text-[#3659e3] text-xl">
            <BsStars />
          </div>
          <div className="text-[13px] flex items-center gap-2">
            <p>
              <span className="font-bold">Pro tip: </span>
              <span className="text-gray-500">
                Use photos that set the mood, and avoid distracting text overlays.
              </span>
            </p>
            <div className="flex items-center mt-1 text-[#3659e3]">
              <span>View examples</span>
              <FaArrowRightLong />
            </div>
          </div>
        </div>

        <div className="draganddropcontainer bg-[#f8f7fa] rounded-xl w-full h-[400px] flex flex-col justify-center items-center"
          onClick={handleImageTrigger}
        >


          <input
            type="file"
            onChange={handleImageOnchange}
            className="hidden"
            ref={imageRef}
            multiple
          />

          <div className="flex flex-col gap-5 justify-center items-center">

            <div className="text-4xl">
              <GrGallery />
            </div>
            <h1 className="text-md font-bold">
              Drag and drop an image or
            </h1>
          </div>

          <div className="border-2 border-gray-500 flex gap-5 items-center px-7 py-2 rounded mt-4">
            <GrGallery size={12} />
            <p className="text-[13px] font-semibold">Upload Image </p>
          </div>
        </div>

        {imageSetter.length > 0 && <div className="savedImages flex items-center gap-3 py-5">
          <div className="bg-[#dbdae3] w-[120px] h-[60px] flex justify-center items-center text-[20px] font-semibold text-[#3659e3] rounded-md">
            <FaPlus />
          </div>

          {imageSetter.map((image_detail, index) => {
            let url = "";
            if (!image_detail.image) return null
            url = URL.createObjectURL(image_detail.image);


            return (<div key={index}>
              <Image src={url} alt="image" width={120} height={60} className="w-[120px] h-[60px] rounded-md object-center object-cover " />
            </div>)
          })}

        </div>}
      </div>
      <div className="flex flex-col gap-[20px]">
        <EventTitle />
        <Date />
        <Overview />
        <div className="flex md:justify-end justify-center">
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
