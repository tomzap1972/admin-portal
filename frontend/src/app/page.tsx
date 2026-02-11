import Card from "@/components/ui/Card";

const stats = [
  { label: "Total Users", value: "1,234", change: "+12%" },
  { label: "Active Content", value: "56", change: "+3" },
  { label: "Feature Flags", value: "18", change: "2 updated" },
  { label: "App Versions", value: "2", change: "Native & Flutter" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            <p className="text-sm text-green-600 mt-1">{stat.change}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Activity">
          <ul className="space-y-3">
            {[
              "User john@example.com registered",
              "Content 'Welcome Banner' published",
              "Feature flag 'dark_mode' enabled for Flutter",
              "User admin@example.com updated config",
            ].map((activity, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                {activity}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Platform Overview">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Native App</p>
                <p className="text-sm text-gray-500">iOS & Android</p>
              </div>
              <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Flutter App</p>
                <p className="text-sm text-gray-500">Cross-platform</p>
              </div>
              <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Active
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
