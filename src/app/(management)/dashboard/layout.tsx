import ManagmentHeader from "../components/dashboard-header/managementHeader";
import Sidebar from "../components/dashboardsibebar/sidebar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ManagmentHeader />

      <div className="flex">
        <div className="md:block hidden">
          <Sidebar />
        </div>
        {children}
      </div>
    </div>
  );
}
