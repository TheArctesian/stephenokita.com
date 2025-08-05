import { json } from '@sveltejs/kit';
import { validateSessionToken, invalidateSession, deleteSessionTokenCookie } from '$lib/auth/session';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
  try {
    const token = cookies.get('session');
    
    if (token) {
      const { session } = await validateSessionToken(token);
      if (session) {
        await invalidateSession(session.id);
      }
    }

    // Clear session cookie
    deleteSessionTokenCookie({ cookies } as any);

    return json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return json({ error: 'Failed to logout' }, { status: 500 });
  }
};