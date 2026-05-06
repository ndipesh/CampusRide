<script>
  import { goto } from '$app/navigation';

  let email = $state("");
  let password = $state("");
  let displayName = $state("");

  async function register() {
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
          role: 'user',
          displayName,
          bio: ''
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Account created successfully!');
        goto('/login');
      } else {
        alert(JSON.stringify(data.error) || 'Registration failed');
      }

    } catch (error) {
      console.error(error);
      alert('Server error');
    }
  }
</script>

<div class="container">

  <div class="card">
    <h1>Create Account 📝</h1>
    <p class="subtitle">Join CampusRide today</p>

    <input
      type="text"
      placeholder="Display Name"
      bind:value={displayName}
    />

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

    <button on:click={register}>Sign Up</button>

    <p class="login">
      Already have an account? <a href="/login">Login</a>
    </p>
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

  .login {
    margin-top: 15px;
    font-size: 14px;
  }

  .login a {
    color: #b22222;
    font-weight: bold;
    text-decoration: none;
  }
</style>