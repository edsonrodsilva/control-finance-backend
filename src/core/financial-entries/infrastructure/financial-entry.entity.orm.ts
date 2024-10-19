import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('financial_entries')
export class FinancialEntryOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entryType: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ length: 3 })
  currency: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  accountId: number;

  @Column({ type: 'date' })
  entry_date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({
    type: 'enum',
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  })
  status: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  subcategory: string;

  @Column('simple-array')
  tags: string[];

  @Column()
  created_by: number;
}
