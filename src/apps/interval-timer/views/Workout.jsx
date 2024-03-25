import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Fullscreen } from '../components/atomics/Fullscreen';
import { Sounds } from '../components/store-consumers/Sounds';
import { PhaseProgress } from '../components/store-consumers/PhaseProgress';
import { WorkoutControls } from '../components/store-consumers/WorkoutControls';
import { Settings } from '../components/store-consumers/Settings';
import { useWorkoutStore } from '../model';

const StyledFullScreen = styled(Fullscreen)`
  color: var(--colorPrimary);
  background-color: var(--colorSecondary);
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

const Content = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  padding: 3rem 2rem;
  flex-grow: 1;

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
  min-height: 40px;
  width: 100%;
  background-color: var(--colorPrimary);
  color: var(--colorSecondary);
  display: flex;
  align-items: center;
`;

export function Workout() {
  const workoutStore = useWorkoutStore();

  return (
    <StyledFullScreen>
      <Header>
        <HeaderContent>
          <h1>Workout Timer</h1>
        </HeaderContent>
        <Settings></Settings>
        <Sounds></Sounds>
      </Header>
      <Content>
        {!!workoutStore.settings && (
          <>
            <Section>
              <PhaseProgress></PhaseProgress>
            </Section>
            <Section>
              <WorkoutControls></WorkoutControls>
            </Section>
          </>
        )}
      </Content>
      <Footer>
        <Section>
          <Link to="/">Home</Link>
        </Section>
      </Footer>
    </StyledFullScreen>
  );
}
