import { ChangeEvent, FormEvent, KeyboardEvent, ReactNode } from "react";

export type Event = {
  eventCategory: string;
  eventStatus: string;
  eventDate: string;
  eventOverview: string;
  eventLocationsCreate: string;
  eventSummary: string;
  eventTitle: string;
  eventImage: string;
  eventStartTime: string;
  user_id?: string;
};


export type Context = {
  handleSeachFocus: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearchEventEnter: (event?: KeyboardEvent<HTMLInputElement>) => void;
  handleClear: () => void;
  handleSearchEventBlur: () => void;
  handleSearchEventFocus: () => void;
  handleSearchLocationFocus: () => void;
  handleSearchLocationBlur: () => void;
  handleEventLocation: (location: string) => void;
  eventLocation: string;
  searchFocus: Search;
  // eventData: Event[];
  eventFilter: Event[];
  eventInputSearch: Event[];
  handleEventFilter: (eventDay: string) => void;
  eventDays: string;
  handleEventCreationOnchange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  eventDetailCreation: Event;
  handleEventLocationChoosen: (locationName: string) => void;
  locationCreationChoosen: string;
  handleEventDetailCreationSubmission: () => void;
  date: Date | string;
  // timesetter: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dateOnSelect: (date: Date) => void;
  // timepicker: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (value: string) => void;
  handleImageOnchange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleImageTrigger: () => void;
  imageRef: React.RefObject<HTMLInputElement | null>;
  previewImage: string | null;
  handleMenuDisplay: () => void;
  menuDisplay: boolean;
  handleEventCreationPlus: () => void;
  eventCreation: boolean;
  handleGoogleSignIn: () => Promise<void>;
  handleFacebook: () => Promise<void>;
  handleSignUpOnchange: (e: ChangeEvent<HTMLInputElement>) => void;
  authenticationDetail: AuthenticatedDetail;
  handleSignUpFormContinuation: (
    e: FormEvent<HTMLFormElement>,
  ) => Promise<void>;
  signUpNewUser: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  signInWithEmail: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleOneTime: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handeResetPassword: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handlePasswordChangerInput: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  userChoiceList: userChoice[];
  handleUserChoice: (id: string) => Promise<void>;
  loading: boolean;
  allEvents: Event[];
  // displayBecomeAuser: boolean;
  handleBecomeOrganizerOnchange: (e: ChangeEvent<HTMLInputElement>) => void;
  isBecomingOrganizer: boolean;
  eachUserEventCreationList: Event[];
  handleSeachOnchange: (e: ChangeEvent<HTMLInputElement>) => void;
  allListUserEventValue: string;
  handleUserEventListSearch: () => Promise<void>;
  filteringEvent: Event[];
  dateSetter: Date | undefined;
  setDateSetter: React.Dispatch<React.SetStateAction<Date | undefined>>;
  handleUserEventList: () => Promise<void>;
  welcomeEmail: WelcomeEmail;
  handleSignUpNewUserOnchange: (e: ChangeEvent<HTMLInputElement>) => void;
  loginDetail: LoginDetail;
  handleLoginOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type InputCard = {
  [key: string]: ReactNode | string;
};

export type Search = {
  searchValue: string;
  searchHistory: string[];
  locationSearch: string;
  isSearchEventFocus: boolean;
  isSearchLocationFocus: boolean;
};

export type AuthenticatedDetail = {
  signUpEmail: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type userChoice = {
  url: string;
  heading: string;
  paragraph: string;
};

export type UserProfile = {
  roles: string;
  email: string;
};

export type WelcomeEmail = {
  email: string;
};

export type LoginDetail = {
  email: string;
  password: string;
};
// export type EventDetail = {
//   eventTitle: string;
//   eventSummary: string;
//   eventStatus: string;
//   eventLocationsCreate: string;
//   eventOverview: string;
// };

// useEffect(() => {
//   const becomingOrganizerChecker = async () => {
//     try {
//       const {
//         data: { session },
//         error: userSessionError,
//       } = await supabase.auth.getSession();

//       const { data: userTableFetching, error: userTableFetchingError } =
//         await supabase
//           .from("users")
//           .select("roles")
//           .eq("id", session?.user.id)
//           .single();

//       if (userTableFetchingError) {
//         console.log("Error fetching user:", userTableFetchingError);
//       }
//       if (userSessionError || !session?.user) {
//         console.log("No active session:", userSessionError);
//         return;
//       }

//       if (userTableFetching?.roles === "attendee" && session.user.email) {
//         setDisplayBecomeAuser(true);
//       }
//     } catch (e: unknown) {
//       if (e instanceof Error) {
//         console.log(e.message);
//       }
//     }
//   };

//   becomingOrganizerChecker();
// }, [displayBecomeAuser]);
