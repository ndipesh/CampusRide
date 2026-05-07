<script>
  import { page } from '$app/state';
  import { goto } from '$app/navigation';

  let pickup = page.url.searchParams.get('pickup');
  let destination = page.url.searchParams.get('destination');

  let rides = [
    { pickup: "Campus", destination: "Mall", time: "5:00 PM", seats: 2 },
    { pickup: "Campus", destination: "Library", time: "6:00 PM", seats: 3 },
    { pickup: "Downtown", destination: "Mall", time: "4:30 PM", seats: 1 }
  ];

  // ✅ NEW: filter rides
  let filteredRides = rides.filter(
    (ride) =>
      ride.pickup.toLowerCase().trim() === pickup?.toLowerCase().trim() &&
      ride.destination.toLowerCase().trim() === destination?.toLowerCase().trim()
  );

  function requestRide(ride) {
    let messages = [];

    if (typeof window !== "undefined") {
      messages = JSON.parse(localStorage.getItem("messages") || "[]");

      messages.push({
        user: "Student",
        text: `Hi! I requested a ride from ${ride.pickup} to ${ride.destination}. Is the seat available?`
      });

      localStorage.setItem("messages", JSON.stringify(messages));
    }

    alert("Ride requested! Message sent.");
  }
</script>

<div class="container">

  <h1>Available Rides 🚗</h1>

  <!-- ✅ CONDITIONAL MESSAGE -->
  {#if filteredRides.length > 0}
    <p class="subtitle">
      Showing rides from <strong>{pickup}</strong> to <strong>{destination}</strong>
    </p>
  {:else}
    <p class="subtitle">
      ❌ No rides available.<br />
      If you need a ride, you can always 
      <a href="/create-ride">create one</a> 🚗
    </p>
  {/if}

  <div class="rides">

    <!-- ✅ CLEAN LOOP -->
    {#each filteredRides as ride}
      <div class="card">
        <h3>{ride.pickup} → {ride.destination}</h3>
        <p>Time: {ride.time}</p>
        <p>Seats: {ride.seats}</p>

        <button on:click={() => requestRide(ride)}>
          Request Ride
        </button>
      </div>
    {/each}

  </div>

  <button class="back" on:click={() => goto('/dashboard')}>
    ← Back
  </button>

</div>

<style>
  .container {
    min-height: 100vh;
    text-align: center;
    padding-top: 80px;
    background: linear-gradient(135deg, #8b0000, #b22222);
    color: white;
  }

  h1 {
    margin-bottom: 10px;
  }

  .subtitle {
    margin-bottom: 30px;
    color: #ffdada;
    font-size: 16px;
    line-height: 1.5;
  }

  .subtitle a {
    color: white;
    text-decoration: underline;
    font-weight: bold;
  }

  .rides {
    display: flex;
    justify-content: center;
    gap: 25px;
    flex-wrap: wrap;
  }

  .card {
    background: rgba(255, 255, 255, 0.95);
    color: black;
    padding: 20px;
    width: 250px;
    border-radius: 14px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  }

  .card h3 {
    margin-bottom: 10px;
  }

  .card p {
    margin: 5px 0;
  }

  .card button {
    margin-top: 10px;
    padding: 8px 12px;
    background: #b22222;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  .back {
    margin-top: 40px;
    padding: 10px 20px;
    background: white;
    color: #b22222;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
  }
</style>