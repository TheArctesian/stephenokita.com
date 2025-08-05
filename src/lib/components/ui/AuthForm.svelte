<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  export let mode: 'login' | 'register' = 'login';
  export let loading = false;

  const dispatch = createEventDispatcher();

  let formData = {
    email: '',
    password: '',
    name: ''
  };
  let error = '';

  async function handleSubmit() {
    error = '';
    loading = true;

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = mode === 'login' 
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const result = await response.json();

      if (response.ok) {
        dispatch('success', result.user);
        formData = { email: '', password: '', name: '' };
      } else {
        error = result.error || 'An error occurred';
      }
    } catch (err) {
      error = 'Network error. Please try again.';
    } finally {
      loading = false;
    }
  }

  function toggleMode() {
    mode = mode === 'login' ? 'register' : 'login';
    error = '';
  }
</script>

<div class="auth-form" in:fade>
  <div class="form-header">
    <h3 class="form-title">
      {mode === 'login' ? 'Sign In' : 'Create Account'}
    </h3>
    <p class="form-subtitle">
      {mode === 'login' ? 'Welcome back!' : 'Join the conversation'}
    </p>
  </div>

  <form on:submit|preventDefault={handleSubmit} class="form">
    {#if mode === 'register'}
      <div class="field">
        <label for="name">Name</label>
        <input
          id="name"
          type="text"
          bind:value={formData.name}
          required
          placeholder="Your name"
          disabled={loading}
        />
      </div>
    {/if}

    <div class="field">
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        bind:value={formData.email}
        required
        placeholder="your@email.com"
        disabled={loading}
      />
    </div>

    <div class="field">
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        bind:value={formData.password}
        required
        placeholder="••••••••"
        minlength="8"
        disabled={loading}
      />
    </div>

    {#if error}
      <div class="error" in:fade>
        {error}
      </div>
    {/if}

    <button type="submit" class="submit-button" disabled={loading}>
      {#if loading}
        <span class="spinner"></span>
        {mode === 'login' ? 'Signing in...' : 'Creating account...'}
      {:else}
        {mode === 'login' ? 'Sign In' : 'Create Account'}
      {/if}
    </button>

    <div class="form-footer">
      <button type="button" class="toggle-mode" on:click={toggleMode}>
        {mode === 'login' 
          ? "Don't have an account? Sign up" 
          : 'Already have an account? Sign in'}
      </button>
    </div>
  </form>
</div>

<style>
  .auth-form {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-lg);
    padding: var(--space-xl);
    max-width: 400px;
    margin: 0 auto;
  }

  .form-header {
    text-align: center;
    margin-bottom: var(--space-lg);
  }

  .form-title {
    color: var(--text-primary);
    font-size: var(--font-size-xl);
    font-weight: 600;
    margin: 0 0 var(--space-xs) 0;
  }

  .form-subtitle {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    margin: 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  label {
    color: var(--text-primary);
    font-size: var(--font-size-sm);
    font-weight: 500;
  }

  input {
    background: var(--bg-primary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: var(--space-sm) var(--space-md);
    color: var(--text-primary);
    font-size: var(--font-size-base);
    transition: border-color var(--transition-fast);
  }

  input:focus {
    outline: none;
    border-color: var(--accent-primary);
  }

  input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .error {
    background: var(--bg-primary);
    border: 1px solid var(--status-error);
    border-radius: var(--radius-md);
    padding: var(--space-sm) var(--space-md);
    color: var(--status-error);
    font-size: var(--font-size-sm);
    text-align: center;
  }

  .submit-button {
    background: var(--accent-primary);
    color: var(--bg-primary);
    border: none;
    border-radius: var(--radius-md);
    padding: var(--space-md);
    font-size: var(--font-size-base);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
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

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .form-footer {
    text-align: center;
    margin-top: var(--space-sm);
  }

  .toggle-mode {
    background: none;
    border: none;
    color: var(--accent-primary);
    font-size: var(--font-size-sm);
    cursor: pointer;
    text-decoration: underline;
    transition: color var(--transition-fast);
  }

  .toggle-mode:hover {
    color: var(--accent-cyan);
  }
</style>