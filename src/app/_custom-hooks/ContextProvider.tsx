"use client";
import { ChangeEvent, KeyboardEvent, ReactNode, useRef } from "react";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);
import { Event, Search } from "../_types/types";
import createcontext from "./CreateContext";
// import { toast } from "react-toastify";
const ContextProvider = ({ children }: { children: ReactNode }) => {
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
  // const [isClick,setIsClick]= useState<boolean>(false)
  const fetchingEvent = async () => {
    try {
      const { data, error } = await supabase.from("eventchoosen").select();
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
      setSearchFocus((prev) => ({
        ...prev,
        isSearchEventFocus: false,
      }));
    }, 1000);
  };

  // Location focus

  const handleSearchLocationFocus = () => {
    setSearchFocus((prev) => ({ ...prev, isSearchLocationFocus: true }));
  };

  const handleSearchLocationBlur = () => {
    setTimeout(() => {
      setSearchFocus((prev) => ({ ...prev, isSearchLocationFocus: false }));
    }, 1000);
  };

  // LOCATION FILTERING
  const [locationCreationChoosen, setLocationCreationChoosen] =
    useState<string>("Venue");
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

  const [date, setDate] = useState<Date | string>("");
  const [open, setOpen] = useState(false);

  const [eventDetailCreation, setEventDetailCreation] = useState<Event>({
    eventTitle: "",
    eventSummary: "",
    eventStatus: "",
    eventLocationsCreate: "",
    eventOverview: "",
    eventDate: "",
    eventStartTime: "",
    eventCategory: "",
    eventImage: "",
  });

  const [multipleEventCreation, setMultipleEventCreation] = useState<Event[]>(
    []
  );

  const dateOnSelect = (date: Date) => {
    setDate(date);
    setOpen(false);
    setEventDetailCreation((prev) => {
      const convertDate = new Date(date);
      const supabaseDate = `${convertDate.getFullYear()}-${String(
        convertDate.getMonth() + 1
      ).padStart(2, "0")}-${String(convertDate.getDate()).padStart(2, "0")}`;

      const objSet = { ...prev, eventDate: supabaseDate };
      return objSet;
    });
  };

  const handleEventCreationOnchange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEventDetailCreation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEventLocationChoosen = (locationName: string) => {
    setLocationCreationChoosen(locationName);
    setEventDetailCreation((prev) => ({
      ...prev,
      eventLocationsCreate: locationName,
    }));
  };
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectImageFile, setSelectImageFile] = useState<File | null>(null);

  const handleEventCreationValidation = (): boolean => {
    if (
      !eventDetailCreation.eventTitle.trim() ||
      !eventDetailCreation.eventSummary.trim() ||
      !eventDetailCreation.eventCategory.trim() ||
      // !eventDetailCreation.eventImage.trim() ||
      !selectImageFile?.name ||
      !eventDetailCreation.eventOverview ||
      !eventDetailCreation.eventStartTime.trim() ||
      !eventDetailCreation.eventLocationsCreate.trim() ||
      !eventDetailCreation.eventDate ||
      !eventDetailCreation.eventStatus.trim()
    ) {
      // toast.error("Please, Check all fields");
      setPreviewImage("");
      alert("All fields are not fields");
      return false;
    }

    return true;
  };

  const handleCategoryChange = (value: string) => {
    setEventDetailCreation((prev) => ({
      ...prev,
      eventCategory: value,
    }));
  };

  const handleImageOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setSelectImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
  };

  const uploadFile = async (selectImage: File | null) => {
    if (!selectImage) {
      console.warn("No file selected");
      return;
    }

    const filePath = `imageFolder/${Date.now()}_${selectImage.name}`;
    const { data: data1, error } = await supabase.storage
      .from("eventImage")
      .upload(filePath, selectImage, {
        upsert: true,
      });
    if (error) {
      console.log(error);
      return;
    } else {
      const { data } = supabase.storage
        .from("eventImage")
        .getPublicUrl(data1.path);

      const publicUrl = data.publicUrl;

      setEventDetailCreation((prev) => ({ ...prev, eventImage: publicUrl }));
    }
    setMultipleEventCreation([eventDetailCreation]);
  };

  const handleEventDetailCreationSubmission = async () => {
    if (!handleEventCreationValidation()) return;
    await uploadFile(selectImageFile as File);

    const supabaseEvents = multipleEventCreation.map((event) => event);

    const { data, error } = await supabase
      .from("eventchoosen")
      .insert(supabaseEvents);

    console.log("DATA INSERT", data, "ERROR INSERT", error);

    setEventDetailCreation({
      eventTitle: "",
      eventSummary: "",
      eventStatus: "",
      eventLocationsCreate: "",
      eventOverview: "",
      eventDate: "",
      eventStartTime: "",
      eventCategory: "",
      eventImage: "",
    });
  };

  const handleImageTrigger = () => {
    imageRef.current?.click();
  };

  console.log(eventDetailCreation);
  console.log(selectImageFile);

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
        handleSearchEventFocus,
        handleSearchEventBlur,
        handleSearchLocationFocus,
        handleSearchLocationBlur,
        eventFilter,
        eventInputSearch,
        handleAllClick,
        eventDays,
        eventDetailCreation,
        handleEventCreationOnchange,
        handleEventLocationChoosen,
        locationCreationChoosen,
        handleEventDetailCreationSubmission,
        date,
        open,
        setOpen,
        dateOnSelect,
        handleCategoryChange,
        handleImageOnchange,
        handleImageTrigger,
        imageRef,
        previewImage,
      }}
    >
      {children}
    </createcontext.Provider>
  );
};

export default ContextProvider;
