<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import AuthForm from './AuthForm.svelte';
  import CommentItem from './CommentItem.svelte';
  import type { Comment } from '$lib/services/comments';

  export let postSlug: string;

  let comments: Comment[] = [];
  let user: any = null;
  let loading = true;
  let showAuthForm = false;
  let newCommentContent = '';
  let submittingComment = false;
  let replyingTo: number | null = null;

  onMount(async () => {
    await loadComments();
    await checkAuth();
    loading = false;
  });

  async function loadComments() {
    try {
      const response = await fetch(`/api/comments?postSlug=${encodeURIComponent(postSlug)}`);
      if (response.ok) {
        const data = await response.json();
        comments = data.comments;
      }
    } catch (error) {
      console.error('Failed to load comments:', error);
    }
  }

  async function checkAuth() {
    try {
      // Check if user is logged in by trying to fetch user info
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        user = data.user;
      }
    } catch (error) {
      // User not logged in, that's fine
    }
  }

  async function handleLogin(event: CustomEvent) {
    user = event.detail;
    showAuthForm = false;
  }

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      user = null;
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  async function submitComment() {
    if (!newCommentContent.trim() || !user) return;

    submittingComment = true;
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postSlug,
          content: newCommentContent.trim(),
          parentId: replyingTo
        })
      });

      if (response.ok) {
        newCommentContent = '';
        replyingTo = null;
        await loadComments(); // Reload comments
      } else {
        const error = await response.json();
        console.error('Comment submission failed:', error);
        alert(`Failed to submit comment: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      submittingComment = false;
    }
  }

  function handleReply(commentId: number) {
    replyingTo = commentId;
    // Focus the comment input (you could scroll to it too)
  }

  function cancelReply() {
    replyingTo = null;
  }
</script>

<section class="comments-section">
  <div class="comments-header">
    <h3 class="comments-title">
      Comments ({comments.length})
    </h3>
  </div>

  {#if loading}
    <div class="loading" in:fade>
      <div class="spinner"></div>
      <span>Loading comments...</span>
    </div>
  {:else}
    <!-- Comment Form -->
    <div class="comment-form">
      {#if user}
        <div class="user-info">
          <span class="user-name">Commenting as <strong>{user.name}</strong></span>
          <button class="logout-button" on:click={handleLogout}>Logout</button>
        </div>
        
        {#if replyingTo}
          <div class="reply-indicator" in:slide>
            <span>Replying to comment</span>
            <button class="cancel-reply" on:click={cancelReply}>Cancel</button>
          </div>
        {/if}

        <div class="comment-input">
          <textarea
            bind:value={newCommentContent}
            placeholder="Share your thoughts..."
            rows="4"
            disabled={submittingComment}
          ></textarea>
          <div class="comment-actions">
            <button 
              class="submit-comment"
              on:click={submitComment}
              disabled={!newCommentContent.trim() || submittingComment}
            >
              {#if submittingComment}
                <span class="spinner small"></span>
                Posting...
              {:else}
                Post Comment
              {/if}
            </button>
          </div>
        </div>
      {:else}
        <div class="auth-prompt">
          {#if showAuthForm}
            <div in:slide>
              <AuthForm on:success={handleLogin} />
              <button class="cancel-auth" on:click={() => showAuthForm = false}>
                Cancel
              </button>
            </div>
          {:else}
            <div class="login-prompt" in:fade>
              <p>Join the conversation!</p>
              <button class="show-auth" on:click={() => showAuthForm = true}>
                Sign in to comment
              </button>
            </div>
          {/if}
        </div>
      {/if}
    </div>

    <!-- Comments List -->
    <div class="comments-list">
      {#if comments.length > 0}
        {#each comments as comment (comment.id)}
          <CommentItem 
            {comment} 
            {user}
            on:reply={(e) => handleReply(e.detail)}
          />
        {/each}
      {:else}
        <div class="no-comments" in:fade>
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      {/if}
    </div>
  {/if}
</section>

<style>
  .comments-section {
    margin-top: var(--space-xl);
    padding-top: var(--space-lg);
    border-top: 1px solid var(--border-primary);
  }

  .comments-header {
    margin-bottom: var(--space-lg);
  }

  .comments-title {
    color: var(--text-primary);
    font-size: var(--font-size-lg);
    font-weight: 500;
    margin: 0;
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    padding: var(--space-xl);
    color: var(--text-secondary);
  }

  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid var(--border-primary);
    border-top: 2px solid var(--accent-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .spinner.small {
    width: 16px;
    height: 16px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .comment-form {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-lg);
    padding: var(--space-md);
    margin-bottom: var(--space-lg);
  }

  .user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-md);
    font-size: var(--font-size-sm);
  }

  .user-name {
    color: var(--text-secondary);
  }

  .logout-button {
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

  .logout-button:hover {
    background: var(--accent-cyan);
    transform: translateY(-1px);
  }

  .reply-indicator {
    background: var(--bg-tertiary);
    border-radius: var(--radius-md);
    padding: var(--space-sm) var(--space-md);
    margin-bottom: var(--space-md);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
  }

  .cancel-reply {
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
  
  .cancel-reply:hover {
    background: var(--bg-secondary);
    border-color: var(--accent-primary);
    transform: translateY(-1px);
  }

  .comment-input textarea {
    width: 100%;
    background: var(--bg-primary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: var(--space-md);
    color: var(--text-primary);
    font-family: inherit;
    font-size: var(--font-size-base);
    resize: vertical;
    min-height: 100px;
  }

  .comment-input textarea:focus {
    outline: none;
    border-color: var(--accent-primary);
  }

  .comment-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: var(--space-md);
  }

  .submit-comment {
    background: var(--accent-primary);
    color: var(--bg-primary);
    border: none;
    border-radius: var(--radius-md);
    padding: var(--space-sm) var(--space-lg);
    font-size: var(--font-size-sm);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .submit-comment:hover:not(:disabled) {
    background: var(--accent-cyan);
    transform: translateY(-1px);
  }

  .submit-comment:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .auth-prompt {
    text-align: center;
  }

  .login-prompt p {
    color: var(--text-secondary);
    margin-bottom: var(--space-md);
  }

  .show-auth {
    background: var(--accent-primary);
    color: var(--bg-primary);
    border: none;
    border-radius: var(--radius-md);
    padding: var(--space-sm) var(--space-lg);
    font-size: var(--font-size-base);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .show-auth:hover {
    background: var(--accent-cyan);
    transform: translateY(-1px);
  }

  .cancel-auth {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    margin-top: var(--space-md);
    text-decoration: underline;
  }

  .comments-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  .no-comments {
    text-align: center;
    padding: var(--space-xl);
    color: var(--text-secondary);
    font-style: italic;
  }
</style>