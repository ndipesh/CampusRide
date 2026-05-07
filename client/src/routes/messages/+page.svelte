<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { get, post } from '$lib/api';
  import { addToast } from '$lib/toast.svelte';

  interface Message {
    id: string;
    content: string;
    createdAt: string;
    senderId: string;
    sender: {
      id: string;
      email: string;
      displayName: string | null;
    } | null;
  }

  let messages: Message[] = $state([]);
  let loading = $state(true);
  let newMessage = $state('');
  let submitting = $state(false);

  onMount(async () => {
    const result = await get<Message[]>('/api/messages');

    if (result.status === 401) {
      addToast('Please log in to continue', 'error');
      goto('/login');
      return;
    }

    if (result.ok && Array.isArray(result.data)) {
      messages = result.data;
    } else {
      addToast('Failed to load messages', 'error');
    }

    loading = false;
  });

  async function handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    if (!newMessage.trim()) return;
    submitting = true;

    const result = await post('/api/messages', {
      content: newMessage.trim(),
    });

    submitting = false;

    if (!result.ok) {
      addToast('Failed to send message', 'error');
      return;
    }

    addToast('Message sent!', 'success');
    newMessage = '';

    const refreshResult = await get<Message[]>('/api/messages');
    if (refreshResult.ok && Array.isArray(refreshResult.data)) {
      messages = refreshResult.data;
    }
  }
</script>

<h1>Messages</h1>

{#if loading}
  <p>Loading...</p>
{:else if messages.length === 0}
  <p>No messages yet.</p>
{:else}
  {#each messages as message (message.id)}
    <article>
      <strong>{message.sender?.email ?? 'Unknown'}</strong>
      <p>{message.content}</p>
      <small>{new Date(message.createdAt).toLocaleString()}</small>
    </article>
  {/each}
{/if}

<form onsubmit={handleSubmit}>
  <label>
    New Message
    <textarea bind:value={newMessage} placeholder="Type your message..."></textarea>
  </label>
  <button type="submit" disabled={submitting}>
    {submitting ? 'Sending...' : 'Send Message'}
  </button>
</form>
