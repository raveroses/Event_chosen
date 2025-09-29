import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AuthenticatedDetail } from "../_types/types";
import supabase from "../_supabase/ceateclient";
const localHostUrl = process.env.NEXT_PUBLIC__URL;
export function useAuth() {
  const [authenticationDetail, setAuthenticationDetail] =
    useState<AuthenticatedDetail>({
      signUpEmail: "",
      firstName: "",
      lastName: "",
      password: "",
    });
  const isEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{3,}$/;
  const router = useRouter();

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
    }
    router.push("/user-detail");
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
    }
    await supabase.auth.signUp({
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
    router.push("/login");
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
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: authenticationDetail.signUpEmail.trim(),
      password: authenticationDetail.password,
    });

    if (!data.session) {
      console.log(error);
      toast.error(error?.message);
      router.push("/login");
      return;
    }
    router.push("/");
  };

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: localHostUrl,
      },
    });
  };

  const handleFacebook = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: localHostUrl,
      },
    });
  };

  const handleOneTime = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabase.auth.signInWithOtp({
      email: authenticationDetail.signUpEmail,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: localHostUrl,
      },
    });
    router.push("/one-time");
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
        console.log(event, session);
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
  };
}
