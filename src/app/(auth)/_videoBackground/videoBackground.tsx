"use client";
import { useEffect, useRef } from "react";
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
    <video
      ref={videoRef}
      className="absolute top-0 left-0 w-full md:h-full h-[750px] object-cover object-center z-0"
      autoPlay
      muted
      loop
      playsInline
    >
      <source src="/videos/night2.mp4" type="video/mp4" />
    </video>
  );
};

export default VideoBackground;
