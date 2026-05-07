<script lang="ts">
  import '@picocss/pico/css/pico.min.css';
  import { onMount } from 'svelte';
  import { fetchUser, getUser } from '$lib/auth.svelte';
  import { getToasts } from '$lib/toast.svelte';

  let { children } = $props();

  const user = $derived(getUser());
  const toasts = $derived(getToasts());
  let loaded = $state(false);

  onMount(async () => {
    await fetchUser();
    loaded = true;
  });
</script>

{#if !loaded}
  <main class="container">
    <p>Loading...</p>
  </main>
{:else}
  <nav class="container">
    <ul>
      <li><a href="/"><strong>CampusRide</strong></a></li>
    </ul>
    <ul>
      {#if user}
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/rides">Rides</a></li>
        <li><a href="/messages">Messages</a></li>
        <li>{user.email}</li>
        <li><a href="/logout">Log Out</a></li>
      {:else}
        <li><a href="/login">Log In</a></li>
        <li><a href="/register">Register</a></li>
      {/if}
    </ul>
  </nav>

  <main class="container">
    {@render children()}
  </main>

  <div class="toasts">
    {#each toasts as toast (toast.id)}
      <div class="toast {toast.type}">
        {toast.message}
      </div>
    {/each}
  </div>
{/if}

<style>
  .toasts {
    position: fixed;
    top: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    z-index: 1000;
  }

  .toast {
    padding: 0.75rem 1rem;
    border-radius: 6px;
    color: white;
    font-weight: bold;
  }

  .toast.success { background-color: green; }
  .toast.error { background-color: red; }
  .toast.info { background-color: steelblue; }
</style>
