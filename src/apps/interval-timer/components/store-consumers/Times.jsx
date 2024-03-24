import { useWorkoutStore } from '../../model';
import { Time } from '../atomics/Time';

export function Times() {
  const workoutStore = useWorkoutStore();

  return (
    <p>
      overall progress: <Time time={workoutStore.workout.progressMs}></Time>
    </p>
  );
}
