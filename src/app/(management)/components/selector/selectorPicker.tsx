import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAppContext from "@/app/_custom-hooks/useAppContext";

export default function SelectDemo() {
  const { eventDetailCreation, handleCategoryChange } = useAppContext();
  return (
    <Select
      onValueChange={handleCategoryChange}
      value={eventDetailCreation.eventCategory}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select your Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="paid">Paid</SelectItem>
          <SelectItem value="free">Free</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
