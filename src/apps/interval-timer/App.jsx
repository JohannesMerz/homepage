import { useEffect } from 'react';
import { GlobalStyles } from './Theme';
import { useWorkoutStore } from './model';
import { Workout } from './views/Workout';
import { SoundProvider } from './hooks/useSound';

const workoutSettings = {
  start: 1 * 1000,
  work: 6 * 1000,
  rest: 6 * 1000,
  roundReset: 0,
  exercises: 4,
  rounds: 2,
};

export function Component() {
  const workoutStore = useWorkoutStore();

  useEffect(() => {
    workoutStore.setSettings(workoutSettings);
  }, [workoutStore]);

  return (
    <SoundProvider>
      <GlobalStyles />
      {workoutStore.settings ? <Workout></Workout> : null}
    </SoundProvider>
  );
}
Component.displayName = 'IntervalTimer';
