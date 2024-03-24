import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useWorkoutStore } from '../model';
import { Fullscreen } from '../components/atomics/Fullscreen';
import { useCallback } from 'react';
import { useInitSound } from '../hooks/useSound';
import { Sounds } from '../components/store-consumers/Sounds';
import { VARIANTS } from '../Theme';
import { PhaseProgress } from '../components/store-consumers/PhaseProgress';

const Box = styled.div`
  color: ${(props) => VARIANTS[props.$variant].color};
  background-color: ${(props) => VARIANTS[props.$variant].bgColor};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const Section = styled.div``;

export function Workout() {
  const workoutStore = useWorkoutStore();

  const startWorkout = workoutStore.startWorkout;
  const initSound = useInitSound();
  const start = useCallback(() => {
    initSound();
    startWorkout();
  }, [startWorkout, initSound]);

  return (
    <Fullscreen>
      <Box $variant={workoutStore.phase.name}>
        <Section>
          <h2>Workout Timer</h2>
          <Sounds></Sounds>
        </Section>
        <Section>
          <PhaseProgress></PhaseProgress>
        </Section>
        <Section>
          <h3>setting sections, wip</h3>

          <p>active: {workoutStore.workout.active.toString()}</p>
          <p>ended: {workoutStore.workout.ended.toString()}</p>

          <p>
            exercise: {workoutStore.workout.currentExercise + 1}/
            {workoutStore.settings.exercises}
          </p>
          <p>
            round: {workoutStore.workout.currentRound + 1}/
            {workoutStore.settings.rounds}
          </p>

          <p>
            {!workoutStore.workout.active ? (
              <button onClick={start}>start</button>
            ) : (
              <button onClick={workoutStore.resetWorkout}>reset</button>
            )}
          </p>

          <p>
            {workoutStore.workout.active ? (
              <button onClick={workoutStore.pauseWorkout}>pause</button>
            ) : (
              <button onClick={workoutStore.resumeWorkout}>resume</button>
            )}
          </p>
          <Link to="/">Home</Link>
        </Section>
      </Box>
    </Fullscreen>
  );
}
