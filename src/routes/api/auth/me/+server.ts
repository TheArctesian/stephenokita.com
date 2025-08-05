import { json } from '@sveltejs/kit';
import { validateSessionToken } from '$lib/auth/session';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
  try {
    const token = cookies.get('session');
    
    if (!token) {
      return json({ error: 'No session found' }, { status: 401 });
    }

    const { session, user } = await validateSessionToken(token);
    
    if (!session || !user) {
      return json({ error: 'Invalid session' }, { status: 401 });
    }

    return json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return json({ error: 'Failed to fetch user' }, { status: 500 });
  }
};