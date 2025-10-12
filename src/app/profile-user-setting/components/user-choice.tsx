"use client";
import Image from "next/image";
import { DesktopLogo } from "@/app/_logo-sizes/Logo";
import useAppContext from "@/app/_custom-hooks/useAppContext";
import { Spinner } from "@/components/ui/spinner";
const UserChoice = () => {
  const { userChoiceList, handleUserChoice, loading } = useAppContext();

  return (
    <section className="p-5">
      <div>
        <DesktopLogo />
      </div>
      <div className="flex justify-center items-center flex-col md:mt-[200px] mt-[70px]">
        <div className="text-center flex justify-center gap-2 flex-col">
          <h2 className="text-[30px] font-bold">Welcome to EventChosen👋</h2>
          <p>We are glad that you are here, what can we help you with first?</p>
        </div>

        <div className="flex ">
          <div className="designImage md:block hidden">
            <Image
              src="/images/auto-create-floating-card-splatter2.png"
              alt="images"
              width={600}
              height={300}
            />
          </div>
          <div className="flex justify-between gap-[40px] md:flex-row flex-col">
            {userChoiceList.map((Item, index) => {
              return (
                <div
                  className="non-eventOrganizer bg-white shadow w-[350px] h-[350px] flex flex-col justify-center items-center text-center "
                  key={index}
                  onClick={() => handleUserChoice(Item.heading)}
                >
                  <Image src={Item.url} alt="images" width={300} height={300} />

                  <div>
                    <h2 className="text-[18px] font-bold">{Item.heading}</h2>
                    <p className="border-2 border-black py-2 px-4 mt-2 text-[13px] rounded">
                      {Item.paragraph}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="designImage md:block hidden">
            <Image
              src="/images/auto-create-floating-card-splatter1.png"
              alt="images"
              width={600}
              height={300}
            />
          </div>
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

export default UserChoice;
