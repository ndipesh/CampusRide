<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { get, post } from '$lib/api';
  import { addToast } from '$lib/toast.svelte';
  import { getUser } from '$lib/auth.svelte';
  import { page } from '$app/state';

  interface Ride {
    rideAvailabilityId: string;
    driverId: string;
    pickupLocation: string;
    destination: string;
    departureTime: string;
    availableSeats: number;
    notes: string | null;
    status: string;
  }

  const user = $derived(getUser());
  let ride: Ride | null = $state(null);
  let loading = $state(true);
  let submitting = $state(false);

  onMount(async () => {
    const rideId = page.params.rideId;
    const result = await get<{ ride: Ride }>(`/api/rideAvailabilities/${rideId}`);

    if (result.status === 401) {
      addToast('Please log in to continue', 'error');
      goto('/login');
      return;
    }

    if (result.ok && result.data?.ride) {
      ride = result.data.ride;
    } else {
      addToast('Ride not found', 'error');
    }

    loading = false;
  });

  async function requestRide(): Promise<void> {
    if (!ride || !user) return;
    submitting = true;

    const result = await post('/api/rideRequests', {
      rideAvailabilityId: ride.rideAvailabilityId,
      riderId: user.userId,
    });

    submitting = false;

    if (!result.ok) {
      addToast('Failed to request ride', 'error');
      return;
    }

    addToast('Ride requested!', 'success');
    goto('/rides');
  }
</script>

{#if loading}
  <p>Loading...</p>
{:else if !ride}
  <p>Ride not found.</p>
{:else}
  <h1>{ride.pickupLocation} → {ride.destination}</h1>
  <p>Departure: {new Date(ride.departureTime).toLocaleString()}</p>
  <p>Available Seats: {ride.availableSeats}</p>
  <p>Status: {ride.status}</p>
  {#if ride.notes}
    <p>Notes: {ride.notes}</p>
  {/if}

  {#if ride.status === 'open'}
    <button onclick={requestRide} disabled={submitting}>
      {submitting ? 'Requesting...' : 'Request Ride'}
    </button>
  {:else}
    <p>This ride is no longer available.</p>
  {/if}

  <a href="/rides">Back to Rides</a>
{/if}
