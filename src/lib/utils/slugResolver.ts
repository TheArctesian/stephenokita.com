/**
 * Unix Philosophy: Do one thing well - resolve blog post slugs
 * Handles URL encoding/decoding and normalization
 */

export function normalizeSlug(slug: string): string {
  // Step 1: Decode URL encoding
  let normalized = decodeURIComponent(slug);
  
  // Step 2: Handle any additional normalization if needed
  // (keeping it simple for now)
  
  return normalized;
}

export function encodeSlugForUrl(slug: string): string {
  return encodeURIComponent(slug);
}

/**
 * Test if a slug can be resolved to a file
 * Returns the normalized slug if valid, null if not
 */
export async function validateSlug(slug: string): Promise<string | null> {
  try {
    const normalized = normalizeSlug(slug);
    
    // Test if we can import the file
    await import(`../../routes/blog/posts/${normalized}.md`);
    return normalized;
  } catch {
    return null;
  }
}

/**
 * Debug helper to log slug resolution steps
 */
export function debugSlug(originalSlug: string) {
  const decoded = decodeURIComponent(originalSlug);
  
  console.log('Slug Resolution Debug:', {
    original: originalSlug,
    decoded: decoded,
    encodedBack: encodeURIComponent(decoded),
    matches: originalSlug === encodeURIComponent(decoded)
  });
  
  return decoded;
}