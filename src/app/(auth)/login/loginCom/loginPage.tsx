"use client";
import Link from "next/link";
import { DesktopLogo } from "@/app/_logo-sizes/Logo";
import useAppContext from "@/app/_custom-hooks/useAppContext";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa6";
const LoginPage = () => {
  const {
    loginDetail,
    handleLoginOnChange,
    signInWithEmail,
    loading,
  } = useAppContext();

  const [isHiddenPassword, setIsHiddenPassword] = useState<boolean>(false);
  const handleIsPasswordHidden = () => {
    setIsHiddenPassword((prev) => !prev);
  };
  const [isFocus, setIsFocus] = useState<boolean>(false)
  return (
    <section className="absolute md:top-[200px] top-[0px] md:left-[700px] bg-white md:w-[420px] w-full md:h-auto h-[750px] opacity-75 md:px-[35px] px-[20px] md:py-[50px] py-[100px] z-30 ">
      <DesktopLogo />

      <div className="md:text-[25px] text-[20px] font-bold py-[25px]">Enter your password</div>
      <form
        className="pt-5 flex flex-col gap-[20px]"
        onSubmit={signInWithEmail}
      >
        <input
          type="text"
          name="email"
          value={loginDetail.email}
          className="border-2 w-full p-[12px] rounded"
          placeholder="Enter email"
          onChange={handleLoginOnChange}
        />
        <div className={`flex justify-between items-center border-2 w-full p-[12px] rounded ${isFocus ? "border-red-400" : "border"}`}>
          <input
            type={isHiddenPassword ? "text" : "password"}
            name="password"
            value={loginDetail.password}
            className="w-full placeholder:text-[13px] font-medium  outline-none border-none"
            placeholder="Enter password"
            onChange={handleLoginOnChange}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />

          <div className="text-xl cursor-pointer" onClick={handleIsPasswordHidden}>
            {isHiddenPassword ?
              <IoMdEye /> :
              <FaEyeSlash />
            }
          </div>
        </div>
        <Link
          href={"/reset-password"}
          className="text-[12px] font-bold text-[#3659e3] italic cursor-pointer underline"
        >
          Forgot password?
        </Link>

        <button className="w-full text-white bg-[#d1410c] p-[13px] rounded my-[5px] text-[13px] font-bold cursor-pointer">
          Sign in
        </button>

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
