import { useEffect, useState } from 'react';
import { useWorkout } from '../model';

export function Times() {
  const { onTimeUpdates } = useWorkout();

  const [times, setTimes] = useState(null);

  useEffect(() => {
    onTimeUpdates(setTimes);
  }, [onTimeUpdates]);

  if (!times) {
    return null;
  }

  return <div>time: {times.phaseProgress}ms</div>;
}
