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
import { Bank } from '../../bank/entities/bank.entities';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sendAccountNum: number;

  @Column()
  receiveAccountNum: number;

  @Column()
  receiveName: string;

  @Column()
  amount: number;

  @Column()
  content: string;

  @Column()
  sendBankId: number;

  @Column()
  receiveBankId: number;

  @Column()
  status: number;

  @Column()
  paymentType: number;

  @Column()
  type: number;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @ManyToOne(() => Bank, (bank) => bank.sendBankIds, { nullable: true })
  @JoinColumn({ name: 'sendBankId' })
  sendBank: Bank;

  @ManyToOne(() => Bank, (bank) => bank.receiveBankIds, { nullable: true })
  @JoinColumn({ name: 'receiveBankId' })
  receiveBank: Bank;

  @ManyToOne(() => Customer, (customer) => customer.sendAccountNum, {
    nullable: true,
  })
  @JoinColumn({ name: 'sendAccountNum' })
  sendAccNum: Customer;

  @ManyToOne(() => Customer, (customer) => customer.receiveAccountNum, {
    nullable: true,
  })
  @JoinColumn({ name: 'receiveAccountNum' })
  receiveAccNum: Customer;

  @BeforeInsert()
  async checkBeforeCreate() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }
}
