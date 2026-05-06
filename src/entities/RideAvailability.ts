import {
  BeforeInsert,
  Check,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { User } from './User.js';

@Entity()
@Check(`"availableSeats" >= 1`)
export class RideAvailability {
  @PrimaryColumn()
  rideAvailabilityId: string;

  @BeforeInsert()
  generateId(): void {
    this.rideAvailabilityId = uuidv7();
  }

  @Column()
  driverId: string;

  @ManyToOne(() => User)
  driver: Relation<User>;

  @Column()
  pickupLocation: string;

  @Column()
  destination: string;

  @Column({ type: 'timestamptz' })
  departureTime: Date;

  @Column({ default: 1 })
  availableSeats: number;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ default: 'open' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
