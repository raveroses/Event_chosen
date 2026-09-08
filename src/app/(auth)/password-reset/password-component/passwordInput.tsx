"use client";
import { DesktopLogo } from "@/app/_logo-sizes/Logo";
import useAppContext from "@/app/_custom-hooks/useAppContext";
import { Spinner } from "@/components/ui/spinner";
const PasswordInput = () => {
  const {
    authenticationDetail,
    handleSignUpOnchange,
    handlePasswordChangerInput,
    loading
  } = useAppContext();

  return (
    <section className="absolute md:top-[200px] top-[0px] md:left-[700px] bg-white md:w-[420px] w-full md:h-auto h-[750px] opacity-75 md:px-[35px] px-[20px] md:py-[50px] py-[100px] z-30 ">
      <DesktopLogo />

      <div className="text-[25px] font-bold py-[25px]">Enter your password</div>
      <form
        className="pt-5 flex flex-col gap-[20px]"
        onSubmit={handlePasswordChangerInput}
      >
        <input
          type="password"
          name="password"
          value={authenticationDetail.password}
          className="border-2 w-full p-[12px] rounded"
          placeholder="Enter password"
          onChange={handleSignUpOnchange}
        />

        <button className="w-full text-white bg-[#d1410c] p-[13px] rounded my-[5px] text-[13px] font-bold">
          Update Password
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

export default PasswordInput;
