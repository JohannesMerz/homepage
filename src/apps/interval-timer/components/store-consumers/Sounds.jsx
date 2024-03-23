import { useCallback } from 'react';
import { useSound } from '../../hooks/useSound';
import { useValueChange } from '../../hooks/useValueChange';
import { useWorkoutStore } from '../../model';
import { useAtThreshold } from '../../hooks/useAtThreshold';

export function Sounds() {
  const workoutStore = useWorkoutStore();
  const soundApi = useSound();

  const playStartNote = useCallback(
    (phase) => {
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
  );

  const playGetReadyNote = useCallback(() => {
    switch (workoutStore.phase.name) {
      case 'start':
      case 'work':
      case 'rest':
        soundApi.playNote({
          note: 'A',
          octave: 4,
          type: 'triangle',
          duration: 750,
        });
    }
  }, [soundApi, workoutStore]);

  const timeLeftMs =
    workoutStore.phase.duration - workoutStore.phase.progressMs;

  useAtThreshold('desc', 4000, timeLeftMs, playGetReadyNote);
  useAtThreshold('desc', 2000, timeLeftMs, playGetReadyNote);
  useAtThreshold('desc', 1000, timeLeftMs, playGetReadyNote);

  useValueChange(workoutStore.phase.name, playStartNote);

  return null;
}
