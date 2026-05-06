import { AppDataSource } from '../dataSource.js';
import { RideAvailability } from '../entities/RideAvailability.js';

const rideAvailabilityRepository = AppDataSource.getRepository(RideAvailability);

async function addRideAvailability(
  driverId: string,
  pickupLocation: string,
  destination: string,
  departureTime: Date,
  availableSeats: number,
  notes: string | null,
): Promise<RideAvailability> {
  const newRide = new RideAvailability();
  newRide.driverId = driverId;
  newRide.pickupLocation = pickupLocation;
  newRide.destination = destination;
  newRide.departureTime = departureTime;
  newRide.availableSeats = availableSeats;
  newRide.notes = notes;

  return rideAvailabilityRepository.save(newRide);
}

async function getAllRideAvailabilities(): Promise<RideAvailability[]> {
  return rideAvailabilityRepository.find();
}

async function getRideAvailabilityById(
  rideAvailabilityId: string,
): Promise<RideAvailability | null> {
  return rideAvailabilityRepository.findOne({
    where: { rideAvailabilityId },
  });
}

async function updateRideAvailabilityById(
  rideAvailabilityId: string,
  pickupLocation: string,
  destination: string,
  departureTime: Date,
  availableSeats: number,
  notes: string | null,
): Promise<RideAvailability | null> {
  const ride = await rideAvailabilityRepository.findOne({
    where: { rideAvailabilityId },
  });

  if (!ride) {
    return null;
  }

  ride.pickupLocation = pickupLocation;
  ride.destination = destination;
  ride.departureTime = departureTime;
  ride.availableSeats = availableSeats;
  ride.notes = notes;

  return rideAvailabilityRepository.save(ride);
}

async function deleteRideAvailabilityById(rideAvailabilityId: string): Promise<void> {
  const ride = await rideAvailabilityRepository.findOne({
    where: { rideAvailabilityId },
  });

  if (!ride) {
    return;
  }

  await rideAvailabilityRepository.remove(ride);
}

export {
  addRideAvailability,
  deleteRideAvailabilityById,
  getAllRideAvailabilities,
  getRideAvailabilityById,
  updateRideAvailabilityById,
};
