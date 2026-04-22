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
