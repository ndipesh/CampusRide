<script>
  import { goto } from '$app/navigation';

  let username = "";
  let password = "";

  function login() {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      alert("No account found. Please register first.");
      return;
    }

    if (username === savedUser.username && password === savedUser.password) {
      // ✅ THIS WAS MISSING (VERY IMPORTANT)
      localStorage.setItem("currentUser", JSON.stringify(savedUser));

      alert("Login successful!");
      goto('/dashboard');
    } else {
      alert("Invalid credentials.");
    }
  }
</script>

<div class="container">
  <div class="card">

    <h1 class="title">Welcome to CampusRide 🚗</h1>
    <p class="subtitle">Arkansas State Students Ride Together</p>

    <input placeholder="Username" bind:value={username} />
    <input type="password" placeholder="Password" bind:value={password} />

    <button on:click={login}>Login</button>

    <p class="login-text">
      Don’t have an account? <a href="/register">Sign Up</a>
    </p>

  </div>
</div>

<style>
  .container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    background-image: url('/campus.jpg');
    background-size: cover;
    background-position: center;
  }

  .card {
    background: rgba(255, 255, 255, 0.95);
    padding: 30px;
    width: 340px;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.2);
    text-align: center;
  }

  .title {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 8px;
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

  .login-text {
    margin-top: 15px;
    font-size: 14px;
  }

  .login-text a {
    color: #b22222;
    font-weight: bold;
    text-decoration: none;
  }
</style>