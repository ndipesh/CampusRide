import { z } from 'zod';

const CreateRideAvailabilitySchema = z.object({
  driverId: z.string(),
  pickupLocation: z.string().min(1),
  destination: z.string().min(1),
  departureTime: z.coerce.date(),
  availableSeats: z.number().int().min(1),
  notes: z.string().nullable().optional(),
});

const UpdateRideAvailabilitySchema = z.object({
  pickupLocation: z.string().min(1),
  destination: z.string().min(1),
  departureTime: z.coerce.date(),
  availableSeats: z.number().int().min(1),
  notes: z.string().nullable().optional(),
});

type CreateRideAvailabilityBody = z.infer<typeof CreateRideAvailabilitySchema>;
type UpdateRideAvailabilityBody = z.infer<typeof UpdateRideAvailabilitySchema>;

export {
  CreateRideAvailabilityBody,
  CreateRideAvailabilitySchema,
  UpdateRideAvailabilityBody,
  UpdateRideAvailabilitySchema
};

