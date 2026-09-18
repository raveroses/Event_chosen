"use client";
import Link from "next/link";
import useAppContext from "@/app/_custom-hooks/useAppContext";
import { DesktopLogo } from "@/app/_logo-sizes/Logo";
import { Spinner } from "@/components/ui/spinner";
import { FaEyeSlash } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import { useState } from "react";

const UserDetail = () => {
  const {
    authenticationDetail,
    signUpNewUser,
    loading,
    handleSignUpNewUserOnchange,
  } = useAppContext();


  const [isHiddenPassword, setIsHiddenPassword] = useState<boolean>(false);
  const handleIsPasswordHidden = () => {
    setIsHiddenPassword((prev) => !prev);
  };
  const [isFocus, setIsFocus] = useState<boolean>(false)

  return (
    <section className="absolute md:top-[200px] top-[0px] md:left-[700px] bg-white md:w-[420px] w-full md:h-auto h-[750px] opacity-75 md:px-[35px] px-[20px] md:py-[50px] py-[100px] z-30 ">
      <DesktopLogo />
      <div className="md:text-[25px] text-[20px] font-bold py-[20px]">
        <h2>Lets setup your account</h2>
      </div>
      <form className="pt-2 flex flex-col gap-[20px]" onSubmit={signUpNewUser}>
        <input
          type="email"
          value={authenticationDetail.signUpEmail}
          onChange={handleSignUpNewUserOnchange}
          required
          className="border-2 w-full p-[12px] rounded placeholder:text-[13px] font-medium focus:outline-red-400"
          placeholder="JohnDoe@gmail.com"
        />
        <input
          type="text"
          name="firstName"
          value={authenticationDetail.firstName}
          onChange={handleSignUpNewUserOnchange}
          required
          className="border-2 w-full p-[12px] rounded placeholder:text-[13px] font-medium focus:outline-red-400"
          placeholder="First name"
        />
        <input
          type="text"
          name="lastName"
          value={authenticationDetail.lastName}
          onChange={handleSignUpNewUserOnchange}
          required
          className="border-2 w-full p-[12px] rounded placeholder:text-[13px] font-medium focus:outline-red-400"
          placeholder="Last name"
        />

        <div className={`flex justify-between items-center border-2 w-full p-[12px] rounded ${isFocus ? "border-red-400" : "border"}`}>
          <input
            type={isHiddenPassword ? "text" : "password"}
            name="password"
            value={authenticationDetail.password}
            onChange={handleSignUpNewUserOnchange}
            required
            className="w-full placeholder:text-[13px] font-medium  outline-none border-none"
            placeholder="Enter password"
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

        <button className="w-full text-white bg-[#d1410c] p-[13px] rounded my-[5px] text-[13px] font-bold cursor-pointer">
          Submit
        </button>
        <Link href={"/one-time"}>
          <button className="w-full bg-transparent p-[13px] rounded my-[3px] border border-gray-300 text-[13px] font-bold cursor-pointer">
            Sign in with one-time code
          </button>
        </Link>
        <Link href="/login" className="text-center text-[#3659e3] text-sm inline-block cursor-pinter hover:underline italic transition-all duration-[2000ms]">
          Already have an account, Login
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

export default UserDetail;
