import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Event, Search } from "../_types/types";
import {  toast } from "react-toastify";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export function useEventData() {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [searchFocus, setSearchFocus] = useState<Search>({
    searchValue: "",
    locationSearch: "",
    searchHistory: [],
    isSearchEventFocus: false,
    isSearchLocationFocus: false,
  });
  const [eventLocation, setEventLocation] = useState<string>("");
  const [eventFilter, setEventFilter] = useState<Event[]>([]);
  const [eventInputSearch, setEventInputSearch] = useState<Event[]>([]);
  const [eventDays, setEventDays] = useState<string>("");

  useEffect(() => {
    const fetchingEvent = async () => {
      try {
        const { data, error } = await supabase.from("eventchosen").select("*");
        if (error) {
          console.error("Supabase fetch error:", error.message);
          toast.error(error.message)
          return;
        }
        console.log(data);
        setEventData(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchingEvent();
  }, []);

  const handleAllClick = (eventDay: string) => {
    if (eventDay === "All") {
      setEventFilter(eventData);
    } else {
      setEventFilter([]);
    }
    setEventDays(eventDay);
  };

  const handleSeachFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchFocus((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchValidation = () => {
    if (!searchFocus.searchValue.trim() && !searchFocus.locationSearch.trim()) {
      return;
    }
    setSearchFocus((prev) => {
      const updatedHistory = Array.from(
        new Set([...prev.searchHistory, prev.searchValue.trim()])
      );
      return {
        ...prev,
        searchHistory: updatedHistory,
        searchValue: "",
      };
    });
  };

  const handleSearchEventEnter = (
    event?: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!event || event.key === "Enter") {
      handleSearchValidation();
      const searchfiltering = eventData.filter((event) => {
        return (
          event.eventTitle.trim().toLowerCase() ===
          searchFocus.searchValue.trim().toLowerCase()
        );
      });
      setEventFilter([]);
      setEventLocation("");
      setEventInputSearch(searchfiltering);
    }
  };

  const handleClear = () => {
    setSearchFocus((prev) => ({ ...prev, searchHistory: [], searchValue: "" }));
  };

  const handleEventLocation = (location: string) => {
    setEventLocation(location);
  };

  const handleSearchEventFocus = () => {
    setSearchFocus((prev) => ({ ...prev, isSearchEventFocus: true }));
  };

  const handleSearchEventBlur = () => {
    setTimeout(() => {
      setSearchFocus((prev) => ({ ...prev, isSearchEventFocus: false }));
    }, 1000);
  };

  const handleSearchLocationFocus = () => {
    setSearchFocus((prev) => ({ ...prev, isSearchLocationFocus: true }));
  };

  const handleSearchLocationBlur = () => {
    setTimeout(() => {
      setSearchFocus((prev) => ({ ...prev, isSearchLocationFocus: false }));
    }, 1000);
  };

  useEffect(() => {
    if (
      !eventLocation.trim() ||
      eventLocation.trim() === "Use my current location"
    ) {
      setEventFilter([]);
    } else {
      const filtered = eventData.filter((event) => {
        return (
          event.eventLocationsCreate.trim().toLowerCase() ===
          eventLocation.trim().toLowerCase()
        );
      });
      if (eventInputSearch.length > 0) {
        setEventInputSearch([]);
      }
      setEventFilter(filtered);
    }
  }, [eventLocation, eventData, searchFocus.searchValue, eventInputSearch]);

  return {
    eventData,
    eventLocation,
    handleEventLocation,
    handleClear,
    handleSearchEventEnter,
    handleSeachFocus,
    searchFocus,
    handleSearchEventFocus,
    handleSearchEventBlur,
    handleSearchLocationFocus,
    handleSearchLocationBlur,
    eventFilter,
    eventInputSearch,
    handleAllClick,
    eventDays,
  };
}
