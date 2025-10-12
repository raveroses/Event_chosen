"use client";
import { DesktopLogo } from "@/app/_logo-sizes/Logo";
import useAppContext from "@/app/_custom-hooks/useAppContext";
import { Spinner } from "@/components/ui/spinner";
const PasswordReset = () => {
  const { handeResetPassword, authenticationDetail, handleSignUpOnchange,loading } =
    useAppContext();
  return (
    <section className="SignUp absolute md:top-[170px] top-[0px] md:left-[700px] bg-white md:w-[500px] w-full md:h-[500px]  h-[750px] opacity-75 md:px-[35px] px-[20px] py-[50px] z-30 ">
      <DesktopLogo />

      <div className="text-[25px] font-bold py-[45px]">
        <h2>👋 Hey sorry about your password!</h2>
      </div>
      <form onSubmit={handeResetPassword}>
        <h2 className="py-5 text-[25px] font-bold">Whats your email?</h2>

        <input
          type="email"
          name="signUpEmail"
          value={authenticationDetail.signUpEmail}
          onChange={handleSignUpOnchange}
          placeholder="Email"
          className="border w-full  p-[15px]"
        />
        <button className="w-full  text-white bg-[#d1410c] p-2 rounded my-[30px] ">
          update password
        </button>
      </form>
        {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
          <Spinners className="h-10 w-10 text-primary" />
        </div>
      )}
    </section>
  );
};

export default PasswordReset;
