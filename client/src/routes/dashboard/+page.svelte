<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { get, put } from '$lib/api';
  import { addToast } from '$lib/toast.svelte';
  import { getUser } from '$lib/auth.svelte';

  interface Ride {
    rideAvailabilityId: string;
    pickupLocation: string;
    destination: string;
    departureTime: string;
    availableSeats: number;
    status: string;
  }

  interface RideRequest {
    rideRequestId: string;
    rideAvailabilityId: string;
    riderId: string;
    status: string;
    createdAt: string;
  }

  const user = $derived(getUser());
  let myRides: Ride[] = $state([]);
  let myRequests: RideRequest[] = $state([]);
  let loading = $state(true);

  onMount(async () => {
    if (!user) {
      goto('/login');
      return;
    }

    const ridesResult = await get<{ rides: Ride[] }>('/api/rideAvailabilities');
    const requestsResult = await get<{ rideRequests: RideRequest[] }>('/api/rideRequests');

    if (ridesResult.ok && ridesResult.data?.rides) {
      myRides = ridesResult.data.rides.filter((r) => r.driverId === user?.userId);
    }

    if (requestsResult.ok && requestsResult.data?.rideRequests) {
      myRequests = requestsResult.data.rideRequests.filter((r) => r.riderId === user?.userId);
    }

    loading = false;
  });

  async function updateRequestStatus(rideRequestId: string, status: string): Promise<void> {
    const result = await put(`/api/rideRequests/${rideRequestId}`, { status });

    if (!result.ok) {
      addToast('Failed to update request', 'error');
      return;
    }

    addToast(`Request ${status}!`, 'success');
    myRequests = myRequests.map((r) =>
      r.rideRequestId === rideRequestId ? { ...r, status } : r
    );
  }
</script>

<h1>Dashboard</h1>
<p>Welcome, {user?.email}!</p>

{#if loading}
  <p>Loading...</p>
{:else}
  <h2>My Posted Rides</h2>
  <a href="/rides/create" role="button">+ Post a New Ride</a>

  {#if myRides.length === 0}
    <p>You haven't posted any rides yet.</p>
  {:else}
    {#each myRides as ride (ride.rideAvailabilityId)}
      <article>
        <h3>{ride.pickupLocation} → {ride.destination}</h3>
        <p>Departure: {new Date(ride.departureTime).toLocaleString()}</p>
        <p>Available Seats: {ride.availableSeats}</p>
        <p>Status: {ride.status}</p>
      </article>
    {/each}
  {/if}

  <h2>My Ride Requests</h2>

  {#if myRequests.length === 0}
    <p>You haven't requested any rides yet.</p>
    <a href="/rides">Browse Available Rides</a>
  {:else}
    {#each myRequests as request (request.rideRequestId)}
      <article>
        <p>Request ID: {request.rideRequestId}</p>
        <p>Status: <strong>{request.status}</strong></p>
        <p>Requested: {new Date(request.createdAt).toLocaleString()}</p>

        {#if request.status === 'pending'}
          <button onclick={() => updateRequestStatus(request.rideRequestId, 'cancelled')}>
            Cancel Request
          </button>
        {/if}
      </article>
    {/each}
  {/if}
{/if}
