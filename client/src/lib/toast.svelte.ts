interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

let toasts: Toast[] = $state([]);

export function getToasts(): Toast[] {
  return toasts;
}

export function addToast(message: string, type: 'success' | 'error' | 'info'): void {
  const id = Date.now();
  toasts.push({ id, message, type });

  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
  }, 3000);
}
