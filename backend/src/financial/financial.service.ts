import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { Revenue } from './entities/revenue.entity';
import { Invoice } from './entities/invoice.entity';
import { CreateExpenseDto, UpdateExpenseDto } from './dto/expense.dto';
import { CreateRevenueDto, UpdateRevenueDto } from './dto/revenue.dto';
import { CreateInvoiceDto, UpdateInvoiceDto } from './dto/invoice.dto';

@Injectable()
export class FinancialService {
  constructor(
    @InjectRepository(Expense)
    private expensesRepository: Repository<Expense>,
    @InjectRepository(Revenue)
    private revenuesRepository: Repository<Revenue>,
    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
  ) {}

  // Expenses
  async createExpense(userId: string, createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const expense = this.expensesRepository.create({
      ...createExpenseDto,
      userId,
    });
    return await this.expensesRepository.save(expense);
  }

  async findAllExpenses(userId: string): Promise<Expense[]> {
    return await this.expensesRepository.find({
      where: { userId },
      order: { date: 'DESC' },
    });
  }

  async findOneExpense(id: string, userId: string): Promise<Expense> {
    const expense = await this.expensesRepository.findOne({
      where: { id, userId },
    });
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return expense;
  }

  async updateExpense(id: string, userId: string, updateExpenseDto: UpdateExpenseDto): Promise<Expense> {
    const expense = await this.findOneExpense(id, userId);
    Object.assign(expense, updateExpenseDto);
    return await this.expensesRepository.save(expense);
  }

  async removeExpense(id: string, userId: string): Promise<void> {
    const expense = await this.findOneExpense(id, userId);
    await this.expensesRepository.remove(expense);
  }

  async getExpensesByCategory(userId: string) {
    const expenses = await this.findAllExpenses(userId);
    const byCategory = expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += Number(expense.amount);
      return acc;
    }, {});

    return Object.entries(byCategory).map(([category, amount]) => ({
      category,
      amount,
    }));
  }

  // Revenues
  async createRevenue(userId: string, createRevenueDto: CreateRevenueDto): Promise<Revenue> {
    const revenue = this.revenuesRepository.create({
      ...createRevenueDto,
      userId,
    });
    return await this.revenuesRepository.save(revenue);
  }

  async findAllRevenues(userId: string): Promise<Revenue[]> {
    return await this.revenuesRepository.find({
      where: { userId },
      order: { date: 'DESC' },
    });
  }

  async findOneRevenue(id: string, userId: string): Promise<Revenue> {
    const revenue = await this.revenuesRepository.findOne({
      where: { id, userId },
    });
    if (!revenue) {
      throw new NotFoundException('Revenue not found');
    }
    return revenue;
  }

  async updateRevenue(id: string, userId: string, updateRevenueDto: UpdateRevenueDto): Promise<Revenue> {
    const revenue = await this.findOneRevenue(id, userId);
    Object.assign(revenue, updateRevenueDto);
    return await this.revenuesRepository.save(revenue);
  }

  async removeRevenue(id: string, userId: string): Promise<void> {
    const revenue = await this.findOneRevenue(id, userId);
    await this.revenuesRepository.remove(revenue);
  }

  // Invoices
  async createInvoice(userId: string, createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const invoiceNumber = await this.generateInvoiceNumber(userId);
    const invoice = this.invoicesRepository.create({
      ...createInvoiceDto,
      userId,
      invoiceNumber,
    });
    return await this.invoicesRepository.save(invoice);
  }

  async findAllInvoices(userId: string): Promise<Invoice[]> {
    return await this.invoicesRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOneInvoice(id: string, userId: string): Promise<Invoice> {
    const invoice = await this.invoicesRepository.findOne({
      where: { id, userId },
    });
    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }
    return invoice;
  }

  async updateInvoice(id: string, userId: string, updateInvoiceDto: UpdateInvoiceDto): Promise<Invoice> {
    const invoice = await this.findOneInvoice(id, userId);
    Object.assign(invoice, updateInvoiceDto);
    return await this.invoicesRepository.save(invoice);
  }

  async removeInvoice(id: string, userId: string): Promise<void> {
    const invoice = await this.findOneInvoice(id, userId);
    await this.invoicesRepository.remove(invoice);
  }

  private async generateInvoiceNumber(userId: string): Promise<string> {
    const count = await this.invoicesRepository.count({ where: { userId } });
    const year = new Date().getFullYear();
    return `INV-${year}-${String(count + 1).padStart(4, '0')}`;
  }

  async getFinancialReport(userId: string, startDate: Date, endDate: Date) {
    const expenses = await this.expensesRepository.find({
      where: {
        userId,
        date: Between(startDate, endDate),
      },
    });

    const revenues = await this.revenuesRepository.find({
      where: {
        userId,
        date: Between(startDate, endDate),
      },
    });

    const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const totalRevenue = revenues.reduce((sum, r) => sum + Number(r.amount), 0);
    const profit = totalRevenue - totalExpenses;

    return {
      startDate,
      endDate,
      totalRevenue,
      totalExpenses,
      profit,
      profitMargin: totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0,
      expensesByCategory: await this.getExpensesByCategory(userId),
    };
  }
}
