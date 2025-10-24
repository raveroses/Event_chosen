"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AuthenticatedDetail } from "../_types/types";
import supabase from "../_supabase/ceateclient";
import { UserProfile } from "../_types/types";
import { userChoice } from "../_types/types";
import { AuthError } from "@supabase/supabase-js";
import { error } from "console";
const localHostUrl = process.env.NEXT_PUBLIC__URL;
// const typeUser = process.env.NEXT_PUBLIC_CHOICEfUL;

export function useAuth() {
  const [userChoiceList] = useState<userChoice[]>([
    {
      url: "/images/guy.png",
      heading: "attendee",
      paragraph: " Tell us what you love",
    },
    {
      url: "/images/girl.png",
      heading: "organizer",
      paragraph: "Plan your best event ever",
    },
  ]);

  const [loading, setLoading] = useState<boolean>(false);
  // const [isUserLoggedInBefore, setIsUserLoggedInBefore] =
  //   useState<boolean>(false);

  const router = useRouter();

  const [insertPayload, setInsertPayLoad] = useState<UserProfile>({
    email: "",
    roles: "",
  });

  const [authenticationDetail, setAuthenticationDetail] =
    useState<AuthenticatedDetail>({
      signUpEmail: "",
      firstName: "",
      lastName: "",
      password: "",
    });
  const isEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{3,}$/;

  const handleSignUpOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthenticationDetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUpFormContinuation = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    if (
      !isEmail.test(authenticationDetail.signUpEmail.trim()) ||
      !authenticationDetail.signUpEmail
    ) {
      toast.error("Re-check all fields");
      setLoading(false);
      return;
    }

    await new Promise((r) => setTimeout(r, 1000));
    router.push("/user-detail");
    setLoading(false);
  };

  const signUpNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    try {
      if (
        !authenticationDetail.firstName.trim() ||
        !authenticationDetail.lastName.trim() ||
        !authenticationDetail.password.trim() ||
        !isEmail.test(authenticationDetail.signUpEmail.trim())
      ) {
        toast.error("Re-check all fields");
        return;
      }
      const { data } = await supabase.auth.signUp({
        email: authenticationDetail.signUpEmail.trim(),
        password: authenticationDetail.password.trim(),
        options: {
          data: {
            displayName:
              authenticationDetail.firstName.trim() +
              " " +
              authenticationDetail.lastName.trim(),
          },
        },
      });
      if (data.session) {
        router.push("/login");
      } else {
        router.push("/sign-up");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }

    setAuthenticationDetail({
      signUpEmail: "",
      firstName: "",
      lastName: "",
      password: "",
    });
  };

  const signInWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    try {
      if (
        !authenticationDetail.password.trim() ||
        !isEmail.test(authenticationDetail.signUpEmail.trim())
      ) {
        toast.error("Re-check all fields");
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: authenticationDetail.signUpEmail.trim(),
        password: authenticationDetail.password,
      });

      if (!data.session) {
        toast.error(error?.message);
        router.push("/login");
        return;
      }

      const { data: userTableFetching, error: userTableFetchingError } =
        await supabase.from("users").select("*");

      const {
        data: { session },
        error: userSessionError,
      } = await supabase.auth.getSession();

      if (userSessionError || !session?.user) {
        console.log("No active session:", userSessionError);
        return;
      }

      console.log("Session UID:", session.user.id);

      const isExistedUser = userTableFetching?.find((userDetail) => {
        return (
          userDetail.id === session.user.id &&
          userDetail.email === session.user.email
        );
      });

      if (!isExistedUser) {
        router.push("/profile-user-setting");
      } else {
        router.push("/");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUserChoice = async (rolesChoice: string) => {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session?.user) {
        console.log("No active session:", error);
        return;
      }

      console.log("Session UID:", session.user.id);

      const payload: UserProfile = {
        email: session.user.email ?? "",
        roles: rolesChoice.trim(),
      };

      setInsertPayLoad(payload);

      console.log("PAYLOAD:", payload);

      const { data: user, error: insertError } = await supabase
        .from("users")
        .insert(payload)
        .select();

      if (insertError) {
        console.error("Insert error:", insertError);
        return;
      }
      console.log("Inserted user:", user);
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFacebook = async () => {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    try {
      await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOneTime = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: authenticationDetail.signUpEmail,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (data.session) {
        toast.success("Please, check your mail");
      } else {
        if (error instanceof AuthError) {
          toast.error(error.message);
        }
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }

    setAuthenticationDetail({
      signUpEmail: "",
      firstName: "",
      lastName: "",
      password: "",
    });
  };

  const handeResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    await supabase.auth.resetPasswordForEmail(
      authenticationDetail.signUpEmail,
      {
        redirectTo: `${localHostUrl}password-reset  `,
      }
    );
    setAuthenticationDetail({
      signUpEmail: "",
      firstName: "",
      lastName: "",
      password: "",
    });
  };

  const handlePasswordChangerInput = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    try {
      if (!authenticationDetail.password.trim()) {
        toast.error("Re-check all fields");

        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: authenticationDetail.password.trim(),
      });

      if (error) throw error;

      toast.success("Password updated successfully");
      router.push("/login");
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Unexpected Error");
      }
    } finally {
      setLoading(false);
    }

    setAuthenticationDetail({
      signUpEmail: "",
      firstName: "",
      lastName: "",
      password: "",
    });
  };

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;

    const handleRouteProtection = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/sign-up");
        return;
      }

      const { data: sub } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (!session) {
            router.push("/sign-up");
          }
        }
      );

      subscription = sub.subscription;
    };

    handleRouteProtection();

    return () => {
      subscription?.unsubscribe();
    };
  }, [router]);

  const [isBecomingOrganizer, setIsBecomingOrganizer] = useState<boolean>(
    () => {
      if (typeof window === "undefined") return false;

      try {
        const stored = localStorage.getItem("isBecomingOrganizerBoolean");
        return stored === "true";
      } catch (error) {
        console.error("Failed to read from localStorage:", error);
        return false;
      }
    }
  );
  const handleBecomeOrganizerOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsBecomingOrganizer(e.target.checked);
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        const user = session.session?.user;
        if (!user) return;

        const { data: userData, error } = await supabase
          .from("users")
          .select("roles")
          .eq("id", user.id)
          .single();
        console.log("userData", userData);
        if (error) {
          console.error("Error fetching user role:", error);
          return;
        }
        const isUserRole = userData?.roles === "organizer";
        console.log("isUSEROLE", isUserRole);
        if (isUserRole) {
          setIsBecomingOrganizer(isUserRole);
          localStorage.setItem(
            "isBecomingOrganizerBoolean",
            String(isUserRole)
          );
        } else {
          setIsBecomingOrganizer(false);
        }
        // if (isBecomingOrganizer !== isUserRole) {
        //   setIsBecomingOrganizer(isUserRole);
        //   localStorage.setItem(
        //     "isBecomingOrganizerBoolean",
        //     String(isUserRole)
        //   );
        // }
      } catch (e) {
        console.log(e);
      }
    };

    fetchUserRole();
  }, []);

  console.log("isbecoming organizer", isBecomingOrganizer);

  useEffect(() => {
    const updateUserRole = async () => {
      const { data: session } = await supabase.auth.getSession();
      const user = session.session?.user;
      if (!user) return;

      const newRole = isBecomingOrganizer ? "organizer" : "attendee";

      const { error } = await supabase
        .from("users")
        .update({ roles: newRole })
        .eq("id", user.id);

      if (error) {
        console.error("Error updating user role:", error);
      } else {
        console.log(`User role updated to ${newRole}`);
      }
    };

    updateUserRole();
  }, [isBecomingOrganizer]);
  return {
    authenticationDetail,
    handleSignUpOnchange,
    handleSignUpFormContinuation,
    signUpNewUser,
    signInWithEmail,
    handleGoogleSignIn,
    handleFacebook,
    handleOneTime,
    handeResetPassword,
    handlePasswordChangerInput,
    userChoiceList,
    handleUserChoice,
    loading,
    // displayBecomeAuser,
    isBecomingOrganizer,
    handleBecomeOrganizerOnchange,
  };
}
