"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AuthenticatedDetail } from "../_types/types";
import createClient from "@/lib/supabase/client";
import { UserProfile } from "../_types/types";
import { userChoice } from "../_types/types";
import { WelcomeEmail } from "../_types/types";
import { LoginDetail } from "../_types/types";
import { AuthError } from "@supabase/supabase-js";

const localHostUrl = process.env.NEXT_PUBLIC__URL;

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

  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [insertPayload, setInsertPayLoad] = useState<UserProfile>({
    email: "",
    roles: "",
    id: "",
    onboarding_completed: false,
  });

  const [authenticationDetail, setAuthenticationDetail] =
    useState<AuthenticatedDetail>({
      signUpEmail: "",
      firstName: "",
      lastName: "",
      password: "",
    });
  const isEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{3,}$/;
  const [welcomeEmail, setWelcomeEmail] = useState<WelcomeEmail>({
    email: "",
  });

  const handleSignUpOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setWelcomeEmail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSignUpFormContinuation = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setLoading(true);

    if (
      !isEmail.test(welcomeEmail.email.trim()) ||
      !welcomeEmail.email.trim()
    ) {
      toast.error("Please, check the field");
      setLoading(false);
      return;
    }
    await new Promise((r) => setTimeout(r, 1000));
    setAuthenticationDetail((prev) => ({
      ...prev,
      signUpEmail: welcomeEmail.email,
    }));
    setWelcomeEmail({
      email: "",
    });
    toast.success("Successfully added your email");
    router.push("/user-detail");
    setLoading(false);
  };

  const handleSignUpNewUserOnchange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setAuthenticationDetail((prev) => ({ ...prev, [name]: value }));
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
        !isEmail.test(authenticationDetail.signUpEmail.trim()) ||
        !authenticationDetail.signUpEmail.trim()
      ) {
        toast.error("Re-check all fields");
        return;
      }
      const { data, error } = await supabase.auth.signUp({
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

      if (error) {
        toast.error(error.message);
        return;
      }
      if (data.session) {
        toast.success("Redirecting to login page");
        router.push("/login");
      } else {
        router.replace("/sign-up");
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

  const [loginDetail, setLoginDetail] = useState<LoginDetail>({
    email: "",
    password: "",
  });
  const handleLoginOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginDetail((prev) => ({ ...prev, [name]: value }));
  };
  const signInWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    const emailTrim = loginDetail.email.trim();
    const passwordTrim = loginDetail.password.trim();
    try {
      if (!passwordTrim || !isEmail.test(emailTrim)) {
        toast.error("Please, re-check all fields");
        return;
      }

      const { data: session, error } = await supabase.auth.signInWithPassword({
        email: emailTrim,
        password: passwordTrim,
      });

      if (error) {
        toast.error(error?.message);
        return;
      }

      const { data: userTableFetching } = await supabase
        .from("users")
        .select("*");

      console.log("Session UID:", session.user.id);

      const isExistedUser = userTableFetching?.find((userDetail) => {
        return (
          userDetail.id === session.user.id &&
          userDetail.email === session.user.email
        );
      });

      if (!isExistedUser && session.user) {
        toast.success("Redirctiong to profile category");
        router.push("/profile-user-setting");
        return;
      }

      if (isExistedUser && session.user) {
        toast.success("successfully login");
        router.push("/");
        return;
      }

      if (!isExistedUser && !session.user) {
        toast.error("Please, sign up");
        router.replace("/sign-up");
        return;
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

    setLoginDetail({
      email: "",
      password: "",
    });
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

      const payload: UserProfile = {
        email: session.user.email ?? "",
        id: session.user.id ?? "",
        roles: rolesChoice.trim(),
        onboarding_completed: true,
      };

      setInsertPayLoad(payload);

      console.log("PAYLOAD:", payload);

      // const { data: user, error: insertError } = await supabase
      //   .from("users")
      //   .insert(payload)
      //   .select();
      const { data: user, error: insertError } = await supabase
        .from("users")
        .upsert(payload, { onConflict: "id" })
        .select();
      if (insertError) {
        console.log("Insert error:", insertError);
        return;
      }
      console.log("Inserted user:", user);
      toast.success("successfully login");
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

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/callback`,
        },
      });

      if (error) {
        toast.error(error.message);
        return;
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



  const handeResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    await supabase.auth.resetPasswordForEmail(
      authenticationDetail.signUpEmail,
      {
        redirectTo: `${localHostUrl}password-reset  `,
      },
    );
    setAuthenticationDetail({
      signUpEmail: "",
      firstName: "",
      lastName: "",
      password: "",
    });
  };

  const handlePasswordChangerInput = async (
    e: React.FormEvent<HTMLFormElement>,
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

  const [isBecomingOrganizer, setIsBecomingOrganizer] = useState<boolean>(
    () => {
      if (typeof window === "undefined") return false;

      try {
        const stored =
          localStorage.getItem("isBecomingOrganizerBoolean") || "false";
        return stored === "true";
      } catch (error) {
        console.log("Failed to read from localStorage:", error);
        return false;
      }
    },
  );
  const isUserToggleRef = React.useRef(false);
  const handleBecomeOrganizerOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    isUserToggleRef.current = true;
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
          console.log("Error fetching user role:", error);
          return;
        }
        const isUserRole = userData?.roles === "organizer";
        console.log("isUSEROLE", isUserRole);
        if (isUserRole) {
          setIsBecomingOrganizer(isUserRole);
          localStorage.setItem(
            "isBecomingOrganizerBoolean",
            String(isUserRole),
          );
        } else {
          setIsBecomingOrganizer(false);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchUserRole();
  }, []);

  console.log("isbecoming organizer", isBecomingOrganizer);

  useEffect(() => {
    const updateUserRole = async () => {
      if (!isUserToggleRef.current) return; // skip: this came from the fetch, not a user action
      isUserToggleRef.current = false;
      const { data: session } = await supabase.auth.getSession();
      const user = session.session?.user;
      if (!user) return;

      const newRole = isBecomingOrganizer ? "organizer" : "attendee";

      const { error } = await supabase
        .from("users")
        .update({ roles: newRole })
        .eq("id", user.id);

      if (error) {
        console.log("Error updating user role:", error);
        return;
      } else {
        console.log(`User role updated to ${newRole}`);
      }
    };

    updateUserRole();
  }, [isBecomingOrganizer]);

  // const redirectUser = async (userId: string) => {
  //   const { data, error } = await supabase
  //     .from("users")
  //     .select("onboarding_completed")
  //     .eq("id", userId)
  //     .single();

  //   if (error) {
  //     console.log(error);
  //     return;
  //   }

  //   if (data.onboarding_completed) {
  //     router.replace("/");
  //   }
  // };

  // useEffect(() => {
  //   const checkUser = async () => {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();

  //     if (!user) {
  //       router.replace("/sign-up");
  //       return;
  //     }

  //     // await redirectUser(user.id);
  //   };

  //   checkUser();
  // }, [router, pathname]);

  const [checkingAuth, setCheckingAuth] = useState(true);

  // ROUTE PROTECTION

  useEffect(() => {
    const handleRouteProtection = async () => {
      const { data } = await supabase.auth.getSession();

      const publicPaths = ["/user-detail", "/login", "/sign-up","/one-time"];

      if (!data.session) {
        if (publicPaths.includes(pathname)) {
          return;
        }
        router.replace("/sign-up");
        return;
      }

      const { data: userData, error } = await supabase
        .from("users")
        .select("roles")
        .eq("id", data.session.user.id)
        .maybeSingle(); // was .single() — this now survives a missing row instead of throwing

      if (
        pathname.startsWith("/dashboard") &&
        userData?.roles !== "organizer" &&
        data.session
      ) {
        router.replace("/");
        return;
      }
      console.log(
        "isAccessible",
        pathname.startsWith("/dashboard") &&
          userData?.roles !== "organizer" &&
          data.session,
      );

      console.log("ispathname", pathname.startsWith("/dashboard"));
      console.log("userData", userData);
      console.log("datasession", data.session);

      // rest of your protection...
      setCheckingAuth(false);
    };

    handleRouteProtection();
  }, [pathname, router, isBecomingOrganizer]);

  return {
    authenticationDetail,
    handleSignUpOnchange,
    handleSignUpFormContinuation,
    signUpNewUser,
    signInWithEmail,
    handleGoogleSignIn,
    handleFacebook,
    handeResetPassword,
    handlePasswordChangerInput,
    userChoiceList,
    handleUserChoice,
    loading,
    // displayBecomeAuser,
    isBecomingOrganizer,
    handleBecomeOrganizerOnchange,
    welcomeEmail,
    handleSignUpNewUserOnchange,
    loginDetail,
    handleLoginOnChange,
    checkingAuth,
  };
}
