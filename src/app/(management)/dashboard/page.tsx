import Sidebar from "../components/dashboardsibebar/sidebar";
import { DashboardFirstBody } from "../components/dashboard-body/dashboardBody";
import ImageUploader from "../components/dashboard-ImageUploader/imageUploader";
const DashboardPage = () => {
  return (
    <section className="flex w-[100%] justify-between">
      <div className="flex gap-[10px] items-center w-[24%] h-full p-2 bg-gray-100">
        <div>
          <Sidebar />
        </div>
        <div>
          <DashboardFirstBody />
        </div>
      </div>

      <div className="image w-[74%] flex justify-center px-[30px]">
        <ImageUploader />
      </div>
    </section>
  );
};
export default DashboardPage;
