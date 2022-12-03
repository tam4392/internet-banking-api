import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

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
  type: string;

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
