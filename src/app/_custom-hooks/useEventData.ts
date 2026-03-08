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
  const [eventDays, setEventDays] = useState<string>("all");

  const [allEvents, setAllEvents] = useState<Event[]>([]);
  useEffect(() => {
    const fetchingEvent = async () => {
      try {
        const [duplicateRes, defaultRes] = await Promise.all([
          supabase.from("eventchosen_duplicate").select("*"),
          supabase.from("eventchosen").select("*"),
        ]);

        const { data, error } = duplicateRes;
        const { data: eventDefault, error: eventDefaultError } = defaultRes;

        console.log("Fetched data from eventchosen_duplicate:", data);
        console.log("Fetched data from eventchosen:", eventDefault);

        if (error || eventDefaultError) {
          const message = error?.message || eventDefaultError?.message;
          console.error("Supabase fetch error:", message);
          toast.error(message);
          return;
        }

        setAllEvents([...(data || []), ...(eventDefault || [])]);
     
        console.log("allEvents set to:", [
          ...(data || []),
          ...(eventDefault || []),
        ]);
      } catch (e: unknown) {
        if (e instanceof Error) {
          toast.error(e.message);
        }
      }
    };

    fetchingEvent();
  }, []);


  useEffect(() => {
    if(allEvents.length > 0) {
        setEventFilter([...allEvents]);
    }
}, [allEvents]);
  console.log("FIlter", eventFilter);
  const handleEventFilter = (eachEventDay: string) => {
    const eventDayLowercase = eachEventDay.toLowerCase();
    setEventDays(eventDayLowercase);

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

        return (
          isConvertibleDate === currentDate &&
          isConvertibleMonth === currentMonth &&
          isConvertibleYear === currentYear
        );
      });

      // return searchingCurrentDate
      //   ? setEventFilter(searchingCurrentDate)
      //   : setEventFilter([]);

      if (searchingCurrentDate.length === 0) {
        setEventFilter([]);
      } else {
        setEventFilter(searchingCurrentDate);
      }
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

  // useEffect(() => {
  //   if (
  //     !eventLocation.trim() ||
  //     eventLocation.toLowerCase().trim() === "Use my current location"
  //   ) {
  //     setEventFilter([]);
  //   } else {
  //     const filtered = allEvents.filter((event) => {
  //       return (
  //         event.eventLocationsCreate.trim().toLowerCase() ===
  //         eventLocation.trim().toLowerCase()
  //       );
  //     });
  //     // if (eventInputSearch.length > 0) {
  //     //   setEventInputSearch([]);
  //     // }
  //     setEventFilter(filtered);
  //   }
  // }, [eventLocation, allEvents]);
  // }, [eventLocation, allEvents, eventInputSearch]);
useEffect(() => {
    if (!eventLocation.trim() ||
        eventLocation.toLowerCase().trim() === "Use my current location"
    ) {
      // ✅ Only reset if no day filter is active
      if(eventDays === "all") {
          setEventFilter([...allEvents]);
      }
      // if a day filter is active, do nothing — leave it alone
    } else {
      const filtered = allEvents.filter((event) => {
        return (
          event.eventLocationsCreate.trim().toLowerCase() ===
          eventLocation.trim().toLowerCase()
        );
      });
      setEventFilter(filtered);
    }
}, [eventLocation, allEvents]);

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
