import { useEffect, useState } from 'react';
import { useWorkout } from '../model';
import { Time } from './Time';

export function Times() {
  const { onTimeUpdates } = useWorkout();

  const [times, setTimes] = useState(null);

  useEffect(() => {
    onTimeUpdates(setTimes);
  }, [onTimeUpdates]);

  if (!times) {
    return null;
  }

  return (
    <div>
      time: <Time time={times.phaseRemaining}></Time>
    </div>
  );
}
