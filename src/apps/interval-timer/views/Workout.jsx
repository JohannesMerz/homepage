import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useWorkout } from '../model';
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

export function Workout() {
  const currentWorkout = useWorkout();
  console.log(currentWorkout);

  return (
    <Fullscreen>
      <Box variant={currentWorkout.workoutState.currentPhase}>
        <h2>Interval Timer</h2>
        <Times></Times>
        {Object.entries(currentWorkout.workoutState).map(([key, value]) => (
          <p key={key}>
            {key}: {value.toString()}
          </p>
        ))}

        <p>
          <button onClick={currentWorkout.start}>start</button>
        </p>
        <p>
          {currentWorkout.workoutState.active ? (
            <button onClick={currentWorkout.pause}>pause</button>
          ) : (
            <button onClick={currentWorkout.resume}>resume</button>
          )}
        </p>
        <p>
          <button onClick={currentWorkout.reset}>reset</button>
        </p>
        <Link to="/">Home</Link>
      </Box>
    </Fullscreen>
  );
}
