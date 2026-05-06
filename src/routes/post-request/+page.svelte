<script>
  import { goto } from '$app/navigation';

  let pickup = "";
  let destination = "";
  let time = "";
  let people = "";

  function submitRequest() {
    if (!pickup || !destination || !time || !people) {
      alert("Please fill all fields");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    let requests = JSON.parse(localStorage.getItem("requests") || "[]");

    requests.push({
      pickup,
      destination,
      time,
      people,
      user: currentUser?.username || "Anonymous",
      status: "Pending"
    });

    localStorage.setItem("requests", JSON.stringify(requests));

    alert("Request posted!");
    goto('/dashboard');
  }
</script>

<div class="container">

  <h1>Request a Ride 🧍</h1>
  <p class="subtitle">Ask drivers for a ride</p>

  <div class="card">

    <input placeholder="Pickup Location" bind:value={pickup} />
    <input placeholder="Destination" bind:value={destination} />

    <!-- 🕒 TIME -->
    <input type="time" bind:value={time} />

    <!-- 👥 PEOPLE -->
    <input type="number" min="1" placeholder="Number of People" bind:value={people} />

    <button on:click={submitRequest}>
      Submit Request
    </button>

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

  .subtitle {
    margin-bottom: 30px;
    color: #ffdada;
  }

  .card {
    background: white;
    padding: 25px;
    width: 320px;
    margin: auto;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
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
    background: #b22222;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  .back {
    margin-top: 30px;
    padding: 10px 20px;
    background: white;
    color: #b22222;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
  }
</style>