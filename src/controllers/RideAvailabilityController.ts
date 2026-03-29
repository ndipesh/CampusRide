import { Request, Response } from 'express';
import {
  addRideAvailability,
  deleteRideAvailabilityById,
  getAllRideAvailabilities,
  getRideAvailabilityById,
  updateRideAvailabilityById,
} from '../models/RideAvailabilityModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import {
  CreateRideAvailabilitySchema,
  UpdateRideAvailabilitySchema,
} from '../validators/RideAvailabilityValidator.js';

async function createRideAvailability(req: Request, res: Response): Promise<void> {
  const result = CreateRideAvailabilitySchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }

  const { driverId, pickupLocation, destination, departureTime, availableSeats, notes } =
    result.data;

  try {
    const newRide = await addRideAvailability(
      driverId,
      pickupLocation,
      destination,
      departureTime,
      availableSeats,
      notes ?? null,
    );
    console.log(newRide);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function getRideAvailabilities(req: Request, res: Response): Promise<void> {
  try {
    const rides = await getAllRideAvailabilities();
    res.json({ rides });
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function getRideAvailability(req: Request, res: Response): Promise<void> {
  const { rideAvailabilityId } = req.params;

  try {
    const ride = await getRideAvailabilityById(rideAvailabilityId);

    if (!ride) {
      res.status(404).json({ error: 'Ride not found' });
      return;
    }

    res.json({ ride });
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function updateRideAvailability(req: Request, res: Response): Promise<void> {
  const { rideAvailabilityId } = req.params;

  const result = UpdateRideAvailabilitySchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }

  const { pickupLocation, destination, departureTime, availableSeats, notes } = result.data;

  try {
    const updatedRide = await updateRideAvailabilityById(
      rideAvailabilityId,
      pickupLocation,
      destination,
      departureTime,
      availableSeats,
      notes ?? null,
    );

    if (!updatedRide) {
      res.status(404).json({ error: 'Ride not found' });
      return;
    }

    res.json({ ride: updatedRide });
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function deleteRideAvailability(req: Request, res: Response): Promise<void> {
  const { rideAvailabilityId } = req.params;
  const ride = await getRideAvailabilityById(rideAvailabilityId);

  if (!ride) {
    res.status(404).json({ error: 'Ride not found' });
    return;
  }

  await deleteRideAvailabilityById(rideAvailabilityId);
  res.sendStatus(204);
}

export {
  createRideAvailability, deleteRideAvailability, getRideAvailabilities,
  getRideAvailability,
  updateRideAvailability
};

