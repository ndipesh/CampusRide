<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { get } from '$lib/api';
  import { addToast } from '$lib/toast.svelte';

  interface Ride {
    rideAvailabilityId: string;
    driverId: string;
    pickupLocation: string;
    destination: string;
    departureTime: string;
    availableSeats: number;
    notes: string | null;
    status: string;
    createdAt: string;
  }

  let rides: Ride[] = $state([]);
  let loading = $state(true);
  let filterStatus = $state('all');

  let filteredRides = $derived(
    filterStatus === 'all' ? rides : rides.filter((r) => r.status === filterStatus)
  );

  onMount(async () => {
    const result = await get<{ rides: Ride[] }>('/api/rideAvailabilities');

    if (result.status === 401) {
      addToast('Please log in to continue', 'error');
      goto('/login');
      return;
    }

    if (result.ok && result.data?.rides) {
      rides = result.data.rides;
    } else if (result.ok && Array.isArray(result.data)) {
      rides = result.data as unknown as Ride[];
    } else {
      addToast('Failed to load rides', 'error');
    }

    loading = false;
  });
</script>

<h1>Available Rides</h1>

<a href="/rides/create" role="button">Post a Ride</a>

<label>
  Filter by status
  <select bind:value={filterStatus}>
    <option value="all">All</option>
    <option value="open">Open</option>
    <option value="closed">Closed</option>
  </select>
</label>

{#if loading}
  <p>Loading...</p>
{:else if filteredRides.length === 0}
  <p>No rides available.</p>
{:else}
  {#each filteredRides as ride (ride.rideAvailabilityId)}
    <article>
      <h3>{ride.pickupLocation} → {ride.destination}</h3>
      <p>Departure: {new Date(ride.departureTime).toLocaleString()}</p>
      <p>Available Seats: {ride.availableSeats}</p>
      <p>Status: {ride.status}</p>
      {#if ride.notes}
        <p>Notes: {ride.notes}</p>
      {/if}
      <a href="/rides/{ride.rideAvailabilityId}" role="button">View Details</a>
    </article>
  {/each}
{/if}
