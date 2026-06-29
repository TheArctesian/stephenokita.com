import { json } from '@sveltejs/kit';
import { validateSessionToken } from '$lib/auth/session';
import { jsonRoute } from '$lib/utils/api';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = jsonRoute(
  async ({ cookies }) => {
    const token = cookies.get('session');

    if (!token) {
      return json({ error: 'No session found' }, { status: 401 });
    }

    const { session, user } = await validateSessionToken(token);

    if (!session || !user) {
      return json({ error: 'Invalid session' }, { status: 401 });
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isVerified: user.isVerified
      }
    };
  },
  { label: 'Error fetching user:', errorMessage: 'Failed to fetch user' }
);
