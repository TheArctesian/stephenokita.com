import { json, type RequestEvent } from '@sveltejs/kit';

/**
 * Wraps a SvelteKit request handler with the boilerplate every endpoint
 * repeated by hand: run the handler, JSON-encode its result, and on an
 * unexpected throw log it and return a uniform error response.
 *
 * The handler may return either:
 *  - a plain value  → serialized with `json()` (status 200), or
 *  - a `Response`    → returned as-is (use this for early validation exits,
 *                      custom status codes like 201, or bespoke bodies).
 *
 * This keeps each endpoint to its actual logic while centralizing the
 * try/catch, logging, and error shape. Behaviour is identical to the
 * hand-written version — `onError` covers the few endpoints whose fallback
 * depends on the request (e.g. an empty array vs. null vs. a slug echo).
 */
interface RouteOptions {
  /** Prefix passed to `console.error` on an unhandled throw (include the colon). */
  label: string;
  /** Body for the default error response: `{ error: errorMessage }`. */
  errorMessage?: string;
  /** Status for the default error response (default 500). */
  errorStatus?: number;
  /** Full custom error response; receives the event so it can read the request. */
  onError?: (event: RequestEvent, error: unknown) => Response;
}

type RouteHandler = (event: RequestEvent) => unknown;

export function jsonRoute(handler: RouteHandler, options: RouteOptions) {
  return async (event: RequestEvent): Promise<Response> => {
    try {
      const result = await handler(event);
      return result instanceof Response ? result : json(result);
    } catch (error) {
      console.error(options.label, error);
      if (options.onError) return options.onError(event, error);
      return json(
        { error: options.errorMessage ?? 'Internal server error' },
        { status: options.errorStatus ?? 500 }
      );
    }
  };
}
