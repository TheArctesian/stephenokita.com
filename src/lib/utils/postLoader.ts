/**
 * Unix Philosophy: Do one thing well - load blog posts
 * Simple, focused post loading with clear error handling
 */

import type { Post } from '$lib/types';
import { normalizeSlug, debugSlug } from './slugResolver';

export interface PostLoadResult {
  success: boolean;
  post?: any;
  metadata?: Post;
  error?: string;
  slug?: string;
}

/**
 * Load a single blog post by slug
 * Returns detailed result with success/failure info
 */
export async function loadPost(slug: string): Promise<PostLoadResult> {
  try {
    // Step 1: Normalize the slug
    const normalizedSlug = normalizeSlug(slug);
    
    // Step 2: Debug what we're trying to load
    debugSlug(slug);
    
    // Step 3: Attempt to load the post
    console.log(`Attempting to load: ../posts/${normalizedSlug}.md`);
    
    const post = await import(`../../routes/blog/posts/${normalizedSlug}.md`);
    
    // Step 4: Validate the post has required properties
    if (!post.default || !post.metadata) {
      throw new Error('Post missing required properties');
    }
    
    return {
      success: true,
      post: post.default,
      metadata: { ...post.metadata, slug: normalizedSlug },
      slug: normalizedSlug
    };
    
  } catch (error) {
    console.error('Post loading failed:', {
      originalSlug: slug,
      normalizedSlug: normalizeSlug(slug),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      slug: normalizeSlug(slug)
    };
  }
}

/**
 * Test if a post exists without fully loading it
 */
export async function postExists(slug: string): Promise<boolean> {
  try {
    const normalizedSlug = normalizeSlug(slug);
    await import(`../../routes/blog/posts/${normalizedSlug}.md`);
    return true;
  } catch {
    return false;
  }
}