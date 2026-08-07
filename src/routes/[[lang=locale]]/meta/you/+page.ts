import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

// The "Browser Detective" was folded into the unified /meta page.
// Keep the old URL working by sending visitors there.
export const load: PageLoad = () => {
  throw redirect(308, '/meta');
};
