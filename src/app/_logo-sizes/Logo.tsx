"use client";
import { JSX, useState } from "react";
import Image from "next/image";

type ImageType = {
  mobileImage?: string;
  desktopImage?: string;
};
const MobileLogo = (): JSX.Element => {
  const [imageSizes] = useState<ImageType>({
    mobileImage: "/images/mobile-logo.png",
  });
  return (
    <Image
      src={imageSizes.mobileImage!}
      alt="mobile-logo"
      width={100}
      height={50}
    />
  );
};
const DesktopLogo = (): JSX.Element => {
  const [imageSizes] = useState<ImageType>({
    desktopImage: "/images/desktop-logo.png",
  });
  return (
    <Image
      src={imageSizes.desktopImage!}
      alt="desktop-logo"
      width={130}
      height={0}
      className="object-cover"
    />
  );
};

export { MobileLogo, DesktopLogo };
