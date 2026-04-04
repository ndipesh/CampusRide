<<<<<<< HEAD
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
=======
import express, { Express } from 'express';
import './config.js';
import {
  createRideAvailability,
  deleteRideAvailability,
  getRideAvailabilities,
  getRideAvailability,
  updateRideAvailability,
} from './controllers/RideAvailabilityController.js';
import {
  createRideRequest,
  deleteRideRequest,
  getRideRequest,
  getRideRequests,
  updateRideRequest,
} from './controllers/RideRequestController.js';
import { sessionMiddleware } from './sessionConfig.js';

const app: Express = express();
app.use(sessionMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public', { extensions: ['html'] }));

app.post('/rideAvailabilities', createRideAvailability);
app.get('/rideAvailabilities', getRideAvailabilities);
app.get('/rideAvailabilities/:rideAvailabilityId', getRideAvailability);
app.put('/rideAvailabilities/:rideAvailabilityId', updateRideAvailability);
app.delete('/rideAvailabilities/:rideAvailabilityId', deleteRideAvailability);

app.post('/rideRequests', createRideRequest);
app.get('/rideRequests', getRideRequests);
app.get('/rideRequests/:rideRequestId', getRideRequest);
app.put('/rideRequests/:rideRequestId', updateRideRequest);
app.delete('/rideRequests/:rideRequestId', deleteRideRequest);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});
>>>>>>> 60944adce58517649f9926934d658d8b244ac9ab
