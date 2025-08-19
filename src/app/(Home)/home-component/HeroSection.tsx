"use client";
import Image from "next/image";
import { JSX, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdNightlife,
  MdOutlineBusiness,
  MdOutlineFastfood,
} from "react-icons/md";
import { TfiMicrophoneAlt } from "react-icons/tfi";
import { FaMasksTheater } from "react-icons/fa6";
import { TbBeach } from "react-icons/tb";
import { BsChatLeftHeartFill } from "react-icons/bs";
import { PiGameControllerBold } from "react-icons/pi";
type HeroSection = {
  mobile: string;
  desktop: string;
};

type Activities = {
  activity: string;
  icon: JSX.Element;
};

const HeroSection = (): JSX.Element => {
  const [heroSection] = useState<HeroSection[]>([
    { mobile: "/images/hero-mobile.webp", desktop: "/images/hero.webp" },
    { mobile: "/images/hero2-mobile.webp", desktop: "/images/hero2.webp" },
    { mobile: "/images/hero3-mobile.webp", desktop: "/images/hero3.webp" },
  ]);

  const [activities] = useState<Activities[]>([
    {
      activity: "Music",
      icon: <TfiMicrophoneAlt />,
    },
    {
      activity: "Nightlife",
      icon: <MdNightlife />,
    },
    { activity: "Performing & Visual Arts", icon: <FaMasksTheater /> },
    { activity: "Holidays", icon: <TbBeach /> },
    { activity: "Dating", icon: <BsChatLeftHeartFill /> },
    { activity: "Hobbies", icon: <PiGameControllerBold /> },
    { activity: "Business", icon: <MdOutlineBusiness /> },
    { activity: "Food & Drink", icon: <MdOutlineFastfood /> },
  ]);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const heroMapping = heroSection.map((heroImage, index) => {
    return (
      <SwiperSlide key={index}>
        <div className="relative w-full min-w-full h-[400px]">
          <button
            className="custom-prev absolute top-1/2 left-4 -translate-y-1/2 z-10"
            ref={prevRef}
          >
            <MdArrowBackIos className="m-2" />
          </button>
          <button
            className="custom-next absolute top-1/2 right-4 -translate-y-1/2 z-10"
            ref={nextRef}
          >
            <MdArrowForwardIos className="m-2" />
          </button>

          <Image
            src={heroImage.desktop}
            alt={`hero-section-${index + 1}`}
            fill
            className="object-center object-cover  rounded-t-2xl rounded-b-xl md:block"
          />
          <Image
            src={heroImage.mobile}
            alt={`hero-section-${index + 1}`}
            fill
            className="object-center object-cover  md:hidden block"
          />
        </div>
      </SwiperSlide>
    );
  });

  return (
    <div className="w-full min-w-full my-4  ">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 5000 }}
        onInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {heroMapping}
      </Swiper>

      <section className="w-full min-w-full flex items-center md:justify-between gap-[50px] px-2 my-10 md:overflow-hidden overflow-x-scroll">
        {activities.map((activitis, index) => {
          return (
            <div key={index} className="group cursor-pointer w-[110px]">
              <div className="group-hover:bg-blue-100    border border-gray-200 rounded-full w-[100px] h-[100px] flex justify-center items-center text-[35px] text-gray-500 ">
                {activitis.icon}
              </div>

              <h4 className="group-hover:text-blue-500 text-center text-[14px] font-medium">
                {activitis.activity}
              </h4>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default HeroSection;
