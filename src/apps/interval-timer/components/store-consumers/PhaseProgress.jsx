import styled from 'styled-components';
import { useWorkoutStore } from '../../model';
import { CircularProgressBar } from '../atomics/CircularProgressBar';
import { Time } from '../atomics/Time';
import { NuggetProgressBar } from '../atomics/NuggetProgressBar';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  width: 100%;
`;

const RemainingTime = styled(Time)`
  font-size: 72px;
  line-height: 1;
  margin-bottom: 8px;
`;

const PHASE_LABELS = {
  start: 'prepare',
  end: 'done',
  work: 'work',
  rest: 'rest',
  roundReset: 'prepare',
};

const Box = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledNuggetBar = styled(NuggetProgressBar)`
  width: 60%;
`;

export function PhaseProgress() {
  const workoutStore = useWorkoutStore();

  const timeLeftMs =
    workoutStore.phase.duration - workoutStore.phase.progressMs;

  const progressPercentage = workoutStore.phase.duration
    ? (100 * workoutStore.phase.progressMs) / workoutStore.phase.duration
    : 0;

  return (
    <Box>
      <CircularProgressBar
        progress={progressPercentage}
        color="var(--colorPrimary)"
        bgColor="var(--colorSecondary)"
      >
        <Content>
          <h2>{PHASE_LABELS[workoutStore.phase.name]}</h2>
          <RemainingTime time={timeLeftMs}></RemainingTime>
          <StyledNuggetBar
            nuggetCount={workoutStore.settings.exercises}
            progress={workoutStore.workout.currentExercise + 1}
            color="var(--colorPrimary)"
            bgColor="var(--colorSecondary)"
          ></StyledNuggetBar>
          <StyledNuggetBar
            nuggetCount={workoutStore.settings.rounds}
            progress={workoutStore.workout.currentRound + 1}
            color="var(--colorPrimary)"
            bgColor="var(--colorSecondary)"
          ></StyledNuggetBar>
        </Content>
      </CircularProgressBar>
    </Box>
  );
}
