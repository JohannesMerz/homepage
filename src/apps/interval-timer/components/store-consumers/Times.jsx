import { useWorkoutStore } from '../../model';
import { Time } from '../atomics/Time';

export function Times() {
  const workoutStore = useWorkoutStore();

  const timeLeftMs =
    workoutStore.phase.duration - workoutStore.phase.progressMs;
  return (
    <div>
      <p>
        overall progress: <Time time={workoutStore.workout.progressMs}></Time>
      </p>
      <p>
        phase left: <Time time={timeLeftMs}></Time>
      </p>
    </div>
  );
}
