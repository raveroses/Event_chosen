"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AuthenticatedDetail } from "../_types/types";
import supabase from "../_supabase/ceateclient";
import { UserProfile } from "../_types/types";
import { userChoice } from "../_types/types";
import { AuthError } from "@supabase/supabase-js";
const localHostUrl = process.env.NEXT_PUBLIC__URL;
const typeUser = process.env.NEXT_PUBLIC_CHOICEfUL;
export function useAuth() {
  const [userChoiceList] = useState<userChoice[]>([
    {
      url: "/images/guy.png",
      heading: "Find an event",
      paragraph: " Tell us what you love",
    },
    {
      url: "/images/girl.png",
      heading: "Organize an event",
      paragraph: "Plan your best event ever",
    },
  ]);
  const router = useRouter();

  // const [userLoginChoice, setUserIUserLoginChoice] = useState<string>("");
  const [insertPayload, setInsertPayLoad] = useState<UserProfile>({
    id: "",
    email: "",
    role: "",
    isOrganizer: false,
  });

  const handleUserChoice = async (id: string) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (!session?.user) {
      console.log(error);
      return;
    }
    setInsertPayLoad((prev) => ({
      ...prev,
      id: session.user.id,
      email: session.user.email!,
      role: id,
      isOrganizer: id.toLowerCase().startsWith("organize"),
    }));

    console.log("Stalker", session);
  };

  useEffect(() => {
    const userTableCreations = async () => {
      if (!insertPayload.role) {
        return;
      }

      const { data: user, error } = await supabase
        .from("users")
        .insert([insertPayload])
        .select();

      if (error) {
        console.error("Insert error:", error);
      } else {
        console.log("Inserted user:", user);
      }
    };
    userTableCreations();
  }, [insertPayload]);

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

  const handleSignUpFormContinuation = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (
      !isEmail.test(authenticationDetail.signUpEmail.trim()) ||
      !authenticationDetail.signUpEmail
    ) {
      toast.error("Re-check all fields");
      return;
    } else {
      router.push("/user-detail");
    }
  };

  const signUpNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !authenticationDetail.firstName.trim() ||
      !authenticationDetail.lastName.trim() ||
      !authenticationDetail.password.trim() ||
      !isEmail.test(authenticationDetail.signUpEmail.trim())
    ) {
      toast.error("Re-check all fields");
      return;
    } else {
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
      if (data.session) {
        router.push("/login");
      } else {
        router.push("/sign-up");
      }
      // console.log("SIGN UP =>", data.session, error);
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
    if (
      !authenticationDetail.password.trim() ||
      !isEmail.test(authenticationDetail.signUpEmail.trim())
    ) {
      toast.error("Re-check all fields");
      return;
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: authenticationDetail.signUpEmail.trim(),
        password: authenticationDetail.password,
      });

      if (!data.session) {
        // console.log(error);
        toast.error(error?.message);
        router.push("/login");
        return;
      } else {
        router.push("/profile-user-setting");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: typeUser,
      },
    });
  };

  const handleFacebook = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: typeUser,
      },
    });
  };

  const handleOneTime = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: authenticationDetail.signUpEmail,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: typeUser,
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
      console.log((e as Error).message);
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
    if (!authenticationDetail.password.trim()) {
      toast.error("Re-check all fields");

      return;
    }

    await supabase.auth.updateUser({
      password: authenticationDetail.password.trim(),
    });
    router.push("/login");
    setAuthenticationDetail({
      signUpEmail: "",
      firstName: "",
      lastName: "",
      password: "",
    });
  };

  useEffect(() => {
    const handleRouteProtection = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/sign-up");
        return;
      }

      console.log(error);
    };

    handleRouteProtection();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          router.push("/sign-up");
        }
      }
    );

    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, [router]);

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
  };
}
