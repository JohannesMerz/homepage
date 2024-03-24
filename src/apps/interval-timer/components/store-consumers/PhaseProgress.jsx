import styled from 'styled-components';
import { VARIANTS } from '../../Theme';
import { useWorkoutStore } from '../../model';
import { CircularProgressBar } from '../atomics/CircularProgressBar';
import { Time } from '../atomics/Time';

const Content = styled.div`
  margin-top: -15px;
  display: flex;
  flex-direction: column;
`;

const RemainingTime = styled(Time)`
  font-size: xx-large;
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

export function PhaseProgress() {
  const workoutStore = useWorkoutStore();

  const timeLeftMs =
    workoutStore.phase.duration - workoutStore.phase.progressMs;

  const progressPercentage = workoutStore.phase.duration
    ? (100 * workoutStore.phase.progressMs) / workoutStore.phase.duration
    : 0;

  const variant = VARIANTS[workoutStore.phase.name];

  return (
    <Box>
      <CircularProgressBar progress={progressPercentage} {...variant}>
        <Content>
          <h3>{PHASE_LABELS[workoutStore.phase.name]}</h3>
          <RemainingTime time={timeLeftMs}></RemainingTime>
        </Content>
      </CircularProgressBar>
    </Box>
  );
}
