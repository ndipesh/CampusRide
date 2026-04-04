export function parseDatabaseError(error: unknown): { status: number; message: string } {
  return {
    status: 500,
    message: 'Database error',
  };
}
