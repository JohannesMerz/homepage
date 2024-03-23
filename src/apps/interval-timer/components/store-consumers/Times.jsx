import { useWorkoutStore } from '../../model';
import { Time } from '../atomics/Time';

export function Times() {
  const workoutStore = useWorkoutStore();

  return (
    <div>
      <p>
        overall progress: <Time time={workoutStore.workout.progressMs}></Time>
      </p>
      <p>
        phase progress: <Time time={workoutStore.phase.progressMs}></Time>
      </p>
    </div>
  );
}
