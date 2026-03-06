import { DashboardFirstBody } from "../components/dashboard-body/dashboardBody";
import ImageUploader from "../components/dashboard-ImageUploader/imageUploader";
import ToastContainers from "@/app/Tostify/Toastify";
const DashboardPage = () => {
  return (
    <section className="flex w-full h-full gap-[100px]">
      <div className="md:block hidden md:w-[20%] h-[600px] p-2 bg-gray-100 ">
        <DashboardFirstBody />
      </div>

      <div className="image md:w-[60%] w-full flex justify-center md:px-[30px] md:pt-[60px] p-[0px] md:bg-transparent bg-gray-200">
        <ImageUploader />
      </div>
      <ToastContainers/>
    </section>
  );
};
export default DashboardPage;
