import { AppDataSource } from '../dataSource.js';
import { RideRequest } from '../entities/RideRequest.js';

const rideRequestRepository = AppDataSource.getRepository(RideRequest);

async function addRideRequest(rideAvailabilityId: string, riderId: string): Promise<RideRequest> {
  const newRideRequest = new RideRequest();
  newRideRequest.rideAvailabilityId = rideAvailabilityId;
  newRideRequest.riderId = riderId;

  return rideRequestRepository.save(newRideRequest);
}

async function getAllRideRequests(): Promise<RideRequest[]> {
  return rideRequestRepository.find();
}

async function getRideRequestById(rideRequestId: string): Promise<RideRequest | null> {
  return rideRequestRepository.findOne({
    where: { rideRequestId },
  });
}

async function updateRideRequestStatus(
  rideRequestId: string,
  status: string,
): Promise<RideRequest | null> {
  const rideRequest = await rideRequestRepository.findOne({
    where: { rideRequestId },
  });

  if (!rideRequest) {
    return null;
  }

  rideRequest.status = status;

  return rideRequestRepository.save(rideRequest);
}

async function deleteRideRequestById(rideRequestId: string): Promise<void> {
  const rideRequest = await rideRequestRepository.findOne({
    where: { rideRequestId },
  });

  if (!rideRequest) {
    return;
  }

  await rideRequestRepository.remove(rideRequest);
}

export {
  addRideRequest, deleteRideRequestById, getAllRideRequests,
  getRideRequestById,
  updateRideRequestStatus
};

