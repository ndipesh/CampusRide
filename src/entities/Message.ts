import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { User } from './User.js';

@Entity()
export class Message {
  @PrimaryColumn('uuid')
  id!: string;

  @BeforeInsert()
  addId(): void {
    this.id = uuidv7();
  }

  @Column({ type: 'text' })
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column('uuid')
  senderId!: string;

  @ManyToOne(() => User, (user) => user.messages, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'senderId' })
  sender!: Relation<User>;
}
