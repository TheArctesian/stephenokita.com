import { json } from '@sveltejs/kit';
import { verifyUserPassword } from '$lib/auth/user';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/auth/session';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { email, password } = await request.json();

    // Basic validation
    if (!email || !password) {
      return json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Verify user credentials
    const user = await verifyUserPassword(email, password);
    if (!user) {
      return json({ error: 'Invalid email or password' }, { status: 401 });
    }

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
    console.error('Login error:', error);
    return json({ error: 'Failed to login' }, { status: 500 });
  }
};