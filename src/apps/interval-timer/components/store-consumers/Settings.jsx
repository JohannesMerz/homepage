import { useWorkoutStore } from '../../model';
import { Button } from '../atomics/Button';
import { FiSettings, FiX } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const SettingsInput = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  width: calc(100% - 2rem);
  height: 80%;
  margin: 1rem;
  background-color: var(--colorSecondary);
  border: 2px solid var(--colorPrimary);
  border-radius: 6px;
  box-shadow: 0px 0px 4px var(--colorPrimary);
  z-index: 1000;
`;

const workoutSettings = {
  start: 10 * 1000,
  work: 10 * 1000,
  rest: 50 * 1000,
  roundReset: 0,
  exercises: 5,
  rounds: 3,
};

export function Settings() {
  const workoutStore = useWorkoutStore();

  const [settingsOpen, setSettingsOpen] = useState(!workoutStore.settings);

  console.log('settings', workoutStore.settings);

  return (
    <>
      <Button
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
          <Button onClick={() => workoutStore.setSettings(workoutSettings)}>
            add settings
          </Button>
          <Button onClick={() => setSettingsOpen(false)}>
            <FiX size="28"></FiX>
          </Button>
        </SettingsInput>
      )}
    </>
  );
}
