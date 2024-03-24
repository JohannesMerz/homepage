import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useWorkoutStore } from '../model';
import { Fullscreen } from '../components/atomics/Fullscreen';
import { Sounds } from '../components/store-consumers/Sounds';
import { VARIANTS } from '../Theme';
import { PhaseProgress } from '../components/store-consumers/PhaseProgress';
import { WorkoutControls } from '../components/store-consumers/WorkoutControls';

const StyledFullScreen = styled(Fullscreen)`
  color: ${(props) => VARIANTS[props.$variant].color};
  background-color: ${(props) => VARIANTS[props.$variant].bgColor};
  display: flex;
  justify-content: center;
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media (min-width: 500px) {
    width: 500px;
  }
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export function Workout() {
  const workoutStore = useWorkoutStore();

  return (
    <StyledFullScreen $variant={workoutStore.phase.name}>
      <Box>
        <Section>
          <h2>Workout Timer</h2>
          <Sounds></Sounds>
        </Section>
        <Section>
          <PhaseProgress></PhaseProgress>
        </Section>
        <Section>
          <WorkoutControls></WorkoutControls>
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

          <Link to="/">Home</Link>
        </Section>
      </Box>
    </StyledFullScreen>
  );
}

// : (
//               <Button color={color} onClick={workoutStore.resumeWorkout}>
//                 resume
//               </Button>
//             )}
