import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  user: User;

  @Column({ nullable: true })
  contactId: string;

  @Column({ nullable: true })
  leadId: string;

  @Column({ type: 'enum', enum: ['note', 'email', 'call', 'meeting'] })
  type: string;

  @Column()
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @CreateDateColumn()
  createdAt: Date;
}
