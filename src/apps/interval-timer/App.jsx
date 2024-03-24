import { useEffect } from 'react';
import { GlobalStyles } from './Theme';
import { useWorkoutStore } from './model';
import { Workout } from './views/Workout';
import { SoundProvider } from './hooks/useSound';

const workoutSettings = {
  start: 10 * 1000,
  work: 10 * 1000,
  rest: 50 * 1000,
  roundReset: 0,
  exercises: 5,
  rounds: 3,
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
