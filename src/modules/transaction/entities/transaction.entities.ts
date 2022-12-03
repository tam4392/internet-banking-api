import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity()
export class Bank {
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
