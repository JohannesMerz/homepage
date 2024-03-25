import { GlobalStyles } from './Theme';
import { useWorkoutStore } from './model';
import { Workout } from './views/Workout';
import { SoundProvider } from './hooks/useSound';

export function Component() {
  const workoutStore = useWorkoutStore();

  return (
    <SoundProvider>
      <GlobalStyles $variant={workoutStore.phase?.name || 'start'} />
      <Workout></Workout>
    </SoundProvider>
  );
}
Component.displayName = 'IntervalTimer';
