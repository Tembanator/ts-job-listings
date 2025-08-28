import DashboardTabs from "../../components/dashboard/DashboardTabs";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-[calc(100vh-160px)]">
      <DashboardTabs />
      {children}
    </div>
  );
}
