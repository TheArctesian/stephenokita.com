import bcrypt from 'bcryptjs';
import { db } from '$lib/db/config';
import { users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import type { User } from './session';

export async function createUser(email: string, password: string, name: string): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 12);
  
  const result = await db.insert(users).values({
    email: email.toLowerCase(),
    hashedPassword,
    name,
    isVerified: false
  }).returning({
    id: users.id,
    email: users.email,
    name: users.name,
    isVerified: users.isVerified
  });

  return result[0];
}

export async function verifyUserPassword(email: string, password: string): Promise<User | null> {
  const result = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      isVerified: users.isVerified,
      hashedPassword: users.hashedPassword
    })
    .from(users)
    .where(eq(users.email, email.toLowerCase()));

  if (result.length < 1) {
    return null;
  }

  const user = result[0];
  const validPassword = await bcrypt.compare(password, user.hashedPassword);
  
  if (!validPassword) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    isVerified: user.isVerified
  };
}

export async function getUserById(id: number): Promise<User | null> {
  const result = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      isVerified: users.isVerified
    })
    .from(users)
    .where(eq(users.id, id));

  return result.length > 0 ? result[0] : null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      isVerified: users.isVerified
    })
    .from(users)
    .where(eq(users.email, email.toLowerCase()));

  return result.length > 0 ? result[0] : null;
}