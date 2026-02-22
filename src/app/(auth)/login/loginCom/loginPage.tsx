"use client";
import Link from "next/link";
import { DesktopLogo } from "@/app/_logo-sizes/Logo";
import useAppContext from "@/app/_custom-hooks/useAppContext";
import { Spinner } from "@/components/ui/spinner";
const LoginPage = () => {
  const {
    loginDetail,
    handleLoginOnChange ,
    signInWithEmail,
    loading,
  } = useAppContext();
  return (
    <section className="absolute md:top-[200px] top-[0px] md:left-[700px] bg-white md:w-[420px] w-full md:h-auto h-[750px] opacity-75 md:px-[35px] px-[20px] md:py-[50px] py-[100px] z-30 ">
      <DesktopLogo />

      <div className="text-[25px] font-bold py-[25px]">Enter your password</div>
      <form
        className="pt-5 flex flex-col gap-[20px]"
        onSubmit={signInWithEmail}
      >
        <input
          type="email"
          name="email"
          value={loginDetail.email}
          className="border-2 w-full p-[12px] rounded"
          placeholder="Enter email"
          onChange={handleLoginOnChange }
        />
        <input
          type="password"
          name="password"
          value={loginDetail.password}
          className="border-2 w-full p-[12px] rounded"
          placeholder="Enter password"
          onChange={handleLoginOnChange }
        />
        <Link
          href={"/reset-password"}
          className="text-[13px] font-bold text-[#3659e3]"
        >
          Forgot password?
        </Link>

        <button className="w-full text-white bg-[#d1410c] p-[13px] rounded my-[5px] text-[13px] font-bold">
          Sign in
        </button>
        <Link href={"/one-time"}>
          <button className="w-full bg-transparent p-[13px] rounded my-[3px] border border-gray-300 text-[13px] font-bold">
            Sign in with one-time code
          </button>
        </Link>
      </form>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
          <Spinner className="h-10 w-10 text-primary" />
        </div>
      )}
    </section>
  );
};

export default LoginPage;
