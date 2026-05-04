<script lang="ts">
  import { getUser } from '$lib/auth.svelte';

  const user = $derived(getUser());
</script>

{#if user}
  <h1>Welcome back, {user.email}!</h1>
  <p>What would you like to do?</p>
  <a href="/rides" role="button">View Available Rides</a>
  <a href="/rides/create" role="button" class="secondary">Post a Ride</a>
{:else}
  <h1>CampusRide</h1>
  <p>Find affordable rides around campus. Connect with student drivers going your way.</p>
  <a href="/register" role="button">Get Started</a>
  <a href="/login" role="button" class="secondary">Log In</a>
{/if}
