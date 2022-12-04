import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Customer } from '../../customer/entities/customer.entities';
import { Transaction } from '../../transaction/entities/transaction.entities';

@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @BeforeInsert()
  async checkBeforeCreate() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @OneToOne(() => Customer, (customer) => customer.bank)
  customer: Customer[];

  @OneToMany(() => Transaction, (transaction) => transaction.sendBank)
  sendBankIds: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.receiveBank)
  receiveBankIds: Transaction[];

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }
}
