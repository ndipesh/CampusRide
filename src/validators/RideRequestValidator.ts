import { z } from 'zod';

export const CreateRideRequestSchema = z.object({
  rideAvailabilityId: z.string(),
  riderId: z.string(),
});

export const UpdateRideRequestSchema = z.object({
  status: z.string(),
});

export type CreateRideRequestBody = z.infer<typeof CreateRideRequestSchema>;
export type UpdateRideRequestBody = z.infer<typeof UpdateRideRequestSchema>;
