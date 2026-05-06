<script>
  import { goto } from '$app/navigation';

  let driver = null;

  if (typeof window !== "undefined") {
    driver = JSON.parse(localStorage.getItem("driver") || "null");
  }

  let pickup = "";
  let destination = "";
  let time = "";
  let seats = "";

  function submitRide() {
    const newRide = {
      pickup,
      destination,
      time,
      seats,
      driver: driver.name || "Driver"
    };

    let rides = JSON.parse(localStorage.getItem("rides") || "[]");
    rides.push(newRide);
    localStorage.setItem("rides", JSON.stringify(rides));

    alert("Ride created!");
    goto('/dashboard');
  }
</script>

<div class="container">

  <div class="card">

    {#if !driver}
      <!-- ❌ NOT A DRIVER -->
      <h2>🚫 Not Registered as a Driver</h2>

      <p class="message">
        It looks like you are not registered as a driver yet.  
        To create and offer rides, you need to apply first.
      </p>

      <p class="message">
        Please click the button below to submit your driver application.  
        Once your application is reviewed and approved, you will be able to create rides.
      </p>

      <button on:click={() => goto('/become-driver')}>
        Become a Driver
      </button>

    {:else if driver.status !== "Verified"}
      <!-- ⏳ PENDING -->
      <h2>⏳ Verification in Progress</h2>

      <p class="message">
        Your driver application is currently under review.
      </p>

      <p class="message">
        You will be able to create rides once your account is verified.
      </p>

    {:else}
      <!-- ✅ VERIFIED -->
      <h2>Create Ride 🚗</h2>

      <input placeholder="Pickup Location" bind:value={pickup} />
      <input placeholder="Destination" bind:value={destination} />
      <input placeholder="Time" bind:value={time} />
      <input placeholder="Available Seats" bind:value={seats} />

      <button on:click={submitRide}>Submit Ride</button>
    {/if}

  </div>

</div>

<style>
  /* 🔴 BACKGROUND */
  .container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #8b0000, #b22222);
  }

  /* 🔥 CARD */
  .card {
    background: rgba(255, 255, 255, 0.95);
    padding: 30px;
    width: 350px;
    border-radius: 14px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
    text-align: center;
  }

  h2 {
    margin-bottom: 15px;
  }

  .message {
    font-size: 14px;
    color: #555;
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  button {
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    background: #b22222;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
  }

  button:hover {
    background: darkred;
  }
</style>