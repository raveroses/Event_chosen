"use client"

import { useAuth } from "@/app/_custom-hooks/useAuth";
import ManagmentHeader from "../components/dashboard-header/managementHeader";
import Sidebar from "../components/dashboardsibebar/sidebar";
import OverlayBackground from "./events/component/eventOverlay/overlay-background";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const { checkingAuth } = useAuth()
  if (checkingAuth) {
    return null;
  }
  return (
    <div>
      <ManagmentHeader />

      <div className="flex">
        <div className="">
          <Sidebar />
        </div>
        {children}
      </div>
      <OverlayBackground />
    </div>
  );
}
