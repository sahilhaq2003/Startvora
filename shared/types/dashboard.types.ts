export interface DashboardKPI {
  revenue: {
    thisWeek: number;
    thisMonth: number;
    change: number; // percentage change from previous period
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

export interface RevenueTrend {
  date: string;
  amount: number;
}

export interface DashboardData {
  kpis: DashboardKPI;
  revenueTrend: RevenueTrend[]; // 7-day trend
  recentTasks: Task[];
}

interface Task {
  id: string;
  title: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
}
