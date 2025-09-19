import { DesktopLogo } from "@/app/_logo-sizes/Logo";
import Link from "next/link";
const OnetimeCode = () => {
  return (
    <section className="absolute md:top-[200px] top-[0px] md:left-[700px] bg-white md:w-[420px] w-full md:h-auto h-[750px] opacity-75 md:px-[35px] px-[20px] md:py-[50px] py-[100px] z-30 ">
      <DesktopLogo />

      <div className="text-[25px] font-bold py-[25px]">
        Check your email for a code
      </div>

      <div className="paragraph text-left text-[14px]">
        Check your inbox and enter the code we have sent you.
      </div>
      <form className="pt-5 flex flex-col gap-[20px]">
        <input
          type="email"
          name=""
          id=""
          className="border-2 w-full p-[12px] rounded placeholder:text-[13px] font-semibold"
          placeholder="JohnDoe@gmail.com"
        />
        <input
          type="number"
          name=""
          id=""
          className="border-2 w-full p-[12px] rounded appearance-none placeholder:text-[13px] font-semibold"
          placeholder="Enter-one-time code*"
        />

        <button className="w-full text-white bg-[#d1410c] p-[13px] rounded my-[5px] text-[13px] font-bold">
          Submit
        </button>
        <Link
          href={"/"}
          className="text-[15px] font-bold text-center text-[#3659e3]"
        >
          Resend code
        </Link>
      </form>
    </section>
  );
};

export default OnetimeCode;
