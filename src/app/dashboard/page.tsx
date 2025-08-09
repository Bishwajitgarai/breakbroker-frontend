import DashboardHeader from "../../components/DashboardHeader";
import QuickActions from "../../components/QuickActions";
import RecentActivity from "../../components/RecentActivity";
import PropertyAnalytics from "../../components/PropertyAnalytics";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <DashboardHeader username="Bishwajit" />
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <QuickActions />
          <RecentActivity />
        </div>
        <div>
          <PropertyAnalytics />
        </div>
      </div>
    </div>
  );
}
