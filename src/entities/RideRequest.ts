import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { RideAvailability } from './RideAvailability.js';
import { User } from './User.js';

@Entity()
export class RideRequest {
  @PrimaryColumn()
  rideRequestId: string;

  @BeforeInsert()
  generateId(): void {
    this.rideRequestId = uuidv7();
  }

  @Column()
  rideAvailabilityId: string;

  @ManyToOne(() => RideAvailability)
  rideAvailability: Relation<RideAvailability>;

  @Column()
  riderId: string;

  @ManyToOne(() => User)
  rider: Relation<User>;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
