import ManagmentHeader from "../components/dashboard-header/managementHeader";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ManagmentHeader />
      {children}
    </div>
  );
}
