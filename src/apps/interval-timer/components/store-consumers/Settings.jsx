import { useWorkoutStore } from '../../model';
import { Button } from '../atomics/Button';
import { FiSettings, FiX } from 'react-icons/fi';
import { VARIANTS } from '../../Theme';
import { useState } from 'react';
import styled from 'styled-components';

const SettingsInput = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  height: 80%;
  background-color: ${VARIANTS.start.bgColor};
  border: 2px solid ${VARIANTS.start.color};
  border-radius: 6px;
  box-shadow: 0px 0px 4px ${VARIANTS.start.color};
  z-index: 1000;
`;

export function Settings() {
  const workoutStore = useWorkoutStore();

  const [settingsOpen, setSettingsOpen] = useState(false);

  const color = VARIANTS[workoutStore.phase.name].color;

  return (
    <>
      <Button
        color={color}
        disabled={
          settingsOpen ||
          workoutStore.workout.active ||
          (workoutStore.workout.progressMs && workoutStore.phase.name !== 'end')
        }
        onClick={() => setSettingsOpen(true)}
      >
        <FiSettings size="28"></FiSettings>
      </Button>
      {settingsOpen && (
        <SettingsInput>
          <p>this will be the settings section</p>
          <p>{JSON.stringify(workoutStore.settings, null, 2)}</p>
          <Button color={color} onClick={() => setSettingsOpen(false)}>
            <FiX size="28"></FiX>
          </Button>
        </SettingsInput>
      )}
    </>
  );
}
