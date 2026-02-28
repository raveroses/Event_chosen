import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Event, Search } from "../_types/types";
import { toast } from "react-toastify";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export function useEventData() {
  // const [eventData, setEventData] = useState<Event[]>([]);
  const [searchFocus, setSearchFocus] = useState<Search>({
    searchValue: "",
    locationSearch: "",
    searchHistory: [],
    isSearchEventFocus: false,
    isSearchLocationFocus: false,
  });
  const [eventLocation, setEventLocation] = useState<string>("");
  const [eventFilter, setEventFilter] = useState<Event[]>([]);
  // const [eventInputSearch, setEventInputSearch] = useState<Event[]>([]);
  const [eventDays, setEventDays] = useState<string>("");
  const [allEvents, setAllEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchingEvent = async () => {
      try {
        const { data, error } = await supabase
          .from("eventchosen_duplicate")
          .select("*");

        const { data: eventDefault, error: eventDefaultError } = await supabase
          .from("eventchosen")
          .select("*");

        console.log(eventDefaultError);
        if (error) {
          console.error("Supabase fetch error:", error.message);
          toast.error(error.message);
          return;
        }

        if (eventDefault && data) {
          setAllEvents([...data, ...eventDefault]);
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          toast.error(e.message);
        }
      }
    };
    fetchingEvent();
  }, []);

  const handleEventFilter = (eventDay: string) => {
    const eventDayLowercase = eventDay.toLowerCase();
    const date = new Date();
    const currentDate = date.getDate();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    if (eventDayLowercase === "all") {
      setEventFilter([...allEvents]);
    } else if (eventDayLowercase === "today") {
      const searchingCurrentDate = allEvents.filter((event) => {
        const eventDate = new Date(event.eventDate);
        const isConvertibleDate = eventDate.getDate();
        const isConvertibleMonth = eventDate.getMonth();
        const isConvertibleYear = eventDate.getFullYear();
        console.log("DAY", new Date(eventDate).getDay());

        return (
          isConvertibleDate === currentDate &&
          isConvertibleMonth === currentMonth &&
          isConvertibleYear === currentYear
        );
      });

      return searchingCurrentDate
        ? setEventFilter(searchingCurrentDate)
        : setEventFilter([]);
    } else if (eventDayLowercase === "this weekend") {
      const weekDays: string[] = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const searchingWeekend = allEvents.filter((event) => {
        console.log("EVENT", event);

        const eventDay = new Date(event.eventDate).getDay();
        const eventWeekendDay = weekDays[eventDay].toLowerCase();

        return eventWeekendDay === "saturday" || eventWeekendDay === "sunday";
      });

      return searchingWeekend
        ? setEventFilter(searchingWeekend)
        : setEventFilter([]);
    }
    setEventDays(eventDay);
  };

  const handleSeachFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSearchFocus((prev) => ({ ...prev, [name]: value }));

    const userSearch = value.toLowerCase().trim();

    if (!userSearch) {
      setEventFilter([]);
      return;
    }

    const splitUserWord = userSearch.split(" ");

    const userSearchResult = allEvents.filter((eachEvent) => {
      const eventTitle = eachEvent.eventTitle.toLowerCase().trim();

      return splitUserWord.some((eachWord) => eventTitle.includes(eachWord));
    });

    setEventFilter(userSearchResult);
  };

  const handleSearchValidation = () => {
    if (!searchFocus.searchValue.trim() && !searchFocus.locationSearch.trim()) {
      toast.error("Please, invalid input");
      return;
    }

    setSearchFocus((prev) => {
      const updatedHistory = Array.from(
        new Set([...prev.searchHistory, prev.searchValue.trim()]),
      );
      console.log("Updated", updatedHistory);
      return {
        ...prev,
        searchHistory: updatedHistory,
        searchValue: "",
      };
    });
  };

  const handleSearchEventEnter = (
    event?: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (!event || event.key === "Enter") {
      handleSearchValidation();
      const searchfiltering = allEvents.filter((event) => {
        return (
          event.eventTitle.trim().toLowerCase() ===
          searchFocus.searchValue.trim().toLowerCase()
        );
      });
      setEventFilter(searchfiltering);
      setEventLocation("");
      // setEventInputSearch(searchfiltering);
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
      eventLocation.toLowerCase().trim() === "Use my current location"
    ) {
      setEventFilter([]);
    } else {
      const filtered = allEvents.filter((event) => {
        return (
          event.eventLocationsCreate.trim().toLowerCase() ===
          eventLocation.trim().toLowerCase()
        );
      });
      // if (eventInputSearch.length > 0) {
      //   setEventInputSearch([]);
      // }
      setEventFilter(filtered);
    }
  }, [eventLocation, allEvents]);
  // }, [eventLocation, allEvents, eventInputSearch]);

  return {
    // eventData,
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
    // eventInputSearch,
    handleEventFilter,
    eventDays,
    allEvents,
  };
}
