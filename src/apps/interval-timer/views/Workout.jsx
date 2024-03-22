import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useWorkoutStore } from '../model';
import { Fullscreen } from '../components/Fullscreen';
import { Times } from '../components/Times';

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

// currentExercise: 0,
//           currentRound: 0,
//           active: true,
//           ended: false,
//           progressMs: 0,

export function Workout() {
  const workoutStore = useWorkoutStore();
  console.log('update workout component');

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
          {workoutStore.program.exercises}
        </p>
        <p>
          round: {workoutStore.workout.currentRound + 1}/
          {workoutStore.program.rounds}
        </p>

        <p>
          {['start', 'end'].includes(workoutStore.phase.name) ? (
            <button onClick={workoutStore.startWorkout}>start</button>
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
        {/* <p>
          <button onClick={currentWorkout.reset}>reset</button>
        </p> */}
        <Link to="/">Home</Link>
      </Box>
    </Fullscreen>
  );
}
