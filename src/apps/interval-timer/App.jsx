import { useEffect } from 'react';
import { GlobalStyles } from './GlobalStyles';
import { useWorkoutStore } from './model';
import { Workout } from './views/Workout';

const workoutProgram = {
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
    workoutStore.setProgram(workoutProgram);
  }, [workoutStore]);

  return (
    <>
      <GlobalStyles />
      {workoutStore.program ? <Workout></Workout> : null}
    </>
  );
}
Component.displayName = 'IntervalTimer';
