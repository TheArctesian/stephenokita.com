import { validateSessionToken, invalidateSession, deleteSessionTokenCookie } from '$lib/auth/session';
import { jsonRoute } from '$lib/utils/api';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = jsonRoute(
  async ({ cookies }) => {
    const token = cookies.get('session');

    if (token) {
      const { session } = await validateSessionToken(token);
      if (session) {
        await invalidateSession(session.id);
      }
    }

    // Clear session cookie
    deleteSessionTokenCookie({ cookies } as any);

    return { success: true };
  },
  { label: 'Logout error:', errorMessage: 'Failed to logout' }
);
