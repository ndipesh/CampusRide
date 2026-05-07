<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let driver = null;
  let messages = [];

  onMount(() => {
    if (typeof window !== "undefined") {
      driver = JSON.parse(localStorage.getItem("driver") || "null");

      // ✅ check logged-in session
      const user = localStorage.getItem("currentUser");
      if (!user) {
        goto('/login');
      }

      // ✅ load messages
      messages = JSON.parse(localStorage.getItem("messages") || "[]");
    }
  });

  function logout() {
    localStorage.removeItem("currentUser");
    goto('/login');
  }
</script>

<div class="container">

  <!-- 🔴 LOGOUT BUTTON -->
  <div class="top-bar">
    <button class="logout-btn" on:click={logout}>Logout</button>
  </div>

  <h1>Welcome to CampusRide 🚗</h1>
  <p class="subtitle">Arkansas State Students Ride Together</p>

  {#if driver}
    <p class="status">
      Driver Status: <strong>{driver.status}</strong>
    </p>
  {/if}

  <div class="actions">

    <div class="card" on:click={() => goto('/rides')}>
      <h3>🔍 Need a Ride</h3>
      <p>Search available rides around campus</p>
    </div>

    <div class="card" on:click={() => goto('/post-request')}>
      <h3>🧍 Request a Ride</h3>
      <p>Ask drivers for a ride</p>
    </div>

    <div class="card" on:click={() => goto('/create-ride')}>
      <h3>➕ Create Ride</h3>
      <p>Offer a ride to others</p>
    </div>

    <!-- 🔥 REPLACED REQUESTS WITH MESSAGES -->
    <div class="card messages-box">
      <h3>💬 Messages</h3>

      {#if messages.length > 0}
        {#each messages as msg}
          <div class="message">
            <p><strong>{msg.user}:</strong></p>
            <p>{msg.text}</p>
          </div>
        {/each}
      {:else}
        <p>No messages yet</p>
      {/if}
    </div>

    <div class="card" on:click={() => goto('/profile')}>
      <h3>👤 View Profile</h3>
      <p>See your account details</p>
    </div>

    {#if !driver}
      <div class="card" on:click={() => goto('/become-driver')}>
        <h3>🚗 Become a Driver</h3>
        <p>Apply to offer rides</p>
      </div>
    {/if}

  </div>

</div>

<style>
  .container {
    min-height: 100vh;
    text-align: center;
    padding-top: 80px;
    background: linear-gradient(135deg, #8b0000, #b22222);
    color: white;
    position: relative;
  }

  .top-bar {
    position: absolute;
    top: 20px;
    right: 30px;
  }

  .logout-btn {
    padding: 8px 16px;
    background: white;
    color: #b22222;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
  }

  .logout-btn:hover {
    background: #f2f2f2;
  }

  h1 {
    margin-bottom: 10px;
  }

  .subtitle {
    margin-bottom: 20px;
    color: #ffdada;
  }

  .status {
    margin-bottom: 30px;
    color: #ffeb3b;
    font-weight: bold;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 25px;
    flex-wrap: wrap;
  }

  .card {
    background: rgba(255, 255, 255, 0.95);
    color: black;
    padding: 25px;
    width: 230px;
    border-radius: 14px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
    cursor: pointer;
    transition: 0.25s;
  }

  .card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 10px 25px rgba(0,0,0,0.4);
  }

  .card h3 {
    margin-bottom: 10px;
  }

  .card p {
    font-size: 14px;
    color: #555;
  }

  /* 🔥 MESSAGE BOX STYLE */
  .messages-box {
    max-height: 250px;
    overflow-y: auto;
  }

  .message {
    background: #f9f9f9;
    padding: 10px;
    margin: 8px 0;
    border-radius: 8px;
    text-align: left;
  }
</style>