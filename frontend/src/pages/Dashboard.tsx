import { useEffect, useMemo, useState } from 'react';

interface DashboardKPI {
  revenue: {
    thisWeek: number;
    thisMonth: number;
    change: number;
  };
  orders: {
    count: number;
    change: number;
  };
  customers: {
    count: number;
    change: number;
  };
  tasksDueToday: number;
}

interface RevenueTrend {
  date: string;
  amount: number;
}

interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: string;
}

interface DashboardData {
  kpis: DashboardKPI;
  revenueTrend: RevenueTrend[];
  recentTasks: Task[];
}

/* ------------------ Reusable Components ------------------ */

const KpiCard = ({
  title,
  value,
  subtitle,
  change,
  color,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: number;
  color: string;
}) => (
  <div className={`bg-white rounded-2xl p-6 shadow-sm border-t-4 ${color}`}>
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500 font-medium">{title}</span>
      {change !== undefined && (
        <span
          className={`text-xs font-semibold ${
            change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(1)}%
        </span>
      )}
    </div>
    <div className="text-3xl font-bold text-gray-900 mt-2">{value}</div>
    {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
  </div>
);

/* ------------------ Main Dashboard ------------------ */

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');

      const res = await fetch(
        `${import.meta.env.VITE_API_URL ?? ''}/dashboard`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error('Failed to load dashboard');

      setData(await res.json());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const maxRevenue = useMemo(
    () =>
      Math.max(
        ...(data?.revenueTrend.map((r) => r.amount) ?? [1])
      ),
    [data]
  );

  /* ------------------ States ------------------ */

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-500">
        Loading dashboard…
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-96 text-red-500">
        {error || 'Something went wrong'}
      </div>
    );
  }

  /* ------------------ UI ------------------ */

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">
        Overview
      </h1>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <KpiCard
          title="Revenue (This Week)"
          value={`$${data.kpis.revenue.thisWeek.toFixed(2)}`}
          subtitle={`This month: $${data.kpis.revenue.thisMonth.toFixed(2)}`}
          change={data.kpis.revenue.change}
          color="border-blue-500"
        />
        <KpiCard
          title="Orders"
          value={data.kpis.orders.count}
          subtitle="Total orders"
          color="border-purple-500"
        />
        <KpiCard
          title="Customers"
          value={data.kpis.customers.count}
          change={data.kpis.customers.change}
          subtitle="Active customers"
          color="border-green-500"
        />
        <KpiCard
          title="Tasks Due Today"
          value={data.kpis.tasksDueToday}
          subtitle="Pending tasks"
          color="border-yellow-500"
        />
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">
            Revenue Trend
          </h2>
          <div className="flex items-end gap-3 h-44">
            {data.revenueTrend.map((item) => {
              const height = (item.amount / maxRevenue) * 100;
              return (
                <div key={item.date} className="flex flex-col items-center w-8">
                  <div
                    className="w-full bg-blue-500/80 rounded-lg transition-all"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-[10px] text-gray-400 mt-2">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">
            Recent Tasks
          </h2>

          {data.recentTasks.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No tasks created yet.
            </p>
          ) : (
            <ul className="space-y-4">
              {data.recentTasks.map((task) => (
                <li
                  key={task.id}
                  className="p-4 rounded-xl bg-gray-50 border flex flex-col"
                >
                  <span className="font-medium text-gray-900">
                    {task.title}
                  </span>
                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <span className="text-gray-500">
                      Due {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-semibold ${
                        task.priority === 'high'
                          ? 'bg-red-500 text-white'
                          : task.priority === 'medium'
                          ? 'bg-yellow-400 text-white'
                          : 'bg-green-500 text-white'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Floating Action */}
      <button
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-3xl shadow-lg transition"
        title="Quick action"
      >
        +
      </button>
    </div>
  );
}
