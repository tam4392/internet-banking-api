import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Bank } from '../../bank/entities/bank.entities';
import { Transaction } from '../../transaction/entities/transaction.entities';
import { SuggestAccount } from '../../suggest-account/entities/suggest-account.entities';
import { Debit } from '../../debit/entities/debit.entities';
import * as bcrypt from 'bcrypt';
import { CodeVerify } from '../../code-verify/entities/code-verify.entities';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountNum: string;

  @Column({ nullable: true, default: 0 })
  accountBalance: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  bankId: number;

  @Column({ nullable: true })
  dob: Date;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  refreshToken: string;

  @ManyToOne(() => Bank, (bank) => bank.customer, { nullable: true })
  @JoinColumn({ name: 'bankId' })
  bank: Bank;

  @OneToMany(() => Transaction, (transaction) => transaction.sendAccNum)
  sendAccountNum: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.receiveBank)
  receiveAccountNum: Transaction[];

  @OneToMany(() => SuggestAccount, (sgAcc) => sgAcc.sendSgtAcc)
  sendSuggestAcc: SuggestAccount[];

  @OneToMany(() => SuggestAccount, (sgAcc) => sgAcc.receiveSgtAcc)
  receiveSuggestAcc: SuggestAccount[];

  @OneToMany(() => Debit, (debit) => debit.sourceAccount)
  sendDebitAcc: Debit[];

  @OneToMany(() => Debit, (debit) => debit.targetAccount)
  receiveDebitAcc: Debit[];

  @OneToMany(() => Debit, (debit) => debit.cusCreatedBy)
  debitCreateBy: Debit[];

  @OneToMany(() => CodeVerify, (codeVerify) => codeVerify.customerId)
  codeVerify: CodeVerify[];

  @BeforeInsert()
  async checkBeforeCreate() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(this.password, salt);
    this.password = hashPass;

    const characters = '0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 13; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.accountNum = result;
  }

  @BeforeUpdate()
  async checkBeforeUpdate() {
    this.updatedAt = new Date();
    // const salt = await bcrypt.genSalt();
    // const hashPass = await bcrypt.hash(this.password, salt);
    // this.password = hashPass;
  }
}
