import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThan } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(userId: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      userId,
      tags: createTaskDto.tags || [],
    });
    return await this.tasksRepository.save(task);
  }

  async findAll(userId: string): Promise<Task[]> {
    return await this.tasksRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id, userId },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(id: string, userId: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id, userId);
    
    if (updateTaskDto.status === 'completed' && task.status !== 'completed') {
      task.completedAt = new Date();
    }

    Object.assign(task, updateTaskDto);
    return await this.tasksRepository.save(task);
  }

  async remove(id: string, userId: string): Promise<void> {
    const task = await this.findOne(id, userId);
    await this.tasksRepository.remove(task);
  }

  async getTasksDueToday(userId: string): Promise<Task[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return await this.tasksRepository.find({
      where: {
        userId,
        status: 'pending',
        dueDate: Between(today, tomorrow),
      },
      order: { dueDate: 'ASC' },
    });
  }

  async getStats(userId: string) {
    const tasks = await this.findAll(userId);
    const now = new Date();

    const stats = {
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'completed').length,
      pending: tasks.filter(t => t.status === 'pending').length,
      overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < now && t.status !== 'completed').length,
      dueToday: (await this.getTasksDueToday(userId)).length,
    };

    return {
      ...stats,
      completionRate: stats.total > 0 ? (stats.completed / stats.total) * 100 : 0,
    };
  }
}
