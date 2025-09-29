import Image from "next/image";
import { DesktopLogo } from "../_logo-sizes/Logo";
const ProfileSetting = () => {
  return (
    <section>
      <DesktopLogo />
      <div className="flex justify-center items-center flex-col mt-[200px]">
        <div>
          <h2 className="text-[30px] font-bold">Welcome to EventChoosen👋</h2>
          <p>We are that you are here, what can we help you with first?</p>
        </div>

        <div className="flex">
          <div className="designImage">
            <Image
              src="/images/auto-create-floating-card-splatter2.png"
              alt="images"
              width={500}
              height={300}
            />
          </div>

          <div className="flex justify-between gap-[40px]">
            <div className="non-eventOrganizer bg-white shadow w-[350px] h-[350px] flex flex-col justify-center items-center text-center ">
              <Image
                src="/images/guy.png"
                alt="images"
                width={300}
                height={300}
              />

              <div>
                <h2 className="text-[18px] font-bold">Find an event</h2>
                <p className="border-2  p-2">Tell us what you love</p>
              </div>
            </div>

            <div className="event-organizer bg-white shadow w-[350px] h-[350px] flex flex-col justify-center items-center text-center">
              <Image
                src="/images/girl.png"
                alt="images"
                width={300}
                height={300}
              />
              <div>
                <h2>Organize an event</h2>
                <p>Plan your best event ever</p>
              </div>
            </div>
          </div>
          <div className="designImage">
            <Image
              src="/images/auto-create-floating-card-splatter1.png"
              alt="images"
              width={500}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSetting;
