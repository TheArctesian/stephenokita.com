<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade, slide } from "svelte/transition";
  import Icon from "@iconify/svelte";
  import type { Comment } from "$lib/services/comments";

  export let comment: Comment;
  export let user: any = null;
  export let depth = 0;
  export let postSlug: string;

  const dispatch = createEventDispatcher();
  const maxDepth = 3; // Limit nesting depth

  let showReplyForm = false;
  let replyContent = "";
  let replyName = "";
  let submittingReply = false;

  function formatDate(date: Date): string {
    const dateStr = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));

    const timeStr = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));

    return `${dateStr} at ${timeStr}`;
  }

  function handleReply() {
    showReplyForm = !showReplyForm;
  }

  async function submitReply() {
    if (!replyContent.trim()) return;

    // For anonymous users, require a name
    if (!user && !replyName.trim()) {
      alert("Please enter your name to reply");
      return;
    }

    submittingReply = true;
    try {
      const body: any = {
        postSlug,
        content: replyContent.trim(),
        parentId: comment.id,
      };

      // Add author name for anonymous users
      if (!user) {
        body.authorName = replyName.trim();
      }

      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        replyContent = "";
        replyName = "";
        showReplyForm = false;
        dispatch("replySubmitted"); // Notify parent to reload comments
      } else {
        const error = await response.json();
        console.error("Reply submission failed:", error);
        alert(`Failed to submit reply: ${error.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Failed to submit reply:", error);
      alert("Failed to submit reply. Please try again.");
    } finally {
      submittingReply = false;
    }
  }

  function cancelReply() {
    showReplyForm = false;
    replyContent = "";
    replyName = "";
  }
</script>

<div class="comment-item" class:nested={depth > 0} in:fade>
  <div class="comment-header">
    <div class="comment-meta">
      <span class="comment-author">{comment.author.name}</span>
      <div class="comment-date">
        <span class="date"
          >{formatDate(comment.createdAt).split(" at ")[0]}</span
        >
        <span class="time"
          >{formatDate(comment.createdAt).split(" at ")[1] || ""}</span
        >
      </div>
    </div>
  </div>

  <div class="comment-body">
    <div class="comment-content">
      <p>{comment.content}</p>
    </div>

    {#if depth < maxDepth}
      <button
        class="reply-icon-button"
        on:click={handleReply}
        aria-label="Reply to comment"
      >
        <Icon icon="heroicons:arrow-uturn-left" width="18" height="18" />
      </button>
    {/if}
  </div>

  {#if showReplyForm}
    <div class="reply-form" in:slide out:slide>
      <div class="reply-form-header">
        <span>Reply to {comment.author.name}</span>
      </div>

      {#if !user}
        <label for="reply-name-{comment.id}" class="sr-only">Your name</label>
        <input
          id="reply-name-{comment.id}"
          type="text"
          bind:value={replyName}
          placeholder="Your name or ¬"
          class="reply-name-input"
          disabled={submittingReply}
          maxlength="50"
        />
      {/if}

      <label for="reply-content-{comment.id}" class="sr-only">Your reply</label>
      <textarea
        id="reply-content-{comment.id}"
        bind:value={replyContent}
        placeholder="Write your reply..."
        rows="3"
        class="reply-textarea"
        disabled={submittingReply}
      ></textarea>

      <div class="reply-form-actions">
        <button
          class="cancel-button"
          on:click={cancelReply}
          disabled={submittingReply}
        >
          Cancel
        </button>
        <button
          class="submit-button"
          on:click={submitReply}
          disabled={!replyContent.trim() ||
            (!user && !replyName.trim()) ||
            submittingReply}
        >
          {#if submittingReply}
            Posting...
          {:else}
            Post Reply
          {/if}
        </button>
      </div>
    </div>
  {/if}

  {#if comment.replies && comment.replies.length > 0}
    <div class="comment-replies">
      {#each comment.replies as reply (reply.id)}
        <svelte:self
          comment={reply}
          {user}
          {postSlug}
          depth={depth + 1}
          on:replySubmitted
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

  .comment-body {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-md);
  }

  .comment-content {
    flex: 1;
    line-height: 1.6;
  }

  .comment-content p {
    color: var(--text-primary);
    margin: 0;
    word-wrap: break-word;
  }

  .reply-icon-button {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: var(--space-xs);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);
    flex-shrink: 0;
    margin-top: 2px;
  }

  .reply-icon-button:hover {
    color: var(--text-primary);
    background: var(--bg-tertiary);
  }

  .comment-replies {
    margin-top: var(--space-md);
  }

  .reply-form {
    margin-top: var(--space-md);
    padding: var(--space-md);
    background: var(--bg-primary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
  }

  .reply-form-header {
    margin-bottom: var(--space-sm);
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
  }

  .reply-name-input {
    width: 100%;
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: var(--space-sm) var(--space-md);
    color: var(--text-primary);
    font-family: inherit;
    font-size: var(--font-size-sm);
    margin-bottom: var(--space-sm);
  }

  .reply-name-input:focus {
    outline: none;
    border-color: var(--border-primary);
  }

  .reply-textarea {
    width: 100%;
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: var(--space-sm) var(--space-md);
    color: var(--text-primary);
    font-family: inherit;
    font-size: var(--font-size-sm);
    resize: vertical;
    min-height: 80px;
  }

  .reply-textarea:focus {
    outline: none;
    border-color: var(--border-primary);
  }

  .reply-form-actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-sm);
    margin-top: var(--space-sm);
  }

  .cancel-button {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: var(--space-xs) var(--space-md);
    font-size: var(--font-size-sm);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .cancel-button:hover:not(:disabled) {
    background: var(--bg-secondary);
    border-color: var(--accent-primary);
  }

  .cancel-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .submit-button {
    background: var(--accent-primary);
    color: var(--bg-primary);
    border: none;
    border-radius: var(--radius-md);
    padding: var(--space-xs) var(--space-md);
    font-size: var(--font-size-sm);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .submit-button:hover:not(:disabled) {
    background: var(--accent-cyan);
    transform: translateY(-1px);
  }

  .submit-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .comment-item.nested {
      margin-left: var(--space-md);
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>

