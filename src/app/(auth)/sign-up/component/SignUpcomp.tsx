"use client";
import { DesktopLogo } from "@/app/_logo-sizes/Logo";
import { FaApple, FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import useAppContext from "@/app/_custom-hooks/useAppContext";
import { Spinner } from "@/components/ui/spinner";
const SignUpcomp = () => {
  const {
    handleGoogleSignIn,
    handleFacebook,
    handleSignUpOnchange,
    authenticationDetail,
    handleSignUpFormContinuation,
    loading,
  } = useAppContext();
  return (
    <section className="SignUp absolute md:top-[120px] top-[0px] md:left-[700px] bg-white md:w-[500px] w-full md:h-[700px]  h-[750px] opacity-75 md:px-[35px] px-[20px] py-[50px] z-30 ">
      <DesktopLogo />

      <div className="text-[35px] font-bold py-[45px]">
        <h2>Welcome!</h2>
        <h2>Whats your email?</h2>
      </div>
      <form onSubmit={handleSignUpFormContinuation}>
        <input
          type="email"
          name="signUpEmail"
          placeholder="Email"
          value={authenticationDetail.signUpEmail}
          className="border w-full  p-[15px]"
          onChange={handleSignUpOnchange}
        />
        <button className="w-full  text-white bg-[#d1410c] p-2 rounded my-[30px] ">
          Continue
        </button>
      </form>
      <div className="flex justify-center items-center gap-[4px] text-[13px]">
        <span className="border-b border-gray-600 w-[100px]"></span>Or sign in
        with <span className="border-b border-gray-600 w-[100px]"> </span>
      </div>

      <div className="text-[13px] text-center mt-5">
        By clicking Continue or the Apple, Google, or Facebook icons, you agree
        to Eventbrites Terms of Service and Privacy Policy.
      </div>

      <div className="flex pt-[60px] justify-center gap-[50px]">
        <div className="apple text-[25px] border border-gray-600 p-3 rounded">
          <FaApple />
        </div>
        <div
          className="google text-[25px] border border-gray-600 p-3 rounded"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle />
        </div>
        <div
          className="Facebook text-[25px] border border-gray-600 p-3 rounded"
          onClick={handleFacebook}
        >
          <FaFacebook />
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
          <Spinner className="h-10 w-10 text-primary" />
        </div>
      )}
    </section>
  );
};

export default SignUpcomp;
