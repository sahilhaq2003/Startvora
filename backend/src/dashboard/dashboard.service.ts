import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThan } from 'typeorm';
import { Task } from '../tasks/entities/task.entity';
import { Revenue } from '../financial/entities/revenue.entity';
import { Contact } from '../crm/entities/contact.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Revenue)
    private revenuesRepository: Repository<Revenue>,
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
  ) {}

  async getDashboardData(userId: string) {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastWeek = new Date(startOfWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Revenue KPIs
    const revenueThisWeek = await this.getTotalRevenue(userId, startOfWeek, now);
    const revenueLastWeek = await this.getTotalRevenue(userId, startOfLastWeek, startOfWeek);
    const revenueThisMonth = await this.getTotalRevenue(userId, startOfMonth, now);
    const revenueLastMonth = await this.getTotalRevenue(userId, startOfLastMonth, endOfLastMonth);

    // Customer count
    const totalCustomers = await this.contactsRepository.count({ where: { userId } });
    const customersThisMonth = await this.contactsRepository.count({
      where: {
        userId,
        createdAt: MoreThan(startOfMonth),
      },
    });

    // Tasks due today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const tasksDueToday = await this.tasksRepository.count({
      where: {
        userId,
        status: 'pending',
        dueDate: Between(today, tomorrow),
      },
    });

    // Revenue trend (last 7 days)
    const revenueTrend = await this.getRevenueTrend(userId, 7);

    // Recent tasks
    const recentTasks = await this.tasksRepository.find({
      where: { userId },
      order: { dueDate: 'ASC' },
      take: 5,
    });

    return {
      kpis: {
        revenue: {
          thisWeek: revenueThisWeek,
          thisMonth: revenueThisMonth,
          change: this.calculatePercentageChange(revenueThisWeek, revenueLastWeek),
        },
        orders: {
          count: await this.revenuesRepository.count({ where: { userId } }),
          change: 0, // Can be improved with more data
        },
        customers: {
          count: totalCustomers,
          change: customersThisMonth > 0 ? (customersThisMonth / totalCustomers) * 100 : 0,
        },
        tasksDueToday,
      },
      revenueTrend,
      recentTasks: recentTasks.map(task => ({
        id: task.id,
        title: task.title,
        dueDate: task.dueDate,
        priority: task.priority,
        status: task.status,
      })),
    };
  }

  private async getTotalRevenue(userId: string, startDate: Date, endDate: Date): Promise<number> {
    const revenues = await this.revenuesRepository.find({
      where: {
        userId,
        date: Between(startDate, endDate),
      },
    });
    return revenues.reduce((sum, r) => sum + Number(r.amount), 0);
  }

  private async getRevenueTrend(userId: string, days: number): Promise<{ date: string; amount: number }[]> {
    const trend: { date: string; amount: number }[] = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);

      const amount = await this.getTotalRevenue(userId, date, nextDay);
      trend.push({
        date: date.toISOString().split('T')[0],
        amount,
      });
    }

    return trend;
  }

  private calculatePercentageChange(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  }
}
