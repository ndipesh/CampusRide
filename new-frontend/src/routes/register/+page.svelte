<script>
  import { goto } from '$app/navigation';

  let username = "";
  let password = "";

  function register() {
    if (!username || !password) {
      alert("Please fill all fields.");
      return;
    }

    const user = { username, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Account created!");
    goto('/login');
  }
</script>

<div class="container">
  <div class="card">
    <h1>Create Account 📝</h1>

    <input placeholder="Username" bind:value={username} />
    <input type="password" placeholder="Password" bind:value={password} />

    <button on:click={register}>Sign Up</button>
  </div>
</div>

<style>
  .container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    background: url('/campus.jpg') no-repeat center center;
    background-size: cover;

    position: relative;
  }

  .container::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.25);
  }

  .card {
    position: relative;
    background: rgba(255, 255, 255, 0.95);
    padding: 30px;
    width: 320px;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.2);
    text-align: center;
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
    font-weight: bold;
  }

  button:hover {
    background: darkred;
  }
</style>