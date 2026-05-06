<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let pickup = "";
  let destination = "";

  onMount(() => {
    if (typeof window !== "undefined" && !window.user) {
      goto("/login");
    }
  });

  function findRides() {
    goto(`/rides?pickup=${pickup}&destination=${destination}`);
  }
</script>

<nav class="nav">
  <a href="/login">Login</a>
  <a href="/register">Sign Up</a>
</nav>

<h1>CampusRide</h1>

<div class="box">
  <input placeholder="Pickup" bind:value={pickup} />
  <input placeholder="Destination" bind:value={destination} />

  <button on:click={findRides}>Find Rides</button>
</div>

<style>
  h1 {
    text-align: center;
  }

  .nav {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
  }

  .box {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 300px;
    margin: 0 auto;
  }

  input {
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  button {
    padding: 10px;
    background-color: blue;
    color: white;
    border: none;
    border-radius: 5px;
  }
</style>