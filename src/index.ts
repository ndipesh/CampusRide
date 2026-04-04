import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import { AppDataSource } from './dataSource.js';

import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
} from './controllers/UserController.js';

import { createMessage, getAllMessages } from './controllers/MessageController.js';

const app = express();
app.use(express.json());

app.use(
  session({
    secret: process.env.COOKIE_SECRET || 'dev-secret',
    resave: false,
    saveUninitialized: false,
  }),
);

app.get('/', (req, res) => {
  res.send('Tender API is alive 🐣');
});

app.post('/users', registerUser);
app.post('/login', loginUser);
app.delete('/sessions', logoutUser);
app.get('/users/:userId', getUserProfile);

app.post('/messages', createMessage);
app.get('/messages', getAllMessages);

const PORT = Number(process.env.PORT) || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error: unknown) => {
    console.error('Error connecting to database:', error);
  });
