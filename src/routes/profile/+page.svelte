<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let user = null;

  onMount(() => {
    if (typeof window !== "undefined") {
      user = JSON.parse(localStorage.getItem("currentUser"));

      if (!user) {
        goto('/login'); // redirect if not logged in
      }
    }
  });
</script>

<div class="container">
  <h1>My Profile 👤</h1>

  {#if user}
    <div class="card">
      <p><strong>Username:</strong> {user.username}</p>
    </div>
  {/if}

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

  .card {
    margin: 20px auto;
    padding: 20px;
    width: 300px;
    border-radius: 10px;
    background: white;
    color: black;
  }

  .back {
    margin-top: 20px;
    padding: 10px 20px;
    background: white;
    color: #b22222;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
  }
</style>