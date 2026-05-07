<script lang="ts">
  import { goto } from '$app/navigation';
  import { post } from '$lib/api';
  import { addToast } from '$lib/toast.svelte';
  import { getUser } from '$lib/auth.svelte';

  const user = $derived(getUser());

  let pickupLocation = $state('');
  let destination = $state('');
  let departureTime = $state('');
  let availableSeats = $state(1);
  let notes = $state('');
  let submitting = $state(false);

  async function handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    submitting = true;

    const result = await post('/api/rideAvailabilities', {
      driverId: user?.userId,
      pickupLocation,
      destination,
      departureTime: new Date(departureTime).toISOString(),
      availableSeats,
      notes: notes || null,
    });

    submitting = false;

    if (result.status === 401) {
      addToast('Please log in to continue', 'error');
      goto('/login');
      return;
    }

    if (!result.ok) {
      addToast('Failed to create ride', 'error');
      return;
    }

    addToast('Ride created!', 'success');
    goto('/rides');
  }
</script>

<h1>Post a Ride</h1>

<form onsubmit={handleSubmit}>
  <label>
    Pickup Location
    <input type="text" bind:value={pickupLocation} required />
  </label>

  <label>
    Destination
    <input type="text" bind:value={destination} required />
  </label>

  <label>
    Departure Time
    <input type="datetime-local" bind:value={departureTime} required />
  </label>

  <label>
    Available Seats
    <input type="number" bind:value={availableSeats} min="1" required />
  </label>

  <label>
    Notes (optional)
    <textarea bind:value={notes}></textarea>
  </label>

  <button type="submit" disabled={submitting}>
    {submitting ? 'Creating...' : 'Post Ride'}
  </button>
</form>

<a href="/rides">Back to Rides</a>
