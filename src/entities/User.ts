import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { Message } from './Message.js';

export type UserRole = 'user' | 'admin';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id!: string;

  @BeforeInsert()
  addId(): void {
    this.id = uuidv7();
  }

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column({ default: 'user' })
  role!: UserRole;

  @Column({ nullable: true })
  displayName!: string | null;

  @Column({ nullable: true, type: 'text' })
  bio!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Message, (message) => message.sender)
  messages!: Relation<Message[]>;
}
