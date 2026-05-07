import { get } from '$lib/api';

interface User {
  userId: string;
  email: string;
  role: string;
}

let user: User | null = $state(null);

export function getUser(): User | null {
  return user;
}

export function setUser(newUser: User | null): void {
  user = newUser;
}

export async function fetchUser(): Promise<void> {
  const result = await get<User>('/api/me');
  if (result.ok) {
    user = result.data;
  } else {
    user = null;
  }
}