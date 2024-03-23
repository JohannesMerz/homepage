import { useEffect } from 'react';
import { GlobalStyles } from './GlobalStyles';
import { useWorkoutStore } from './model';
import { Workout } from './views/Workout';
import { SoundProvider } from './hooks/useSound';

const workoutSettings = {
  start: 10 * 1000,
  work: 10 * 1000,
  rest: 15 * 1000,
  exercises: 2,
  rounds: 1,
  roundReset: 0,
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
