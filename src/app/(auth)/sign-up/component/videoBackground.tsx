"use client";
import { useEffect, useRef } from "react";
import { DesktopLogo } from "@/app/_logo-sizes/Logo";
import { FaApple, FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        console.log("Autoplay blocked until user interacts.");
      });
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/night2.mp4" type="video/mp4" />
      </video>

      <div className="absolute top-[120px] left-[700px] bg-white w-[500px] h-[700px] opacity-50 px-[35px] py-[50px]">
        <DesktopLogo />

        <div className="text-[35px] font-bold py-[45px]">
          <h2>Welcome!</h2>
          <h2>Whats your email?</h2>
        </div>
        <form>
          <input
            type="email"
            name=""
            id=""
            placeholder="Email"
            className="border w-full p-[15px]"
          />
          <button className="w-full text-white bg-[#d1410c] p-2 rounded my-[30px] ">
            Continue
          </button>
        </form>
        <div className="flex justify-center items-center gap-[4px]">
          <span className="border-b border-gray-600 w-[150px]"></span>Or sign in
          with <span className="border-b border-gray-600 w-[150px]"> </span>
        </div>

        <div className="text-[13px] text-center mt-5">
          By clicking Continue or the Apple, Google, or Facebook icons, you
          agree to Eventbrites Terms of Service and Privacy Policy.
        </div>

        <div className="flex ">
          <div className="apple">
            <FaApple />
          </div>
          <div className="google">
            <FcGoogle />
          </div>
          <div className="Facebook">
            <FaFacebook />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBackground;
