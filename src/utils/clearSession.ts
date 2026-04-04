import { Request } from "express";

export function clearSession(req: Request): Promise<void> {
  return new Promise((resolve, reject) => {
    req.session.regenerate((error) => {
      if (error) {
        reject(error);
        return;
      }

      req.session.isLoggedIn = false;
      req.session.authenticatedUser = undefined;
      resolve();
    });
  });
}
