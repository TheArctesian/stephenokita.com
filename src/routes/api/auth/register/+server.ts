import { json } from '@sveltejs/kit';
import { createUser, getUserByEmail } from '$lib/auth/user';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/auth/session';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { email, password, name } = await request.json();

    // Basic validation
    if (!email || !password || !name) {
      return json({ error: 'Email, password, and name are required' }, { status: 400 });
    }

    if (password.length < 8) {
      return json({ error: 'Password must be at least 8 characters long' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return json({ error: 'User with this email already exists' }, { status: 400 });
    }

    // Create user
    const user = await createUser(email, password, name);

    // Create session
    const token = generateSessionToken();
    const session = await createSession(token, user.id);

    // Set session cookie
    setSessionTokenCookie({ cookies } as any, token, session.expiresAt);

    return json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return json({ error: 'Failed to create user' }, { status: 500 });
  }
};