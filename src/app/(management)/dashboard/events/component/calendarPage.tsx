"use client";
import useAppContext from "@/app/_custom-hooks/useAppContext";
import { Calendar } from "@/components/ui/calendar";
const CalendarPage = () => {
  const { dateSetter, setDateSetter } = useAppContext();

  return (
    <Calendar
      mode="single"
      selected={dateSetter}
      onSelect={setDateSetter}
      className="rounded-lg border w-[600px]"
    />
  );
};

export default CalendarPage;
