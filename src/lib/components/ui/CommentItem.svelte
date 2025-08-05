<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import type { Comment } from '$lib/services/comments';

  export let comment: Comment;
  export let user: any = null;
  export let depth = 0;

  const dispatch = createEventDispatcher();
  const maxDepth = 3; // Limit nesting depth

  function formatDate(date: Date): string {
    const dateStr = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
    
    const timeStr = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
    
    return `${dateStr} at ${timeStr}`;
  }

  function handleReply() {
    dispatch('reply', comment.id);
  }
</script>

<div class="comment-item" class:nested={depth > 0} in:fade>
  <div class="comment-header">
    <div class="comment-meta">
      <span class="comment-author">{comment.author.name}</span>
      <div class="comment-date">
        <span class="date">{formatDate(comment.createdAt).split(' at ')[0]}</span>
        <span class="time">{formatDate(comment.createdAt).split(' at ')[1] || ''}</span>
      </div>
    </div>
  </div>

  <div class="comment-content">
    <p>{comment.content}</p>
  </div>

  <div class="comment-actions">
    {#if user && depth < maxDepth}
      <button class="reply-button" on:click={handleReply}>
        Reply
      </button>
    {/if}
  </div>

  {#if comment.replies && comment.replies.length > 0}
    <div class="comment-replies">
      {#each comment.replies as reply (reply.id)}
        <svelte:self 
          comment={reply} 
          {user}
          depth={depth + 1}
          on:reply
        />
      {/each}
    </div>
  {/if}
</div>

<style>
  .comment-item {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: var(--space-md);
    transition: all var(--transition-fast);
  }

  .comment-item:hover {
    border-color: var(--border-accent);
  }

  .comment-item.nested {
    margin-left: var(--space-lg);
    margin-top: var(--space-md);
    border-left: 3px solid var(--accent-primary);
    background: var(--bg-primary);
  }

  .comment-header {
    margin-bottom: var(--space-sm);
  }

  .comment-meta {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    font-size: var(--font-size-sm);
  }

  .comment-author {
    color: var(--text-primary);
    font-weight: 600;
    font-size: var(--font-size-base);
  }

  .comment-date {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: var(--text-tertiary);
    font-size: var(--font-size-xs);
    line-height: 1.4;
  }
  
  .comment-date .date {
    margin-bottom: 2px;
  }

  .comment-content {
    margin-bottom: var(--space-sm);
    line-height: 1.6;
  }

  .comment-content p {
    color: var(--text-primary);
    margin: 0;
    word-wrap: break-word;
  }

  .comment-actions {
    display: flex;
    gap: var(--space-sm);
  }

  .reply-button {
    background: var(--accent-primary);
    color: var(--bg-primary);
    border: none;
    border-radius: var(--radius-md);
    padding: var(--space-sm) var(--space-lg);
    font-size: var(--font-size-sm);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .reply-button:hover {
    background: var(--accent-cyan);
    transform: translateY(-1px);
  }

  .comment-replies {
    margin-top: var(--space-md);
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .comment-item.nested {
      margin-left: var(--space-md);
    }
  }
</style>