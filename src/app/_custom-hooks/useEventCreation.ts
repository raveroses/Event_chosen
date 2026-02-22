import { useState, useRef, useEffect, ChangeEvent } from "react";
import supabase from "../_supabase/ceateclient";
import { Event } from "../_types/types";
import { toast } from "react-toastify";
export function useEventCreation() {
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
    // user_id: "",
  });
  const [dateSetter, setDateSetter] = useState<Date | undefined>(new Date());
  const [date, setDate] = useState<Date | string>("");
  const [open, setOpen] = useState(false);
  const [locationCreationChoosen, setLocationCreationChoosen] =
    useState<string>("Venue");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectImageFile, setSelectImageFile] = useState<File | null>(null);
  const [eachUserEventCreationList, setEachUserEventCreationList] = useState<
    Event[]
  >([]);
  const dateOnSelect = (date: Date) => {
    setDate(date);
    setOpen(false);
    setEventDetailCreation((prev) => {
      const convertDate = new Date(date);
      const supabaseDate = `${convertDate.getFullYear()}-${String(
        convertDate.getMonth() + 1,
      ).padStart(2, "0")}-${String(convertDate.getDate()).padStart(2, "0")}`;
      return { ...prev, eventDate: supabaseDate };
    });
  };

  const handleEventCreationOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEventDetailCreation((prev) => ({ ...prev, [name]: value }));
  };

  console.log(eventDetailCreation);
  const handleEventLocationChoosen = (locationName: string) => {
    setLocationCreationChoosen(locationName);
    setEventDetailCreation((prev) => ({
      ...prev,
      eventLocationsCreate: locationName,
    }));
  };

  const handleEventCreationValidation = (): boolean => {
    if (
      !eventDetailCreation.eventTitle.trim() ||
      !eventDetailCreation.eventSummary.trim() ||
      !eventDetailCreation.eventCategory.trim() ||
      !selectImageFile?.name ||
      !eventDetailCreation.eventOverview ||
      !eventDetailCreation.eventStartTime.trim() ||
      !eventDetailCreation.eventLocationsCreate.trim() ||
      !eventDetailCreation.eventDate ||
      !eventDetailCreation.eventStatus.trim()
    ) {
      setPreviewImage("");
      toast.error("Re-check all fields");
      return false;
    }
    return true;
  };

  const handleCategoryChange = (value: string) => {
    setEventDetailCreation((prev) => ({ ...prev, eventCategory: value }));
  };

  const handleImageOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setSelectImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
  };

  const handleEventDetailCreationSubmission = async () => {
    if (!handleEventCreationValidation()) return;

    if (!selectImageFile) {
      toast.error("No file selected");
      return;
    }

    try {
      const {
        data: { session },
        error: userSessionError,
      } = await supabase.auth.getSession();

      if (userSessionError || !session?.user?.id) {
        toast.error("Authentication error. Please log in again.");
        console.error("Session error:", userSessionError);
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("roles")
        .eq("id", session?.user.id)
        .single();

      if (userError) {
        toast.error("Failed to verify user permissions");
        console.error("User fetch error:", userError);
        return;
      }

      if (!userData || userData?.roles === "attendee") {
        toast.error("You don't have permission to create events");
        console.log("User is an attendee, cannot create events");
        return;
      } else {
        const filePath = `eventcreationImageFolder/${Date.now()}_${selectImageFile.name}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("eventimages")
          .upload(filePath, selectImageFile, { upsert: true });

        console.log("DATA1", uploadData);
        if (!uploadData || uploadError) {
          console.log("ImageUploadError=>", uploadError);
          return;
        }
        const { data: urlData } = supabase.storage
          .from("eventimages")
          .getPublicUrl(uploadData.path);
        const publicUrl = urlData.publicUrl;
        console.log(publicUrl);
        const updatedEvent = { ...eventDetailCreation, eventImage: publicUrl };
        setEventDetailCreation(updatedEvent);

        const { data: insertData, error: insertError } = await supabase
          .from("eventchosen_duplicate")
          .insert(updatedEvent);

        console.log("DATA=>", insertData, "ERROR=>", insertError);
      }

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
    } catch (error: unknown) {
      console.error("Unexpected error during event creation:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleImageTrigger = () => {
    imageRef.current?.click();
  };

  const [filteringEvent, setFilteringEvent] = useState<Event[]>([]);

  const handleUserEventList = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.user) {
        console.log("No user session found");
        return;
      }

      const { data, error } = await supabase
        .from("eventchosen_duplicate")
        .select("*");

      if (error) {
        console.error("Error fetching users:", error);
        return;
      }
      console.log("Fetched data:", data);
      const allListedByIdUser = data?.filter(
        (event) => event.user_id === session?.session?.user.id,
      );
      if (allListedByIdUser) {
        setEachUserEventCreationList(allListedByIdUser);
        if (filteringEvent.length > 0) {
          setFilteringEvent([]);
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  useEffect(() => {
    handleUserEventList();
  }, []);

  const [allListUserEventValue, setAllListUserEventValue] =
    useState<string>("");

  const handleSeachOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    setAllListUserEventValue(e.target.value);
  };

  const [loading, setLoading] = useState<boolean>(false);
  const handleUserEventListSearch = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    try {
      if (!allListUserEventValue.trim()) {
        console.log("Invalid Input");
        return;
      }

      const filtering = eachUserEventCreationList.filter((event) => {
        return (
          event.eventTitle.toLowerCase().trim() ===
          allListUserEventValue.toLowerCase().trim()
        );
      });

      console.log(filtering);
      if (filtering.length > 0) {
        setFilteringEvent(filtering);
      } else {
        console.log("No matching event found");
        setFilteringEvent([]);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleUserDateEventListSearch = async () => {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1000));
      try {
        console.log("Eventto", eachUserEventCreationList);
        // const check = eachUserEventCreationList.filter((event) => {
        //   const dateConversion = new Date(event.eventDate);
        //   const dateConversionDate = dateConversion.getDate();
        //   const monthConversionMonth = dateConversion.getMonth() + 1;
        //   const yearConversionYear = dateConversion.getFullYear();

        //   const datePicker = dateSetter;
        //   const datePickerDate = datePicker?.getDate();
        //   const datePickerMonth = (datePicker?.getMonth() ?? 0) + 1;
        //   const datePickerYear = datePicker?.getFullYear();

        //   return (
        //     dateConversionDate === datePickerDate &&
        //     monthConversionMonth === datePickerMonth &&
        //     datePickerYear === yearConversionYear
        //   );
        const check = eachUserEventCreationList.filter((event) => {
          const eventDate = new Date(event.eventDate).toDateString();
          const settingDate = dateSetter?.toDateString();
          console.log(eventDate);
          console.log(settingDate);
          return eventDate === settingDate;
        });
        setFilteringEvent(check);
        console.log("CHECK=>", check);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      } finally {
        setLoading(false);
      }
    };

    handleUserDateEventListSearch();
  }, [dateSetter]);

  return {
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
    eachUserEventCreationList,
    handleSeachOnchange,
    handleUserEventListSearch,
    filteringEvent,
    loading,
    dateSetter,
    setDateSetter,
    handleUserEventList,
    allListUserEventValue
  };
}
