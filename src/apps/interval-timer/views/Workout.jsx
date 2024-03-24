import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useWorkoutStore } from '../model';
import { Fullscreen } from '../components/atomics/Fullscreen';
import { Sounds } from '../components/store-consumers/Sounds';
import { VARIANTS } from '../Theme';
import { PhaseProgress } from '../components/store-consumers/PhaseProgress';
import { WorkoutControls } from '../components/store-consumers/WorkoutControls';
import { Settings } from '../components/store-consumers/Settings';

const StyledFullScreen = styled(Fullscreen)`
  color: ${(props) => props.$variant.color};
  background-color: ${(props) => props.$variant.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 2rem 2rem;
  gap: 6px;

  @media (min-width: 450px) {
    width: 450px;
  }
`;

const HeaderContent = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: left;
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  gap: 4rem;
  padding: 3rem 2rem;

  @media (min-width: 450px) {
    width: 450px;
  }
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Footer = styled.div`
  bottom: 0;
  position: absolute;
  min-height: 40px;
  width: 100%;
  color: ${(props) => props.$variant.bgColor};
  background-color: ${(props) => props.$variant.color};
  display: flex;
  align-items: center;
`;

export function Workout() {
  const workoutStore = useWorkoutStore();

  const variant = VARIANTS[workoutStore.phase.name];

  return (
    <StyledFullScreen $variant={variant}>
      <Header>
        <HeaderContent>
          <h1>Workout Timer</h1>
        </HeaderContent>
        <Settings></Settings>
        <Sounds></Sounds>
      </Header>
      <Box>
        <Section>
          <PhaseProgress></PhaseProgress>
        </Section>
        <Section>
          <WorkoutControls></WorkoutControls>
        </Section>
      </Box>
      <Footer $variant={variant}>
        <Section>
          <Link to="/">Home</Link>
        </Section>
      </Footer>
    </StyledFullScreen>
  );
}
