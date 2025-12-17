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
  let anonymousName = '';
  let submittingComment = false;

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
    if (!newCommentContent.trim()) return;

    // For anonymous users, require a name
    if (!user && !anonymousName.trim()) {
      alert('Please enter your name to comment');
      return;
    }

    submittingComment = true;
    try {
      const body: any = {
        postSlug,
        content: newCommentContent.trim()
      };

      // Add author name for anonymous users
      if (!user) {
        body.authorName = anonymousName.trim();
      }

      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        newCommentContent = '';
        anonymousName = '';
        await loadComments(); // Reload comments
      } else {
        const error = await response.json();
        console.error('Comment submission failed:', error);
        alert(`Failed to submit comment: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to submit comment:', error);
      alert('Failed to submit comment. Please try again.');
    } finally {
      submittingComment = false;
    }
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
      {#if showAuthForm}
        <div in:slide>
          <AuthForm on:success={handleLogin} />
          <button class="cancel-auth" on:click={() => showAuthForm = false}>
            Cancel
          </button>
        </div>
      {:else}
        {#if user}
          <div class="user-info">
            <span class="user-name">Commenting as <strong>{user.name}</strong></span>
            <button class="logout-button" on:click={handleLogout}>Logout</button>
          </div>
        {:else}
          <div class="anonymous-header">
            <p class="anonymous-text">Comment anonymously or <button class="inline-link" on:click={() => showAuthForm = true}>sign in</button></p>
          </div>
        {/if}

        <div class="comment-input">
          {#if !user}
            <input
              type="text"
              bind:value={anonymousName}
              placeholder="Your name"
              class="name-input"
              disabled={submittingComment}
              maxlength="50"
            />
          {/if}

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
              disabled={!newCommentContent.trim() || (!user && !anonymousName.trim()) || submittingComment}
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
      {/if}
    </div>

    <!-- Comments List -->
    <div class="comments-list">
      {#if comments.length > 0}
        {#each comments as comment (comment.id)}
          <CommentItem
            {comment}
            {user}
            {postSlug}
            on:replySubmitted={loadComments}
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

  .anonymous-header {
    margin-bottom: var(--space-md);
  }

  .anonymous-text {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    margin: 0;
    text-align: center;
  }

  .inline-link {
    background: none;
    border: none;
    color: var(--accent-primary);
    cursor: pointer;
    padding: 0;
    font-size: inherit;
    text-decoration: underline;
    transition: color var(--transition-fast);
  }

  .inline-link:hover {
    color: var(--accent-cyan);
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

  .name-input {
    width: 100%;
    background: var(--bg-primary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: var(--space-sm) var(--space-md);
    color: var(--text-primary);
    font-family: inherit;
    font-size: var(--font-size-base);
    margin-bottom: var(--space-sm);
  }

  .name-input:focus {
    outline: none;
    border-color: var(--border-primary);
  }

  .name-input::placeholder {
    color: var(--text-tertiary);
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
    border-color: var(--border-primary);
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