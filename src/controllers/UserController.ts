import argon2 from 'argon2';
import { Request, Response } from 'express';
import { addUser, getUserByEmail, getUserById } from '../models/UserModel.js';
import { clearSession } from '../utils/clearSession.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import { LoginSchema, RegisterUserSchema } from '../validators/UserValidators.js';

function makeSafeUserResponse(user: {
  id: string;
  email: string;
  role: string;
  displayName: string | null;
  bio: string | null;
  createdAt: Date;
}) {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    displayName: user.displayName,
    bio: user.bio,
    createdAt: user.createdAt,
  };
}

export async function registerUser(req: Request, res: Response): Promise<void> {
  const validatedBody = RegisterUserSchema.safeParse(req.body);

  if (!validatedBody.success) {
    res.status(400).json({
      error: validatedBody.error.flatten(),
    });
    return;
  }

  const { email, password, role, displayName, bio } = validatedBody.data;

  try {
    const passwordHash = await argon2.hash(password);

    const user = await addUser({
      email,
      passwordHash,
      role,
      displayName: displayName ?? null,
      bio: bio ?? null,
    });

    res.status(201).json(makeSafeUserResponse(user));
  } catch (error) {
    const dbError = parseDatabaseError(error);
    res.status(dbError.status).json({ error: dbError.message });
  }
}

export async function loginUser(req: Request, res: Response): Promise<void> {
  const validatedBody = LoginSchema.safeParse(req.body);

  if (!validatedBody.success) {
    res.status(400).json({
      error: validatedBody.error.flatten(),
    });
    return;
  }

  const { email, password } = validatedBody.data;

  try {
    const user = await getUserByEmail(email);

    if (user === null) {
      res.status(403).json({ error: 'Invalid credentials' });
      return;
    }

    const passwordMatches = await argon2.verify(user.passwordHash, password);

    if (!passwordMatches) {
      res.status(403).json({ error: 'Invalid credentials' });
      return;
    }

    await clearSession(req);

    req.session.isLoggedIn = true;
    req.session.authenticatedUser = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({
      message: 'Login successful',
      user: makeSafeUserResponse(user),
    });
  } catch (error) {
    const dbError = parseDatabaseError(error);
    res.status(dbError.status ?? 500).json({
      error: dbError.message ?? 'Internal server error',
    });
  }
}

export async function logoutUser(req: Request, res: Response): Promise<void> {
  try {
    await clearSession(req);
    res.sendStatus(204);
  } catch {
    res.status(500).json({ error: 'Unable to log out' });
  }
}

export async function getUserProfile(req: Request, res: Response): Promise<void> {
  const userId = req.params.userId as string;

  try {
    const user = await getUserById(userId);

    if (user === null) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json(makeSafeUserResponse(user));
  } catch (error) {
    const dbError = parseDatabaseError(error);
    res.status(dbError.status ?? 500).json({
      error: dbError.message ?? 'Internal server error',
    });
  }
}
