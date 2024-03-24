import { useWorkoutStore } from '../../model';
import { Button } from '../atomics/Button';
import { FiSettings } from 'react-icons/fi';
import { VARIANTS } from '../../Theme';

export function Settings() {
  const workoutStore = useWorkoutStore();

  const color = VARIANTS[workoutStore.phase.name].color;

  return (
    <Button color={color} onClick={console.log}>
      <FiSettings size="28"></FiSettings>
    </Button>
  );
}
