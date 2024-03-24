import { useCallback } from 'react';
import { useSound } from '../../hooks/useSound';
import { useValueChange } from '../../hooks/useValueChange';
import { useWorkoutStore } from '../../model';
import { useAtThresholdPassed } from '../../hooks/useAtThresholdPassed';

export function Sounds() {
  const workoutStore = useWorkoutStore();
  const soundApi = useSound();

  const playStartNote = useCallback(
    (phase) => {
      switch (phase) {
        case 'work':
        case 'rest':
        case 'roundReset':
        case 'end':
          soundApi.playNote({
            note: 'A',
            octave: 5,
            type: 'sine',
            duration: 750,
            volume: 0.8,
          });
      }
    },
    [soundApi]
  );

  const playCountdownNote = useCallback(() => {
    if (workoutStore.phase.duration > 5000) {
      switch (workoutStore.phase.name) {
        case 'start':
        case 'work':
        case 'rest':
        case 'roundReset':
          soundApi.playNote({
            note: 'A',
            octave: 4,
            type: 'sine',
            duration: 750,
            volume: 0.5,
          });
      }
    }
  }, [soundApi, workoutStore]);

  const playGetReadyNote = useCallback(() => {
    if (workoutStore.phase.duration > 5000) {
      switch (workoutStore.phase.name) {
        case 'start':
        case 'rest':
        case 'roundReset':
          soundApi.playNote({
            note: 'A',
            octave: 4,
            type: 'sine',
            duration: 750,
            volume: 0.5,
          });
      }
    }
  }, [soundApi, workoutStore]);

  const timeLeftMs =
    workoutStore.phase.duration - workoutStore.phase.progressMs;

  useAtThresholdPassed('desc', 5000, timeLeftMs, playGetReadyNote);
  useAtThresholdPassed('desc', 2000, timeLeftMs, playCountdownNote);
  useAtThresholdPassed('desc', 1000, timeLeftMs, playCountdownNote);

  useValueChange(workoutStore.phase.name, playStartNote);

  return null;
}
