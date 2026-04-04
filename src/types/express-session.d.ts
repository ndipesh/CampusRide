import "express-session";

declare module "express-session" {
  interface SessionData {
    isLoggedIn?: boolean;
    authenticatedUser?: {
      userId: string;
      email: string;
      role: string;
    };
  }
}
