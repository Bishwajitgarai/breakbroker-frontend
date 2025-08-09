export default function RecentActivity() {
  const activities = [
    { title: "Viewed Apartment in Berlin", date: "Aug 8, 2025" },
    { title: "Saved Property in Mumbai", date: "Aug 5, 2025" },
    { title: "Contacted Owner - 2BHK in Pune", date: "Aug 3, 2025" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <ul className="space-y-3">
        {activities.map((a, i) => (
          <li key={i} className="flex justify-between text-sm text-gray-700">
            <span>{a.title}</span>
            <span className="text-gray-500">{a.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
