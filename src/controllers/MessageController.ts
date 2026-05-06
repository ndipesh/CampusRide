import { Request, Response } from 'express';
import { addMessage, getMessages } from '../models/MessageModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import { CreateMessageSchema } from '../validators/MessageValidators.js';

function makeSafeMessageResponse(message: any) {
  return {
    id: message.id,
    content: message.content,
    createdAt: message.createdAt,
    senderId: message.senderId,
    sender: message.sender
      ? {
          id: message.sender.id,
          email: message.sender.email,
          role: message.sender.role,
          displayName: message.sender.displayName,
          bio: message.sender.bio,
          createdAt: message.sender.createdAt,
        }
      : null,
  };
}

export async function createMessage(req: Request, res: Response): Promise<void> {
  const validatedBody = CreateMessageSchema.safeParse(req.body);

  if (!validatedBody.success) {
    res.status(400).json({
      error: validatedBody.error.flatten(),
    });
    return;
  }

  try {
    const message = await addMessage({
      content: validatedBody.data.content,
      senderId: validatedBody.data.senderId,
    });

    res.status(201).json(makeSafeMessageResponse(message));
  } catch (error) {
    const dbError = parseDatabaseError(error);
    res.status(dbError.status).json({ error: dbError.message });
  }
}

export async function getAllMessages(req: Request, res: Response): Promise<void> {
  try {
    const messages = await getMessages();
    res.status(200).json(messages.map(makeSafeMessageResponse));
  } catch (error) {
    const dbError = parseDatabaseError(error);
    res.status(dbError.status).json({ error: dbError.message });
  }
}
