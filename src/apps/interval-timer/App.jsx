import { useEffect } from 'react';
import { GlobalStyles } from './GlobalStyles';
import { useWorkoutStore } from './model';
import { Workout } from './views/Workout';
import { SoundProvider } from './hooks/useSound';

const workoutSettings = {
  start: 0,
  work: 1 * 1000,
  rest: 5 * 1000,
  exercises: 1,
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
