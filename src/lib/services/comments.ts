import { db } from '$lib/db/config';
import { comments } from '$lib/db/schema';
import { eq, and, desc } from 'drizzle-orm';

export interface Comment {
  id: number;
  content: string;
  author: {
    name: string;
    email: string;
  };
  createdAt: Date;
  parentId: number | null;
  replies: Comment[];
}

export class CommentsService {
  static async getCommentsForPost(postSlug: string): Promise<Comment[]> {
    const result = await db
      .select({
        id: comments.id,
        content: comments.content,
        authorName: comments.authorName,
        authorEmail: comments.authorEmail,
        createdAt: comments.createdAt,
        parentId: comments.parentId
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
    const commentMap = new Map<number, Comment>();
    const topLevelComments: Comment[] = [];

    // First pass: create all comments
    result.forEach(row => {
      const comment: Comment = {
        id: row.id,
        content: row.content,
        author: {
          name: row.authorName,
          email: row.authorEmail
        },
        createdAt: row.createdAt,
        parentId: row.parentId,
        replies: []
      };
      commentMap.set(comment.id, comment);
    });

    // Second pass: organize into tree structure
    result.forEach(row => {
      const comment = commentMap.get(row.id);
      if (comment) {
        if (comment.parentId) {
          const parent = commentMap.get(comment.parentId);
          if (parent) {
            parent.replies.push(comment);
          }
        } else {
          topLevelComments.push(comment);
        }
      }
    });

    return topLevelComments;
  }

  static async createComment(
    postSlug: string,
    userId: number,
    authorName: string,
    authorEmail: string,
    content: string,
    parentId?: number
  ): Promise<Comment> {
    const result = await db.insert(comments).values({
      postSlug,
      userId,
      authorName,
      authorEmail,
      content,
      parentId: parentId || null,
      isApproved: true
    }).returning({
      id: comments.id,
      content: comments.content,
      createdAt: comments.createdAt,
      parentId: comments.parentId
    });

    return {
      ...result[0],
      author: {
        name: authorName,
        email: authorEmail
      },
      replies: []
    };
  }

  static async getCommentCount(postSlug: string): Promise<number> {
    const result = await db
      .select({ count: comments.id })
      .from(comments)
      .where(
        and(
          eq(comments.postSlug, postSlug),
          eq(comments.isApproved, true),
          eq(comments.isDeleted, false)
        )
      );

    return result.length;
  }
}