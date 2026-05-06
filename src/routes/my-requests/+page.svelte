<script>
  let requests = [];

  if (typeof window !== "undefined") {
    const all = JSON.parse(localStorage.getItem("requests") || "[]");
    requests = all.filter(r => r.user === window.user?.username);
  }
</script>

<h2>My Requests</h2>

{#each requests as req}
  <div>
    <p>{req.pickup} → {req.destination}</p>
    <p>Status: {req.status}</p>
    {#if req.driver}
      <p>Driver: {req.driver}</p>
    {/if}
  </div>
{/each}