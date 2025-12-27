import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialController } from './financial.controller';
import { FinancialService } from './financial.service';
import { Expense } from './entities/expense.entity';
import { Revenue } from './entities/revenue.entity';
import { Invoice } from './entities/invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, Revenue, Invoice])],
  controllers: [FinancialController],
  providers: [FinancialService],
  exports: [FinancialService],
})
export class FinancialModule {}
