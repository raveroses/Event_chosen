import { useEffect, useState } from "react";

const useMobile = () => {
  const MOBILE_BREAKPOINT = 768;
  const [isMobile, setIsMobile] = useState<undefined | boolean>(undefined);

  useEffect(() => {
    const isResizing = window.matchMedia(
      `(max-width:${MOBILE_BREAKPOINT - 1}px)`
    );

    const handleOnChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    isResizing.addEventListener("change", handleOnChange);

    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    return () => isResizing.removeEventListener("change", handleOnChange);
  }, []);

  return !!isMobile;
};

export default useMobile;
