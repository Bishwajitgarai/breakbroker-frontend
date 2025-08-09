import { PlusCircle, Search, Heart } from "lucide-react";

export default function QuickActions() {
  const actions = [
    { icon: <PlusCircle className="w-5 h-5" />, label: "Post Property" },
    { icon: <Search className="w-5 h-5" />, label: "Search Properties" },
    { icon: <Heart className="w-5 h-5" />, label: "View Favorites" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-4">
        {actions.map((a, i) => (
          <button key={i} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            {a.icon}
            <span className="mt-2 text-sm">{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
