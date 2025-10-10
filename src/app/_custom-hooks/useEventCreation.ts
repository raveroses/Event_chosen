import { useState, useRef } from "react";
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

  const [date, setDate] = useState<Date | string>("");
  const [open, setOpen] = useState(false);
  const [locationCreationChoosen, setLocationCreationChoosen] =
    useState<string>("Venue");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectImageFile, setSelectImageFile] = useState<File | null>(null);

  const dateOnSelect = (date: Date) => {
    setDate(date);
    setOpen(false);
    setEventDetailCreation((prev) => {
      const convertDate = new Date(date);
      const supabaseDate = `${convertDate.getFullYear()}-${String(
        convertDate.getMonth() + 1
      ).padStart(2, "0")}-${String(convertDate.getDate()).padStart(2, "0")}`;
      return { ...prev, eventDate: supabaseDate };
    });
  };

  const handleEventCreationOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventDetailCreation((prev) => ({ ...prev, [name]: value }));
  };

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
    console.log("I'm clicked");
    if (!handleEventCreationValidation()) return;
    if (!selectImageFile) {
      toast.error("No file selected");
      return;
    }
    const filePath = `imagefolders/${Date.now()}_${selectImageFile.name}`;

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
    // setEventDetailCreation({
    //   eventTitle: "",
    //   eventSummary: "",
    //   eventStatus: "",
    //   eventLocationsCreate: "",
    //   eventOverview: "",
    //   eventDate: "",
    //   eventStartTime: "",
    //   eventCategory: "",
    //   eventImage: "",
    // });
  };
  console.log(eventDetailCreation);
  const handleImageTrigger = () => {
    imageRef.current?.click();
  };

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
  };
}
