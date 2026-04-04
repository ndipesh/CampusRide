import { z } from "zod";

export const CreateMessageSchema = z.object({
  content: z.string().min(1).max(1000),
  senderId: z.string().uuid().optional(),
});

export type CreateMessageInput = z.infer<typeof CreateMessageSchema>;
