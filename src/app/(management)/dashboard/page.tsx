import Sidebar from "../components/dashboardsibebar/sidebar";
import { DashboardFirstBody } from "../components/dashboard-body/dashboardBody";
const DashboardPage = () => {
  return (
    <section className="flex gap-[10px] items-center">
      <Sidebar />
      <DashboardFirstBody />
    </section>
  );
};
export default DashboardPage;
