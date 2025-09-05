import Sidebar from "../components/dashboardsibebar/sidebar";
import { DashboardFirstBody } from "../components/dashboard-body/dashboardBody";
import ImageUploader from "../components/dashboard-ImageUploader/imageUploader";
const DashboardPage = () => {
  return (
    <section className="flex w-full justify-between">
      <div className="md:block hidden w-[24%] h-full p-2 bg-gray-100 ">
        <div className="flex gap-[10px] items-center ">
          <div className="">
            <Sidebar />
          </div>
          <div>
            <DashboardFirstBody />
          </div>
        </div>
      </div>

      <div className="image md:w-[74%] w-full flex justify-center md:px-[30px] p-[0px] md:bg-transparent bg-gray-200">
        <ImageUploader />
      </div>
    </section>
  );
};
export default DashboardPage;
