import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Task } from '../tasks/entities/task.entity';
import { Revenue } from '../financial/entities/revenue.entity';
import { Contact } from '../crm/entities/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Revenue, Contact])],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
