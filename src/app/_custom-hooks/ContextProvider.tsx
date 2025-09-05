"use client";
import { ChangeEvent, KeyboardEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);
import { Event, Search } from "../_types/types";
import createcontext from "./CreateContext";
import { EventDetail } from "../_types/types";
import { toast } from "react-toastify";
const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [searchFocus, setSearchFocus] = useState<Search>({
    searchValue: "",
    locationSearch: "",
    isFocus: false,
    searchHistory: [],
    isEventFocus: false,
  });
  const [eventLocation, setEventLocation] = useState<string>("");

  const [eventFilter, setEventFilter] = useState<Event[]>([]);
  const [eventInputSearch, setEventInputSearch] = useState<Event[]>([]);
  // const [isClick,setIsClick]= useState<boolean>(false)
  const fetchingEvent = async () => {
    try {
      const { data, error } = await supabase.from("evemtchoosen").select();
      console.log("Data=>", data, "Error", error);
      if (data !== null) {
        setEventData(data);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  useEffect(() => {
    fetchingEvent();
  }, []);
  const [eventDays, setEventDays] = useState<string>("");
  const handleAllClick = (eventDay: string) => {
    if (eventDay === "All") {
      setEventFilter(eventData);
    } else {
      setEventFilter([]);
    }

    setEventDays(eventDay);
  };
  //   console.log(eventData);

  //   Navbar

  const handleSeachFocus = (e: ChangeEvent<HTMLInputElement>) => {
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

      const add = {
        ...prev,
        searchHistory: updatedHistory,
        searchValue: "",
      };
      return add;
    });
  };

  const handleSearchEventEnter = (event?: KeyboardEvent<HTMLInputElement>) => {
    if (!event || event.key === "Enter") {
      handleSearchValidation();
      const searchfiltering = eventData.filter((event) => {
        return event.eventTitle.trim() === searchFocus.searchValue.trim();
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
  const handleFocus = () => {
    setSearchFocus((prev) => ({ ...prev, isEventFocus: true }));
  };
  const handleBlur = () => {
    setTimeout(() => {
      setSearchFocus((prev) => ({
        ...prev,
        isEventFocus: false,
      }));
    }, 1000);
  };

  const handleEventBlur = () => {
    setTimeout(() => {
      setSearchFocus((prev) => ({ ...prev, isFocus: false }));
    }, 1000);
  };

  const handleEventFocus = () => {
    setSearchFocus((prev) => ({ ...prev, isFocus: true }));
  };

  // LOCATION FILTERING
  const [locationCreationChoosen, setLocationCreationChoosen] =
    useState<string>("Venue");
  useEffect(() => {
    if (
      eventLocation.trim() === "" ||
      eventLocation.trim() === "Use my current location"
    ) {
      setEventFilter(eventData);
    } else {
      const filtered = eventData.filter((event) => {
        return (
          event.venue.trim().toLowerCase() ===
          eventLocation.trim().toLowerCase()
        );
      });
      if (eventInputSearch.length > 0) {
        setEventInputSearch([]);
      }
      setEventFilter(filtered);
    }
  }, [eventLocation, eventData, searchFocus.searchValue, eventInputSearch]);

  const [eventDetailCreation, setEventDetailCreation] = useState<EventDetail>({
    eventTitle: "",
    eventSummary: "",
    eventStatus: "",
    eventLocationsCreate: locationCreationChoosen.trim(),
    eventOverview: "",
  });

  const handleEventCreationOnchange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEventDetailCreation((prev) => ({ ...prev, [name]: value.trim() }));
  };

  // const handleEventCreationValidation = () => {
  //   if (!eventDetailCreation.eventTitle || !eventDetailCreation.eventSummary) {
  //     toast.error("Please, Check all fields");
  //     return;
  //   }

  // };

  const handleEventLocationChoosen = (locationName: string) => {
    setLocationCreationChoosen(locationName);
  };

  return (
    <createcontext.Provider
      value={{
        eventData,
        eventLocation,
        handleEventLocation,
        handleClear,
        handleSearchEventEnter,
        handleSeachFocus,
        searchFocus,
        handleBlur,
        handleFocus,
        handleEventBlur,
        handleEventFocus,
        eventFilter,
        eventInputSearch,
        handleAllClick,
        eventDays,
        eventDetailCreation,
        handleEventCreationOnchange,
        handleEventLocationChoosen,
        locationCreationChoosen,
      }}
    >
      {children}
    </createcontext.Provider>
  );
};

export default ContextProvider;
