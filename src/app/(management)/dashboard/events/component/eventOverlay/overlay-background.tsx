"use client";
import useAppContext from "@/app/_custom-hooks/useAppContext";

const OverlayBackground = () => {
  const { eventCreation, isPopUp, selectImageFile } = useAppContext();
  return (
    <div
      className={`bg-black opacity-50 w-full h-full absolute top-0 left-0 ${eventCreation || (isPopUp && selectImageFile) ? "block" : "hidden"
        }`}
    ></div>
  );
};

export default OverlayBackground;
