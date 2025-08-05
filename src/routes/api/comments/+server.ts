import { json } from '@sveltejs/kit';
import { db } from '$lib/db/config';
import { comments, users } from '$lib/db/schema';
import { validateSessionToken } from '$lib/auth/session';
import { eq, and, isNull, desc } from 'drizzle-orm';
import type { RequestHandler } from './$types';

// Get comments for a specific blog post
export const GET: RequestHandler = async ({ url }) => {
  try {
    const postSlug = url.searchParams.get('postSlug');
    
    if (!postSlug) {
      return json({ error: 'Post slug is required' }, { status: 400 });
    }

    // Get all approved comments for the post with user information
    const result = await db
      .select({
        comment: {
          id: comments.id,
          content: comments.content,
          createdAt: comments.createdAt,
          parentId: comments.parentId
        },
        author: {
          name: comments.authorName,
          email: comments.authorEmail
        }
      })
      .from(comments)
      .where(
        and(
          eq(comments.postSlug, postSlug),
          eq(comments.isApproved, true),
          eq(comments.isDeleted, false)
        )
      )
      .orderBy(desc(comments.createdAt));

    // Transform to nested structure
    const commentMap = new Map();
    const topLevelComments = [];

    // First pass: create all comments
    result.forEach(row => {
      const comment = {
        id: row.comment.id,
        content: row.comment.content,
        author: row.author,
        createdAt: row.comment.createdAt,
        parentId: row.comment.parentId,
        replies: []
      };
      commentMap.set(comment.id, comment);
    });

    // Second pass: organize into tree structure
    result.forEach(row => {
      const comment = commentMap.get(row.comment.id);
      if (comment.parentId) {
        const parent = commentMap.get(comment.parentId);
        if (parent) {
          parent.replies.push(comment);
        }
      } else {
        topLevelComments.push(comment);
      }
    });

    return json({ comments: topLevelComments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
};

// Create a new comment
export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { postSlug, content, parentId } = await request.json();

    // Basic validation
    if (!postSlug || !content) {
      return json({ error: 'Post slug and content are required' }, { status: 400 });
    }

    if (content.trim().length < 3) {
      return json({ error: 'Comment must be at least 3 characters long' }, { status: 400 });
    }

    // Check authentication
    const token = cookies.get('session');
    if (!token) {
      return json({ error: 'Authentication required' }, { status: 401 });
    }

    const { session, user } = await validateSessionToken(token);
    if (!session || !user) {
      return json({ error: 'Invalid session' }, { status: 401 });
    }

    // Validate parent comment if provided
    if (parentId) {
      const parentComment = await db
        .select({ id: comments.id })
        .from(comments)
        .where(
          and(
            eq(comments.id, parentId),
            eq(comments.postSlug, postSlug),
            eq(comments.isDeleted, false)
          )
        );
      
      if (parentComment.length === 0) {
        return json({ error: 'Parent comment not found' }, { status: 400 });
      }
    }

    // Create comment
    const newComment = await db.insert(comments).values({
      postSlug,
      userId: user.id,
      authorName: user.name,
      authorEmail: user.email,
      content: content.trim(),
      parentId: parentId || null,
      isApproved: true // Auto-approve for now, could add moderation later
    }).returning({
      id: comments.id,
      content: comments.content,
      createdAt: comments.createdAt,
      parentId: comments.parentId
    });

    return json({
      comment: {
        ...newComment[0],
        author: {
          name: user.name,
          email: user.email
        },
        replies: []
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return json({ error: 'Failed to create comment' }, { status: 500 });
  }
};