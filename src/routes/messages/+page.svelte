<script>
  let messages = [];

  if (typeof window !== "undefined") {
    messages = JSON.parse(localStorage.getItem("messages") || "[]");
  }

  function reply(index) {
    messages[index].reply = "Got it, I will check!";
    localStorage.setItem("messages", JSON.stringify(messages));
  }
</script>

<h2>Messages 💬</h2>

{#if messages.length === 0}
  <p>No messages yet.</p>
{:else}
  {#each messages as msg, index}
    <div class="card">
      <p><strong>{msg.user}</strong></p>
      <p>{msg.text}</p>

      {#if msg.reply}
        <p class="reply">Reply: {msg.reply}</p>
      {:else}
        <button on:click={() => reply(index)}>Reply</button>
      {/if}
    </div>
  {/each}
{/if}

<style>
  .card {
    background: white;
    padding: 15px;
    margin: 15px 0;
    border-radius: 10px;
  }

  .reply {
    color: green;
    margin-top: 10px;
  }

  button {
    margin-top: 10px;
    padding: 8px;
    background: #b22222;
    color: white;
    border: none;
    border-radius: 5px;
  }
</style>