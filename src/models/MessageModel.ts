import { AppDataSource } from '../dataSource.js';
import { Message } from '../entities/Message.js';

const messageRepository = AppDataSource.getRepository(Message);

export interface CreateMessageInput {
  content: string;
  senderId: string;
}

async function addMessage({ content, senderId }: CreateMessageInput): Promise<Message> {
  const message = messageRepository.create({
    content,
    senderId,
  });

  return await messageRepository.save(message);
}

async function getMessages(): Promise<Message[]> {
  return await messageRepository.find({
    relations: {
      sender: true,
    },
    order: {
      createdAt: 'DESC',
    },
  });
}

async function getMessageById(messageId: string): Promise<Message | null> {
  return await messageRepository.findOne({
    where: { id: messageId },
    relations: {
      sender: true,
    },
  });
}

export { addMessage, getMessageById, getMessages };
