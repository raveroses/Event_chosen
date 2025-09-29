import { useState } from "react";

export function useUIState() {
  const [menuDisplay, setMenuDisplay] = useState<boolean>(false);
  const [eventCreation, setEventCreation] = useState<boolean>(false);

  const handleMenuDisplay = () => {
    setMenuDisplay((prev) => !prev);
  };
  const handleEventCreationPlus = () => {
    setEventCreation((prev) => !prev);
  };

  return {
    menuDisplay,
    handleMenuDisplay,
    eventCreation,
    handleEventCreationPlus,
  };
}
