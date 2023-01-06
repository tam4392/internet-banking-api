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
export class CodeVerify {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  cId: number;

  @Column()
  expired: Date;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.codeVerify, {
    nullable: true,
  })
  @JoinColumn({ name: 'cId' })
  customerId: Customer;

  @BeforeInsert()
  async checkBeforeCreate() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  checkBeforeUpdate() {
    this.updatedAt = new Date();
  }
}
