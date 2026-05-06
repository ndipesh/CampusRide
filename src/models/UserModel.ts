import { AppDataSource } from '../dataSource.js';
import { User, UserRole } from '../entities/User.js';

const userRepository = AppDataSource.getRepository(User);

export interface CreateUserInput {
  email: string;
  passwordHash: string;
  role?: UserRole;
  displayName?: string | null;
  bio?: string | null;
}

async function addUser({
  email,
  passwordHash,
  role = 'user',
  displayName = null,
  bio = null,
}: CreateUserInput): Promise<User> {
  const user = userRepository.create({
    email,
    passwordHash,
    role,
    displayName,
    bio,
  });

  return await userRepository.save(user);
}

async function getUserByEmail(email: string): Promise<User | null> {
  return await userRepository.findOne({
    where: { email },
  });
}

async function getUserById(userId: string): Promise<User | null> {
  return await userRepository.findOne({
    where: { id: userId },
    relations: {
      messages: true,
    },
  });
}

async function getAllUsers(): Promise<User[]> {
  return await userRepository.find({
    order: {
      createdAt: 'DESC',
    },
  });
}

export { addUser, getAllUsers, getUserByEmail, getUserById };
