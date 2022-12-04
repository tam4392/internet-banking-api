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
export class SuggestAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sendAccountNum: number;

  @Column()
  receiveAccountNum: number;

  @Column()
  name: string;

  @Column()
  bankId: number;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.sendSuggestAcc, {
    nullable: true,
  })
  @JoinColumn({ name: 'sendAccountNum' })
  sendSgtAcc: Customer;

  @ManyToOne(() => Customer, (customer) => customer.receiveSuggestAcc, {
    nullable: true,
  })
  @JoinColumn({ name: 'receiveAccountNum' })
  receiveSgtAcc: Customer;

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
