import { differenceInMilliseconds } from 'date-fns';
import { NEGLECT_THRESHOLD_MS } from './config.js';
import { Pet } from '../entities/Pet.js';
import { logs } from '../models/logs.js';

export function computePetStage(pet: Pet) {
  const timeSinceFed = differenceInMilliseconds(
    new Date(),
    pet.lastFedAt
  );

  if (timeSinceFed > NEGLECT_THRESHOLD_MS) {
    return { stage: 'Cooked', stageEmoji: '🍗' };
  }

  const totalLogs = logs.filter(l => l.petId === pet.id).length;

  if (totalLogs === 0) return { stage: 'Egg', stageEmoji: '🥚' };
  if (totalLogs <= 4) return { stage: 'Hatching', stageEmoji: '🐣' };
  if (totalLogs <= 14) return { stage: 'Growing', stageEmoji: '🐥' };
  return { stage: 'Grown', stageEmoji: '🐓' };
}