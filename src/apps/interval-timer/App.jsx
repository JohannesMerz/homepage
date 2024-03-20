import { WorkoutProvider } from './model';
import { Workout } from './views/Workout';

const workoutProgram = {
  start: 0,
  work: 1 * 1000,
  rest: 5 * 1000,
  exercises: 5,
  rounds: 3,
  roundReset: 0,
};

export function Component() {
  return (
    <WorkoutProvider program={workoutProgram}>
      <Workout></Workout>
    </WorkoutProvider>
  );
}
Component.displayName = 'IntervalTimer';
