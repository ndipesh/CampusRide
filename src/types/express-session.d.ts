import 'express-session';

declare module 'express-session' {
  export interface Session {
    clearSession(): Promise<void>;

    authenticatedUser: {
      userId: string;
      email: string;
      role: string;
    };
    isLoggedIn: boolean;
    logInAttempts: number;
  }
}
