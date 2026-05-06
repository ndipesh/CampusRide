<script>
  import { goto } from '$app/navigation';

  let email = $state("");
  let password = $state("");

  async function login() {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful!');
        goto('/dashboard');
      } else {
        alert(JSON.stringify(data.error) || 'Invalid credentials');
      }

    } catch (error) {
      console.error(error);
      alert('Server error');
    }
  }
</script>

<div class="container">
  <div class="card">

    <h1 class="title">Welcome to CampusRide 🚗</h1>
    <p class="subtitle">Arkansas State Students Ride Together</p>

    <input
      type="email"
      placeholder="Email"
      bind:value={email}
    />

    <input
      type="password"
      placeholder="Password"
      bind:value={password}
    />

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