<script lang="ts">
  import { goto } from '$app/navigation';
  import { post } from '$lib/api';
  import { addToast } from '$lib/toast.svelte';

  let email = $state('');
  let password = $state('');
  let role = $state('user');
  let submitting = $state(false);

  async function handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    submitting = true;

    const result = await post('/api/users', { email, password, role });

    submitting = false;

    if (!result.ok) {
      addToast('Registration failed. Try a different email.', 'error');
      return;
    }

    addToast('Account created! Please log in.', 'success');
    goto('/login');
  }
</script>

<h1>Register</h1>

<form onsubmit={handleSubmit}>
  <label>
    Email
    <input type="email" bind:value={email} required />
  </label>

  <label>
    Password
    <input type="password" bind:value={password} required />
  </label>

  <label>
    I want to
    <select bind:value={role}>
      <option value="user">Find a Ride (Rider)</option>
      <option value="admin">Offer Rides (Driver)</option>
    </select>
  </label>

  <button type="submit" disabled={submitting}>
    {submitting ? 'Creating account...' : 'Register'}
  </button>
</form>

<p>Already have an account? <a href="/login">Log in</a></p>
