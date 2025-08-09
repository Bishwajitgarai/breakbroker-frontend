export default function DashboardHeader({ username }: { username: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h1 className="text-2xl font-bold">Welcome back, {username} 👋</h1>
      <p className="text-gray-600 mt-1">Here’s what’s happening in your BreakBroker account.</p>
    </div>
  );
}
