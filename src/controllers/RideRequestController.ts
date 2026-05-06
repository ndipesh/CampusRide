import { Request, Response } from 'express';
import {
  addRideRequest,
  deleteRideRequestById,
  getAllRideRequests,
  getRideRequestById,
  updateRideRequestStatus,
} from '../models/RideRequestModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import {
  CreateRideRequestSchema,
  UpdateRideRequestSchema,
} from '../validators/RideRequestValidator.js';

async function createRideRequest(req: Request, res: Response): Promise<void> {
  const result = CreateRideRequestSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }

  const { rideAvailabilityId, riderId } = result.data;

  try {
    const newRideRequest = await addRideRequest(rideAvailabilityId, riderId);
    console.log(newRideRequest);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function getRideRequests(req: Request, res: Response): Promise<void> {
  const rideRequests = await getAllRideRequests();
  res.json({ rideRequests });
}

async function getRideRequest(req: Request, res: Response): Promise<void> {
  const { rideRequestId } = req.params as { rideRequestId: string };

  const rideRequest = await getRideRequestById(rideRequestId);
  if (!rideRequest) {
    res.status(404).json({ error: 'Ride request not found' });
    return;
  }

  res.json({ rideRequest });
}

async function updateRideRequest(req: Request, res: Response): Promise<void> {
  const { rideRequestId } = req.params as { rideRequestId: string };

  const result = UpdateRideRequestSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }

  const { status } = result.data;

  try {
    const updatedRideRequest = await updateRideRequestStatus(rideRequestId, status);
    if (!updatedRideRequest) {
      res.status(404).json({ error: 'Ride request not found' });
      return;
    }
    res.json({ rideRequest: updatedRideRequest });
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function deleteRideRequest(req: Request, res: Response): Promise<void> {
  const { rideRequestId } = req.params as { rideRequestId: string };

  const rideRequest = await getRideRequestById(rideRequestId);
  if (!rideRequest) {
    res.status(404).json({ error: 'Ride request not found' });
    return;
  }

  await deleteRideRequestById(rideRequestId);
  res.sendStatus(204);
}

export { createRideRequest, deleteRideRequest, getRideRequest, getRideRequests, updateRideRequest };
