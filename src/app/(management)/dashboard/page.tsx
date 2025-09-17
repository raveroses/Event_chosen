import { DashboardFirstBody } from "../components/dashboard-body/dashboardBody";
import ImageUploader from "../components/dashboard-ImageUploader/imageUploader";
const DashboardPage = () => {
  return (
    <section className="flex w-full h-full justify-between">
      <div className="md:block hidden w-[30%] h-[600px] p-2 bg-gray-100 ">
        <DashboardFirstBody />
      </div>

      <div className="image md:w-[60%] w-full flex justify-center md:px-[30px] p-[0px] md:bg-transparent bg-gray-200">
        <ImageUploader />
      </div>
    </section>
  );
};
export default DashboardPage;
