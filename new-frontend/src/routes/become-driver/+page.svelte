<script>
  import { goto } from '$app/navigation';

  let name = "";
  let phone = "";
  let state = "";
  let plate = "";
  let license = "";
  let year = "";
  let make = "";
  let model = "";
  let vehicle = "";

  function applyDriver() {
    const driver = {
      name,
      phone,
      state,
      plate,
      license,
      year,
      make,
      model,
      vehicle,
      status: "Pending"
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("driver", JSON.stringify(driver));
    }

    alert("Application submitted! Verification pending.");
    goto("/dashboard");
  }
</script>

<div class="container">

  <div class="card">
    <h1>Become a Driver 🚗</h1>
    <p class="subtitle">Apply to offer rides at CampusRide</p>

    <input placeholder="Full Name" bind:value={name} />
    <input placeholder="Phone Number" bind:value={phone} />
    <input placeholder="State (Vehicle Registered)" bind:value={state} />
    <input placeholder="License Plate Number" bind:value={plate} />
    <input placeholder="Driver License Number" bind:value={license} />
    <input placeholder="Vehicle Year" bind:value={year} />
    <input placeholder="Vehicle Make (Toyota, etc.)" bind:value={make} />
    <input placeholder="Vehicle Model (Camry, etc.)" bind:value={model} />
    <input placeholder="Vehicle Info (optional)" bind:value={vehicle} />

    <button on:click={applyDriver}>Submit Application</button>
  </div>

</div>

<style>
  /* 🔴 A-STATE BACKGROUND */
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
    width: 340px;
    border-radius: 14px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
    text-align: center;
  }

  h1 {
    margin-bottom: 5px;
  }

  .subtitle {
    font-size: 14px;
    color: gray;
    margin-bottom: 20px;
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