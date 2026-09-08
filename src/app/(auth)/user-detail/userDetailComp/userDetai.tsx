"use client";
import Link from "next/link";
import useAppContext from "@/app/_custom-hooks/useAppContext";
import { DesktopLogo } from "@/app/_logo-sizes/Logo";
import { Spinner } from "@/components/ui/spinner";
const UserDetail = () => {
  const {
    authenticationDetail,
    signUpNewUser,
    loading,
    handleSignUpNewUserOnchange,
  } = useAppContext();
  return (
    <section className="absolute md:top-[200px] top-[0px] md:left-[700px] bg-white md:w-[420px] w-full md:h-auto h-[750px] opacity-75 md:px-[35px] px-[20px] md:py-[50px] py-[100px] z-30 ">
      <DesktopLogo />
      <div className="text-[35px] font-bold py-[45px]">
        <h2>Lets setup your account</h2>
      </div>
      <form className="pt-5 flex flex-col gap-[20px]" onSubmit={signUpNewUser}>
        <input
          type="email"
          value={authenticationDetail.signUpEmail}
          onChange={handleSignUpNewUserOnchange}
          required
          className="border-2 w-full p-[12px] rounded placeholder:text-[13px] font-semibold"
          placeholder="JohnDoe@gmail.com"
        />
        <input
          type="text"
          name="firstName"
          value={authenticationDetail.firstName}
          onChange={handleSignUpNewUserOnchange}
          required
          className="border-2 w-full p-[12px] rounded placeholder:text-[13px] font-semibold"
          placeholder="First name"
        />
        <input
          type="text"
          name="lastName"
          value={authenticationDetail.lastName}
          onChange={handleSignUpNewUserOnchange}
          required
          className="border-2 w-full p-[12px] rounded placeholder:text-[13px] font-semibold"
          placeholder="Last name"
        />

        <input
          type="password"
          name="password"
          value={authenticationDetail.password}
          onChange={handleSignUpNewUserOnchange}
          required
          className="border-2 w-full p-[12px] rounded placeholder:text-[13px] font-semibold"
          placeholder="Enter password"
        />

        <button className="w-full text-white bg-[#d1410c] p-[13px] rounded my-[5px] text-[13px] font-bold">
          Submit
        </button>
        <Link href="/login" className="text-center text-[#3659e3]">
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
