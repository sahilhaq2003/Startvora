import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FinancialService } from './financial.service';
import { CreateExpenseDto, UpdateExpenseDto } from './dto/expense.dto';
import { CreateRevenueDto, UpdateRevenueDto } from './dto/revenue.dto';
import { CreateInvoiceDto, UpdateInvoiceDto } from './dto/invoice.dto';

@Controller('financial')
@UseGuards(JwtAuthGuard)
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  // Expenses
  @Post('expenses')
  createExpense(@Request() req, @Body() createExpenseDto: CreateExpenseDto) {
    return this.financialService.createExpense(req.user.userId, createExpenseDto);
  }

  @Get('expenses')
  findAllExpenses(@Request() req) {
    return this.financialService.findAllExpenses(req.user.userId);
  }

  @Get('expenses/by-category')
  getExpensesByCategory(@Request() req) {
    return this.financialService.getExpensesByCategory(req.user.userId);
  }

  @Get('expenses/:id')
  findOneExpense(@Request() req, @Param('id') id: string) {
    return this.financialService.findOneExpense(id, req.user.userId);
  }

  @Put('expenses/:id')
  updateExpense(@Request() req, @Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.financialService.updateExpense(id, req.user.userId, updateExpenseDto);
  }

  @Delete('expenses/:id')
  removeExpense(@Request() req, @Param('id') id: string) {
    return this.financialService.removeExpense(id, req.user.userId);
  }

  // Revenues
  @Post('revenues')
  createRevenue(@Request() req, @Body() createRevenueDto: CreateRevenueDto) {
    return this.financialService.createRevenue(req.user.userId, createRevenueDto);
  }

  @Get('revenues')
  findAllRevenues(@Request() req) {
    return this.financialService.findAllRevenues(req.user.userId);
  }

  @Get('revenues/:id')
  findOneRevenue(@Request() req, @Param('id') id: string) {
    return this.financialService.findOneRevenue(id, req.user.userId);
  }

  @Put('revenues/:id')
  updateRevenue(@Request() req, @Param('id') id: string, @Body() updateRevenueDto: UpdateRevenueDto) {
    return this.financialService.updateRevenue(id, req.user.userId, updateRevenueDto);
  }

  @Delete('revenues/:id')
  removeRevenue(@Request() req, @Param('id') id: string) {
    return this.financialService.removeRevenue(id, req.user.userId);
  }

  // Invoices
  @Post('invoices')
  createInvoice(@Request() req, @Body() createInvoiceDto: CreateInvoiceDto) {
    return this.financialService.createInvoice(req.user.userId, createInvoiceDto);
  }

  @Get('invoices')
  findAllInvoices(@Request() req) {
    return this.financialService.findAllInvoices(req.user.userId);
  }

  @Get('invoices/:id')
  findOneInvoice(@Request() req, @Param('id') id: string) {
    return this.financialService.findOneInvoice(id, req.user.userId);
  }

  @Put('invoices/:id')
  updateInvoice(@Request() req, @Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.financialService.updateInvoice(id, req.user.userId, updateInvoiceDto);
  }

  @Delete('invoices/:id')
  removeInvoice(@Request() req, @Param('id') id: string) {
    return this.financialService.removeInvoice(id, req.user.userId);
  }

  // Reports
  @Get('reports/summary')
  getFinancialReport(
    @Request() req,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.financialService.getFinancialReport(
      req.user.userId,
      new Date(startDate),
      new Date(endDate),
    );
  }
}
