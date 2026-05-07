import session from 'express-session';

const sessionMiddleware = session({
  secret: process.env.COOKIE_SECRET,
  cookie: {
    maxAge: 8 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  },
  name: 'session',
  resave: true,
  saveUninitialized: false,
});

export { sessionMiddleware };