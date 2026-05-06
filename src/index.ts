import express, { Express } from 'express';
import cors from 'cors';
import './config.js';
import { createMessage, getAllMessages } from './controllers/MessageController.js';
import { createRideAvailability, deleteRideAvailability, getRideAvailabilities, getRideAvailability, updateRideAvailability } from './controllers/RideAvailabilityController.js';
import { createRideRequest, deleteRideRequest, getRideRequest, getRideRequests, updateRideRequest } from './controllers/RideRequestController.js';
import { getUserProfile, loginUser, logoutUser, registerUser, getMe } from './controllers/UserController.js';
import { sessionMiddleware } from './sessionConfig.js';

const app: Express = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(sessionMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public', { extensions: ['html'] }));

app.post('/api/users', registerUser);
app.post('/api/login', loginUser);
app.delete('/api/sessions', logoutUser);
app.get('/api/me', getMe);
app.get('/api/users/:userId', getUserProfile);

app.post('/api/messages', createMessage);
app.get('/api/messages', getAllMessages);

app.post('/api/rideAvailabilities', createRideAvailability);
app.get('/api/rideAvailabilities', getRideAvailabilities);
app.get('/api/rideAvailabilities/:rideAvailabilityId', getRideAvailability);
app.put('/api/rideAvailabilities/:rideAvailabilityId', updateRideAvailability);
app.delete('/api/rideAvailabilities/:rideAvailabilityId', deleteRideAvailability);

app.post('/api/rideRequests', createRideRequest);
app.get('/api/rideRequests', getRideRequests);
app.get('/api/rideRequests/:rideRequestId', getRideRequest);
app.put('/api/rideRequests/:rideRequestId', updateRideRequest);
app.delete('/api/rideRequests/:rideRequestId', deleteRideRequest);

app.listen(process.env.PORT, () => {
console.log(`Server listening on http://localhost:${process.env.PORT}`);
});