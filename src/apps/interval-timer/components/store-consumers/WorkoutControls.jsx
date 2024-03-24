import { useCallback } from 'react';
import { VARIANTS } from '../../Theme';
import { useWorkoutStore } from '../../model';
import { Button } from '../atomics/Button';
import { FiPlay, FiPause, FiX } from 'react-icons/fi';
import { useInitSound } from '../../hooks/useSound';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-grow: 1;
  margin: 0 8rem;
`;

const DynamicGap = styled.div`
  fleg-grow: 1;
  width: 100%;
`;

export function WorkoutControls() {
  const workoutStore = useWorkoutStore();
  const initSound = useInitSound();

  const color = VARIANTS[workoutStore.phase.name].color;
  const size = '48';
  const startWorkout = workoutStore.startWorkout;

  const start = useCallback(() => {
    initSound();
    startWorkout();
  }, [startWorkout, initSound]);

  return (
    <Box>
      {!workoutStore.workout.active && (
        <Button
          color={color}
          onClick={
            workoutStore.workout.progressMs ? workoutStore.resumeWorkout : start
          }
        >
          <FiPlay size={size}></FiPlay>
        </Button>
      )}
      {workoutStore.workout.active && (
        <Button color={color} onClick={workoutStore.pauseWorkout}>
          <FiPause size={size}></FiPause>
        </Button>
      )}

      <DynamicGap></DynamicGap>
      {
        <Button
          color={color}
          onClick={workoutStore.resetWorkout}
          disabled={
            !workoutStore.workout.active && !workoutStore.workout.progressMs
          }
        >
          <FiX size={size}></FiX>
        </Button>
      }
    </Box>
  );
}
