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
import { DEBIT_STATUS_NOT_PAID } from '../dto/debit.dto';

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
  status: number;

  @Column()
  createdBy: number;

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

  @ManyToOne(() => Customer, (customer) => customer.debitCreateBy, {
    nullable: true,
  })
  @JoinColumn({ name: 'createdBy' })
  cusCreatedBy: Customer;

  @BeforeInsert()
  async checkBeforeCreate() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.status = DEBIT_STATUS_NOT_PAID;
  }

  @BeforeUpdate()
  async checkBeforeUpdate() {
    this.updatedAt = new Date();
  }
}
