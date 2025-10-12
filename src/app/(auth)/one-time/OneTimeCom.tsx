"use client";
import useAppContext from "@/app/_custom-hooks/useAppContext";
import { DesktopLogo } from "@/app/_logo-sizes/Logo";
import { Spinner } from "@/components/ui/spinner";
const OnetimeCodeCom = () => {
  const { authenticationDetail, handleOneTime, handleSignUpOnchange, loading } =
    useAppContext();
  return (
    <section className="absolute md:top-[200px] top-[0px] md:left-[700px] bg-white md:w-[420px] w-full md:h-auto h-[750px] opacity-75 md:px-[35px] px-[20px] md:py-[50px] py-[100px] z-30 ">
      <DesktopLogo />

      <div className="text-[25px] font-bold py-[25px]">
        Check your email for a code
      </div>

      <div className="paragraph text-left text-[14px]">
        Check your inbox and enter the code we have sent you.
      </div>
      <form className="pt-5 flex flex-col gap-[20px]" onSubmit={handleOneTime}>
        <input
          type="email"
          value={authenticationDetail.signUpEmail}
          name="signUpEmail"
          onChange={handleSignUpOnchange}
          required
          className="border-2 w-full p-[12px] rounded placeholder:text-[13px] font-semibold"
          placeholder="JohnDoe@gmail.com"
        />

        <button className="w-full text-white bg-[#d1410c] p-[13px] rounded my-[5px] text-[13px] font-bold">
          Submit
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

export default OnetimeCodeCom;
