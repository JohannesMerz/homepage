import { useCallback, useEffect } from 'react';
import { useWorkoutStore } from '../../model';
import { Button } from '../atomics/Button';
import { FiPlay, FiPause, FiX } from 'react-icons/fi';
import { useInitSound } from '../../hooks/useSound';
import styled from 'styled-components';
import { useWakeLock } from '../../hooks/useWakeLock';

const Box = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-grow: 1;
  margin: 0 2rem;
`;

const DynamicGap = styled.div`
  fleg-grow: 1;
  width: 100%;
`;

export function WorkoutControls() {
  const workoutStore = useWorkoutStore();
  const initSound = useInitSound();
  const wakeLock = useWakeLock();

  const size = '72';
  const startWorkout = workoutStore.startWorkout;

  const start = useCallback(() => {
    initSound();
    startWorkout();
  }, [initSound, startWorkout]);

  useEffect(() => {
    if (workoutStore.workout.active) {
      wakeLock.requestWakeLock();
    } else {
      wakeLock.releaseWakeLock();
    }
  }, [wakeLock, workoutStore.workout.active]);

  return (
    <Box>
      {!workoutStore.workout.active && (
        <Button
          onClick={
            workoutStore.workout.progressMs ? workoutStore.resumeWorkout : start
          }
        >
          <FiPlay size={size}></FiPlay>
        </Button>
      )}
      {workoutStore.workout.active && (
        <Button onClick={workoutStore.pauseWorkout}>
          <FiPause size={size}></FiPause>
        </Button>
      )}

      <DynamicGap></DynamicGap>
      {
        <Button
          onClick={workoutStore.resetWorkout}
          disabled={
            workoutStore.workout.active || !workoutStore.workout.progressMs
          }
        >
          <FiX size={size}></FiX>
        </Button>
      }
    </Box>
  );
}
