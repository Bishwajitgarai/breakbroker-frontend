export default function PropertyAnalytics() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Your Property Stats</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Total Listings</span>
          <span className="font-bold">12</span>
        </div>
        <div className="flex justify-between">
          <span>Active Views</span>
          <span className="font-bold">87</span>
        </div>
        <div className="flex justify-between">
          <span>Inquiries</span>
          <span className="font-bold">23</span>
        </div>
      </div>
    </div>
  );
}
