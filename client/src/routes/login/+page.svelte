<script lang="ts">
  import { goto } from '$app/navigation';
  import { post } from '$lib/api';
  import { addToast } from '$lib/toast.svelte';
  import { fetchUser } from '$lib/auth.svelte';

  let email = $state('');
  let password = $state('');
  let submitting = $state(false);

  async function handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    submitting = true;

    const result = await post('/api/login', { email, password });

    submitting = false;

    if (result.status === 403) {
      addToast('Invalid email or password', 'error');
      return;
    }

    if (!result.ok) {
      addToast('Something went wrong', 'error');
      return;
    }

    await fetchUser();
    goto('/');
  }
</script>

<h1>Log In</h1>

<form onsubmit={handleSubmit}>
  <label>
    Email
    <input type="email" bind:value={email} required />
  </label>

  <label>
    Password
    <input type="password" bind:value={password} required />
  </label>

  <button type="submit" disabled={submitting}>
    {submitting ? 'Logging in...' : 'Log In'}
  </button>
</form>

<p>Don't have an account? <a href="/register">Register</a></p>
