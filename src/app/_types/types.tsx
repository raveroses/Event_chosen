import { ChangeEvent, KeyboardEvent, ReactNode } from "react";

export type Event = {
  category: string;
  date: string;
  day: string;
  content: string;
  eventTitle: string;
  startTime: string;
  image: string;
  venue: string;
};
export type Context = {
  handleSeachFocus: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearchEventEnter: (event?: KeyboardEvent<HTMLInputElement>) => void;
  handleClear: () => void;
  handleBlur: () => void;
  handleFocus: () => void;
  handleEventBlur: () => void;
  handleEventFocus: () => void;
  handleEventLocation: (location: string) => void;
  eventLocation: string;
  searchFocus: Search;
  eventData: Event[];
  eventFilter: Event[];
  eventInputSearch: Event[];
};

export type InputCard = {
  [key: string]: ReactNode | string;
};

export type Search = {
  searchValue: string;
  isFocus: boolean;
  searchHistory: string[];
  isEventFocus: boolean;
  locationSearch: string;
};
