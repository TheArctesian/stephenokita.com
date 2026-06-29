import { db } from '$lib/db/config';
import { blogAnalytics } from '$lib/db/schema';
import { eq, sql } from 'drizzle-orm';

export async function incrementViewCount(postSlug: string): Promise<number> {
  try {
    // Upsert: insert if not exists, or update view count
    const result = await db
      .insert(blogAnalytics)
      .values({
        postSlug,
        viewCount: 1,
        uniqueVisitors: 1,
        lastViewed: new Date()
      })
      .onConflictDoUpdate({
        target: blogAnalytics.postSlug,
        set: {
          viewCount: sql`${blogAnalytics.viewCount} + 1`,
          lastViewed: new Date(),
          updatedAt: new Date()
        }
      })
      .returning({ viewCount: blogAnalytics.viewCount });

    return result[0]?.viewCount || 1;
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return 0;
  }
}

export async function getViewCount(postSlug: string): Promise<number> {
  try {
    const result = await db
      .select({ viewCount: blogAnalytics.viewCount })
      .from(blogAnalytics)
      .where(eq(blogAnalytics.postSlug, postSlug))
      .limit(1);

    return result[0]?.viewCount || 0;
  } catch (error) {
    console.error('Error getting view count:', error);
    return 0;
  }
}

export async function getAllViewCounts(): Promise<Record<string, number>> {
  try {
    const results = await db
      .select({
        postSlug: blogAnalytics.postSlug,
        viewCount: blogAnalytics.viewCount
      })
      .from(blogAnalytics);

    const viewCounts: Record<string, number> = {};
    results.forEach(row => {
      viewCounts[row.postSlug] = row.viewCount;
    });

    return viewCounts;
  } catch (error) {
    console.error('Error getting all view counts:', error);
    return {};
  }
}

export async function getAllReadingTimes(): Promise<Record<string, number>> {
  try {
    const results = await db
      .select({
        postSlug: blogAnalytics.postSlug,
        readingTime: blogAnalytics.readingTime
      })
      .from(blogAnalytics);

    const readingTimes: Record<string, number> = {};
    results.forEach(row => {
      if (row.readingTime != null) readingTimes[row.postSlug] = row.readingTime;
    });

    return readingTimes;
  } catch (error) {
    // Tolerate a missing column (pre-migration) so the posts list keeps working.
    console.error('Error getting reading times:', error);
    return {};
  }
}

/**
 * Persist computed reading times so future requests read them from the DB
 * instead of recomputing. Upserts on postSlug; safe to call with an empty list.
 */
export async function setReadingTimes(
  entries: { slug: string; readingTime: number }[]
): Promise<void> {
  if (entries.length === 0) return;
  try {
    await Promise.all(
      entries.map(({ slug, readingTime }) =>
        db
          .insert(blogAnalytics)
          .values({ postSlug: slug, readingTime })
          .onConflictDoUpdate({
            target: blogAnalytics.postSlug,
            set: { readingTime, updatedAt: new Date() }
          })
      )
    );
  } catch (error) {
    console.error('Error saving reading times:', error);
  }
}

export async function trackUniqueVisitor(postSlug: string, visitorId: string): Promise<void> {
  // This could be enhanced with a separate visitor tracking table
  // For now, we'll just increment the unique visitors count
  // In production, you'd want to track visitor IDs properly
  try {
    await db
      .update(blogAnalytics)
      .set({
        uniqueVisitors: sql`${blogAnalytics.uniqueVisitors} + 1`,
        updatedAt: new Date()
      })
      .where(eq(blogAnalytics.postSlug, postSlug));
  } catch (error) {
    console.error('Error tracking unique visitor:', error);
  }
}