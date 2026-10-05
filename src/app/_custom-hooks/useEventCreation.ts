import { useState, useRef, useEffect, ChangeEvent } from "react";
import createClient from "@/lib/supabase/client";
import { Event } from "../_types/types";
import { toast } from "react-toastify";
import { Saved } from "../_types/types";

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
  const [focusPoint, setFocusPoint] = useState<{ x: number; y: number }>(() => {
    if (typeof window === "undefined") return [];

    const getFocusPoint = localStorage.getItem("focus");
    if (!getFocusPoint)
      return {
        x: 50,
        y: 50,
      };
    try {
      return JSON.parse(getFocusPoint);
    } catch {
      return {
        x: 50,
        y: 50,
      };
    }
  });

  const [selectImageFile, setSelectImageFile] = useState<Saved>({
    image: null,
    X: focusPoint.x,
    Y: focusPoint.y,
  });

  const openDb = (): Promise<IDBDatabase> => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open("eventImage", 1);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains("pictures")) {
          db.createObjectStore("pictures", {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      };

      request.onsuccess = () => resolve(request.result);

      request.onerror = () => reject(request.error);
    });
  };

  const handleImageSetter = async (imageRecord: Saved) => {
    const db = await openDb();
    try {
      const tx = db.transaction("pictures", "readwrite");
      const store = tx.objectStore("pictures");
      const imageArrayStore: Saved[] = [];
      imageArrayStore.push(imageRecord);
      imageArrayStore.forEach((image) => store.put(image));

      await new Promise((res, rej) => {
        tx.oncomplete = () => res(null);
        tx.onerror = () => rej(tx.error);
        tx.onabort = () => rej(tx.error);
      });
    } finally {
      db.close();
    }
  };

  const [eachUserEventCreationList, setEachUserEventCreationList] = useState<
    Event[]
  >([]);

  const supabase = createClient();
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

  // console.log(eventDetailCreation);
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
      !selectImageFile?.image?.name ||
      !eventDetailCreation.eventOverview.trim() ||
      !eventDetailCreation.eventStartTime.trim() ||
      !eventDetailCreation.eventLocationsCreate.trim() ||
      !eventDetailCreation.eventDate ||
      !eventDetailCreation.eventStatus.trim()
    ) {
      setPreviewImage("");
      toast.error("Re-check all fields");
      return false;
    }

    const eventOverViewLimit = eventDetailCreation.eventOverview.split(" ");

    if (eventOverViewLimit.length > 20) {
      toast.error("The length should not be more than 20");
      console.log("The length should not be more than 20");
      return false;
    }

    const currentYear = new Date().getFullYear();
    const eventCreationYear = new Date(
      eventDetailCreation.eventDate,
    ).getFullYear();

    console.log("eventCreationYear", eventCreationYear);
    if (eventCreationYear < currentYear) {
      toast.error("Please,enter valid Year");
      return false;
    }
    return true;
  };

  const handleCategoryChange = (value: string) => {
    setEventDetailCreation((prev) => ({ ...prev, eventCategory: value }));
  };

  const [isPopUp, setIsPopUp] = useState<boolean>(false);

  const handleImageOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setIsPopUp(true);
    const saveFirstForPop = file;
    setSelectImageFile((prev) => ({ ...prev, image: saveFirstForPop }));
  };
  console.log("Image", selectImageFile.image);

  const focusRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<HTMLImageElement | null>(null);

  const handleMouseDown = () => {
    let x: number;
    let y: number;
    const handleMove = (e: MouseEvent) => {
      const rect = imageRefs.current!.getBoundingClientRect();
      x = ((e.clientX - rect.left) / rect.width) * 100;
      y = ((e.clientY - rect.top) / rect.height) * 100;
      setFocusPoint({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      });
    };

    const handleUp = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", () => {
      setSelectImageFile((prev) => ({ ...prev, X: x, Y: y }));
      handleUp();
    });
  };
  const [imageSetter, setImageStter] = useState<(Saved & { id: number })[]>([]);

  const handleSaveImage = async () => {
    if (!selectImageFile) return;
    await handleImageSetter({
      image: selectImageFile.image,
      X: focusPoint.x,
      Y: focusPoint.y,
    });
    const savedImages = await getAllImageRecords();
    setImageStter(savedImages);
    setIsPopUp(false);
  };

  const handleCancel = () => {
    setIsPopUp(false);
    setSelectImageFile({
      image: null,
      X: null,
      Y: null,
    });
  };

  const getAllImageRecords = async (): Promise<(Saved & { id: number })[]> => {
    const db = await openDb();
    const req = db.transaction("pictures").objectStore("pictures").getAll();
    const result = await new Promise<any[]>((res, rej) => {
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    });
    db.close();
    return result;
  };
  const handleEventDetailCreationSubmission = async () => {
    if (!handleEventCreationValidation()) return;

    if (!selectImageFile.image) {
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
        console.log("Session error:", userSessionError);
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("roles")
        .eq("id", session?.user.id)
        .single();

      if (userError) {
        toast.error("Failed to verify user permissions");
        console.log("User fetch error:", userError);
        return;
      }

      if (!userData || userData?.roles === "attendee") {
        toast.error("You don't have permission to create events");
        console.log("User is an attendee, cannot create events");
        return;
      } else {
        const filePath = `eventcreationImageFolder/${Date.now()}_${selectImageFile.image.name}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          // .from("eventimages")
          .from("eventImage")
          .upload(filePath, selectImageFile.image, { upsert: true });

        console.log("DATA1", uploadData);
        if (!uploadData || uploadError) {
          console.log("ImageUploadError=>", uploadError);
          return;
        }
        const { data: urlData } = supabase.storage
          .from("eventImage")
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

      toast.success("Event successfully created");
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
      console.log("Unexpected error during event creation:", error);
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
        console.log("Error fetching users:", error);
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
      console.log("Unexpected error:", err);
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
        // console.log("Eventto", eachUserEventCreationList);
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
        // console.log("CHECK=>", check);
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
    allListUserEventValue,
    isPopUp,
    focusPoint,
    imageRefs,
    focusRef,
    handleMouseDown,
    selectImageFile,
    handleCancel,
    handleSaveImage,
    getAllImageRecords,
    imageSetter
  };
}
