import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useWorkoutStore } from '../model';
import { Fullscreen } from '../components/atomics/Fullscreen';
import { Times } from '../components/store-consumers/Times';
import { useCallback, useRef } from 'react';
import { useValueChange } from '../hooks/useValueChange';
import { createAudioContext } from '../lib/sound';
import { useInitSound, useSound } from '../hooks/useSound';

const VARIANTS = {
  work: css`
    color: var(--workPrimary);
    background-color: var(--workSecondary);
  `,
  rest: css`
    color: var(--restPrimary);
    background-color: var(--restSecondary);
  `,
  start: css`
    color: var(--inactivePrimary);
    background-color: var(--inactiveSecondary);
  `,
  end: css`
    color: var(--inactivePrimary);
    background-color: var(--inactiveSecondary);
  `,
  roundReset: css`
    color: var(--inactivePrimary);
    background-color: var(--inactiveSecondary);
  `,
};

const Box = styled.div`
  ${(props) => VARIANTS[props.variant]}
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export function Workout() {
  const workoutStore = useWorkoutStore();

  const soundApi = useSound();

  useValueChange(
    workoutStore.phase.name,
    useCallback(
      (phase) => {
        if (!soundApi) {
          return;
        }

        if (phase === 'work') {
          soundApi.playNote({
            note: 'A',
            octave: 4,
            type: 'triangle',
            duration: 750,
          });
        } else {
          soundApi.playNote({
            note: 'A',
            octave: 5,
            type: 'triangle',
            duration: 750,
          });
        }
      },
      [soundApi]
    )
  );

  const startWorkout = workoutStore.startWorkout;
  const initSound = useInitSound();
  const start = useCallback(() => {
    initSound();
    startWorkout();
  }, [startWorkout, initSound]);

  return (
    <Fullscreen>
      <Box variant={workoutStore.phase.name}>
        <h2>Interval Timer</h2>
        <p>current phase: {workoutStore.phase.name}</p>
        <Times></Times>
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
          {['start', 'end'].includes(workoutStore.phase.name) ? (
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
      </Box>
    </Fullscreen>
  );
}
