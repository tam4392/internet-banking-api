import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Customer } from '../../customer/entities/customer.entities';

@Entity()
export class Debit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sourceAccountId: number;

  @Column()
  targetAccountId: number;

  @Column()
  amount: number;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  dateRemind: Date;

  @Column()
  status: string;

  @Column()
  createdBy: string;

  @Column()
  type: number;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.sendDebitAcc, {
    nullable: true,
  })
  @JoinColumn({ name: 'sourceAccountId' })
  sourceAccount: Customer;

  @ManyToOne(() => Customer, (customer) => customer.receiveDebitAcc, {
    nullable: true,
  })
  @JoinColumn({ name: 'targetAccountId' })
  targetAccount: Customer;

  @BeforeInsert()
  async checkBeforeCreate() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  async checkBeforeUpdate() {
    this.updatedAt = new Date();
  }
}
