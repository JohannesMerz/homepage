import { useCallback } from 'react';
import { useSound } from '../../hooks/useSound';
import { useValueChange } from '../../hooks/useValueChange';
import { useWorkoutStore } from '../../model';

export function Sounds() {
  const workoutStore = useWorkoutStore();
  const soundApi = useSound();

  useValueChange(
    workoutStore.phase.name,
    useCallback(
      (phase) => {
        if (!soundApi) {
          return;
        }

        switch (phase) {
          case 'work':
          case 'rest':
          case 'end':
            soundApi.playNote({
              note: 'A',
              octave: 5,
              type: 'triangle',
              duration: 750,
            });
        }
      },
      [soundApi]
    )
  );

  return null;
}
